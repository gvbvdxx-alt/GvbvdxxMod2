import React from 'react';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import styles from './cloud-variable-badge.css';

const CloudVariableBadge = () => (
    <div className={styles.badge}>
        <div className={styles.icon}>
            <img
                src={cloudIcon}
                alt="Cloud"
                width="32"
                height="32"
            />
        </div>
        <div className={styles.text}>
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="This project uses cloud variables. Anyone can put thier username as almost anything, remember that Gvbvdxx Mod 2 is not responsible for impersonation, anyone can pretend that they are somebody else. {learnMore}"
                description="warning for impersonation via cloud variables."
                id="tw.cloudVariableBadge"
                values={{
                    learnMore: (
                        <a
                            href="https://docs.turbowarp.org/cloud-variables"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="Learn more."
                                id="gui.alerts.cloudInfoLearnMore"
                            />
                        </a>
                    )
                }}
            />
        </div>
    </div>
);

export default CloudVariableBadge;
