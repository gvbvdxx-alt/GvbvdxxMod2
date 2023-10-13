//I don't know why you may want to compile a project with video, but I guess, so here it is.
//also don't need to resize anything,
//since i noticed that changing the width and height using turbowarp/gvbvdxxmod2
//causes it to just use its 480x360 video resolution.
//Code used from HTMLIfier

var requestStack = [];
var width = 480;
var streamPromise = null;
var height = 360;
class VideoProvider {
  constructor (width, height) {
    this._dimensions = [width, height]
    this.mirror = true
    this._frameCacheTimeout = 16
    this._video = null
    this._track = null
    this._workspace = []
  }

  get video () {
    return this._video
  }

  enableVideo () {
    this.enabled = true
    return this._setupVideo()
  }

  disableVideo () {
    this.enabled = false
    if (this._singleSetup) {
      this._singleSetup
        .then(this._teardown.bind(this))
        .catch(err => this.onError(err))
    }
  }

  _teardown () {
    if (this.enabled === false) {
      requestStack.pop()
      const disableTrack = requestStack.length === 0
      this._singleSetup = null
      this._video = null
      if (this._track && disableTrack) {
        this._track.stop()
      }
      this._track = null
    }
  }

  getFrame ({
    dimensions = this._dimensions,
    mirror = this.mirror,
    format = 'image-data',
    cacheTimeout = this._frameCacheTimeout
  }) {
    if (!this.videoReady) {
      return null
    }
    const [width, height] = dimensions
    const workspace = this._getWorkspace({
      dimensions,
      mirror: Boolean(mirror)
    })
    const { videoWidth, videoHeight } = this._video
    const { canvas, context, lastUpdate, cacheData } = workspace
    const now = Date.now()

    if (lastUpdate + cacheTimeout < now) {
      if (mirror) {
        context.scale(-1, 1)
        context.translate(width * -1, 0)
      }

      context.drawImage(
        this._video,
        0,
        0,
        videoWidth,
        videoHeight,
        0,
        0,
        width,
        height
      )

      context.setTransform(1, 0, 0, 1, 0, 0)
      workspace.lastUpdate = now
    }

    if (!cacheData[format]) {
      cacheData[format] = { lastUpdate: 0 }
    }
    const formatCache = cacheData[format]

    if (formatCache.lastUpdate + cacheTimeout < now) {
      if (format === 'image-data') {
        formatCache.lastData = context.getImageData(0, 0, width, height)
      } else if (format === 'canvas') {
        formatCache.lastUpdate = Infinity
        formatCache.lastData = canvas
      } else {
        console.error(`video io error - unimplemented format ${format}`)
        formatCache.lastUpdate = Infinity
        formatCache.lastData = null
      }

      formatCache.lastUpdate = Math.max(
        workspace.lastUpdate,
        formatCache.lastUpdate
      )
    }

    return formatCache.lastData
  }

  onError (error) {
    console.error('Unhandled video io device error', error)
  }

  _setupVideo () {
    if (this._singleSetup) {
      return this._singleSetup
    }

    if (requestStack.length === 0) {
      this._singleSetup = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: width, ideal: (480 * width) / height },
          height: { min: height, ideal: 480 }
        }
      })
      requestStack.push(streamPromise)
    } else if (requestStack.length > 0) {
      this._singleSetup = requestStack[0]
      requestStack.push(true)
    }
    this._singleSetup
      .then(stream => {
        this._video = document.createElement('video')

        try {
          this._video.srcObject = stream
        } catch (_error) {
          this._video.src = window.URL.createObjectURL(stream)
        }
        this._video.play()
        this._track = stream.getTracks()[0]
        return this
      })
      .catch(error => {
        this._singleSetup = null
        this.onError(error)
      })

    return this._singleSetup
  }

  get videoReady () {
    if (!this.enabled || !this._video || !this._track) {
      return false
    }
    const { videoWidth, videoHeight } = this._video
    return (
      typeof videoWidth === 'number' &&
      typeof videoHeight === 'number' &&
      videoWidth > 0 &&
      videoHeight > 0
    )
  }

  _getWorkspace ({ dimensions, mirror }) {
    let workspace = this._workspace.find(
      space =>
        space.dimensions.join('-') === dimensions.join('-') &&
        space.mirror === mirror
    )
    if (!workspace) {
      workspace = {
        dimensions,
        mirror,
        canvas: document.createElement('canvas'),
        lastUpdate: 0,
        cacheData: {}
      }
      workspace.canvas.width = dimensions[0]
      workspace.canvas.height = dimensions[1]
      workspace.context = workspace.canvas.getContext('2d')
      this._workspace.push(workspace)
    }
    return workspace
  }
}

module.exports = VideoProvider;