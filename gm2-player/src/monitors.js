var Monitors = {
    vm: null,
	monitorWrapper:document.createElement("div"),
    start: function () {
		var monitorWrapper = Monitors.monitorWrapper;
		var vm = Monitors.vm;
		
		//everything else in this function is created using HTMLifier, and sort of modified by me.
        var getVariable = (targetId, variableId) => {
            var target = targetId
                 ? vm.runtime.getTargetById(targetId)
                 : vm.runtime.getTargetForStage()
                return target.variables[variableId]
        }
		
		
        var monitorStates = {};
        vm.runtime.addListener('MONITORS_UPDATE', monitors => {
            monitors.forEach((record, id) => {
                var {
                    value,
                    visible,
                    mode,
                    x,
                    y,
                    width,
                    height,
                    params,
                    opcode,
                    spriteName,
                    sliderMin,
                    sliderMax,
                    isDiscrete,
                    targetId
                } = record;

                    if (!monitorStates[id]) {
                        var label = document.createElement('span')
                            label.className = 'monitor-label'
                            var name = params.VARIABLE || params.LIST || opcode
                            label.textContent = spriteName ? `${spriteName}: ${name}` : name

                            var value = document.createElement('span')
                            value.className = 'monitor-value'

                            var monitor = document.createElement('div')
                            monitor.className = 'monitor ' + mode
                            monitor.style.left = x + 'px'
                            monitor.style.top = y + 'px'
                            monitor.append(label, value)

                            monitorStates[id] = {
                            monitor,
                            valueElem: value,
                            wasVisible: true
                        }

                        if (mode === 'slider') {
                            var slider = document.createElement('input')
                                slider.type = 'range'
                                slider.min = sliderMin
                                slider.max = sliderMax
                                slider.step = isDiscrete ? 1 : 0.01
                                // Prevent tab focus, per #54, but it deviates from Scratch
                                slider.tabIndex = -1
                                slider.addEventListener('input', () => {
                                    getVariable(targetId, id).value = slider.value
                                })
                                slider.addEventListener('change', () => {
                                    getVariable(targetId, id).value = slider.value
                                })
                                monitorStates[id].slider = slider
                                monitor.append(slider)
                        } else if (mode === 'list') {
                            // If the list has never been resized, the width/height will be 0.
                            // Weird!
                            monitor.style.width = (width || 100) + 'px'
                            monitor.style.height = (height || 200) + 'px'

                            monitorStates[id].rowElems = []
                        }

                        monitorWrapper.append(monitor)
                    }

                    var {
                    monitor,
                    valueElem,
                    wasVisible,
                    lastValue = [],
                    slider,
                    rowElems
                } = monitorStates[id]
                    if (visible) {
                        if (!wasVisible) {
                            monitor.style.display = null
                        }
                        var differed = Array.isArray(value)
                             ? JSON.stringify(lastValue) !== JSON.stringify(value)
                             : lastValue !== value
                            if (differed) {
                                if (Array.isArray(value)) {
									var rowElements = [];
									valueElem.innerHTML = "";
									//although i will say, this method is inefficient, i had to do it.
									//since there was some wierd monitor issue with it.
									//so yeah, if your game has millions of items in one of the visible lists,
									//its going to crash here.
                                    value.forEach((val, i) => {
                                            // Could also set width to (lastValue.length + '').length + 'ch'
                                            var index = document.createElement('div')
                                                index.className = 'index'
                                                index.textContent = i + 1

                                                var valueElement = document.createElement('div')
                                                valueElement.className = 'row-value'

                                                var row = document.createElement('div')
                                                row.className = 'row'
                                                row.append(index, valueElement)

                                                valueElem.append(row)
                                                valueElement.textContent = val;
                                    })
                                } else {
                                    // The HTMLifier used to use Number(value.toFixed(6)) but I don't
                                    // think Scratch does that for monitors
									if (valueElem) {
										if (!(mode === 'list')) {
											valueElem.textContent = record.value
											if (slider) {
												slider.value = record.value
											}
										}
									}
                                }
                            }
                    } else if (wasVisible) {
                        monitor.style.display = 'none'
                    }
                    monitorStates[id].wasVisible = visible
                    // `value` is a live array
                    monitorStates[id].lastValue = Array.isArray(value) ? [...value] : value
            })
        })
    }
};

require("./monitor-styles.js")
module.exports = Monitors;
