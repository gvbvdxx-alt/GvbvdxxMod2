import React, { Component } from 'react';
import Box from '../components/box/box.jsx';
import Modal from '../containers/modal.jsx';
import styles from './gm2-custom-extension.css';
import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';


class GM2CustomExtension extends Component {
	constructor(props) {
		super(props);
		this.vm = window.vm || window.LatestVirtualMachine;
		this.toURLMenu = this.toURLMenu.bind(this);
		this.toJSMenu = this.toJSMenu.bind(this);
		this.addExtension = this.addExtension.bind(this);
	}
	state = {urlMenu:true,jsMenu:false,isError:false}
	toURLMenu = function(){
		this.setState({urlMenu:true,jsMenu:false,isError:false});
	}
	toJSMenu = function(){
		this.setState({urlMenu:false,jsMenu:true,isError:false});
	}
	
	
	addExtension = async function(){
		if (this.state.jsMenu) {
			var input = document.getElementById("gm2-js-ext");
			window.onExtensionExitButtonClick();
			this.vm.extensionManager.addTWExtensionJS(input.value);
		}
		if (this.state.urlMenu) {
			var input = document.getElementById("gm2-url-ext");
			try{
				await this.vm.extensionManager.addTWExtensionURL(input.value);
				window.onExtensionExitButtonClick();
			}catch(e){
				this.setState({urlMenu:false,jsMenu:false,isError:true});
			}
		}
	}
	
	render() {
		return (
			<Modal
			className={styles.modalContent}
			onRequestClose={
				function () {
					window.onExtensionExitButtonClick();
				}
			}
			contentLabel={"Add Custom Extension"}
			id="customExtensionModal"
		>
			<Box
				className={styles.body}
			>
				{ (!this.state.isError) && <div>
						<b>WARNING:</b><br/>
						<p>
							Using extensions not created by the developers of Turbowarp or Gvbvdxxx Mod 2,<br/>
							might cause your device to get hacked if you do not know what your doing.<br/>
							Even worse, if your using a desktop build of Gvbvdxx Mod 2, your more likley to<br/>
							make your device COMPLETLEY unusable, due to it having direct access to your pc,<br/>
							like accessing your terminal and executing commands and installing programs and viruses.
						</p><br/>
						{
							this.state.jsMenu &&
							<button className={styles.button} onClick={() => this.toURLMenu()}>
								Import with URL
							</button>
						}
						{
							this.state.urlMenu &&
							<button className={styles.button} onClick={() => this.toJSMenu()}>
								Import with JavaScript
							</button>
						}
						<hr/>
						{this.state.urlMenu &&
						<div>
						<b>Import from url:</b><input type={"text"} onChange={function(){}} defaultValue={"https://extensions.turbowarp.org/stretch.js"} id="gm2-url-ext"/><br/>
						
						</div>
						}
						{this.state.jsMenu &&
						<div>
						<b>Import using javascript language:</b><br/>
						<textarea onChange={function(){}} defaultValue={"(function (Scratch) {\n//Do something...\n})(Scratch);"} id="gm2-js-ext"/>
						</div>
						}
						 <button className={styles.button} onClick={() => this.addExtension()}>
							Load Extension
						</button>
					</div>
				}
				{ this.state.isError && <div>
						<b>There was an error loading the extension, make sure you have internet connection if your loading it over an url.</b><br/>
						 <button className={styles.button} onClick={() => this.toURLMenu()}>
							OK
						</button>
					</div>
				}
			</Box>
		</Modal>
    );
  }
}


export default GM2CustomExtension;
