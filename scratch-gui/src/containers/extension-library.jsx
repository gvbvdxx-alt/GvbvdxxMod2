import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';

import Alerts from './alerts.jsx';

import ReactDOM from 'react-dom';



const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    },
    incompatible: {
        // eslint-disable-next-line max-len
        defaultMessage: 'This extension is incompatible with Scratch. Projects made with it cannot be uploaded to the Scratch website. Are you sure you want to enable it?',
        description: 'Confirm loading Scratch-incompatible extension',
        id: 'tw.confirmIncompatibleExtension'
    }
});

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
		if (item.isBuggy) {
			if (!confirm("This extension is not trusted, and it has some glitches and bugs, adding this in might make Gvbvdxx Mod 2 Collapse, or some blocks may not work correctly, BACK UP YOUR PROJECT FIRST BEFORE USING THESE. Do you want to add the extension now?")) {
				return;
			}
		}
        // eslint-disable-next-line no-alert
        if (item.incompatibleWithScratch && !confirm(this.props.intl.formatMessage(messages.incompatible))) {
            return;
        }
        const id = item.extensionId;
        let url = item.extensionURL ? item.extensionURL : id;
        const isCustomURL = !item.disabled && !id;
		if (isCustomURL) {
			window.onExtensionCustomSelect();
			return;
		}
		
		if (url && !item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                this.props.onCategorySelected(id);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url)
                    .then(() => {
                        this.props.onCategorySelected(id);
                        if (isCustomURL) {
                            let newUrl = location.pathname;
                            if (location.search) {
                                newUrl += location.search;
                                newUrl += '&';
                            } else {
                                newUrl += '?';
                            }
                            newUrl += `extension=${encodeURIComponent(url)}`;
                            history.replaceState('', '', newUrl);
                        }
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-alert
                        alert(err);
                    });
            }
        }
    }
    render () {
        const extensionLibraryThumbnailData = extensionLibraryContent.map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        }));
        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                filterable={false}
                id="extensionLibrary"
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    intl: intlShape.isRequired,
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(ExtensionLibrary);
