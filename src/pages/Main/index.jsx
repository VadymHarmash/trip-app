import React from 'react';
import styles from './main.module.scss'
import Content from '../../components/Content';

export default function Main() {
    return (
        <div className={styles.main}>
            <div className="container">
                <div className={styles.main__wrapper}>
                    <Content />
                </div>
            </div>
        </div>
    );
}
