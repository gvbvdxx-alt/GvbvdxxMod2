
module.exports = function getStyles(opts) {
	return `
		progress {
		  -webkit-appearance: none;
		}
		::-webkit-progress-bar {
		  background-color: ${opts.incompleteBGColor};
		  border-style: solid;
		  border-color: ${opts.incompleteBorderColor};
		  border-width: 3px;
		  border-radius: 10px;
		}
		::-webkit-progress-value {
		  background-color: ${opts.completeBGColor};
		  border-radius: 10px;
		}

		::-moz-progress-bar {
		  background-color: ${opts.completeBGColor};
		  border-radius: 10px;
		}
	`;
};