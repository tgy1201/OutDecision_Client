import React from "react";
import styles from './ourteam.module.css';

function Ourteam () {
    return (
        <div className={styles.container}>
            <div className={styles.pc_ourteam}>
                PC 서비스소개페이지
            </div>
            <div className={styles.mobile_ourteam}>
                모바일 서비스소개페이지
            </div>
        </div>
    )
}

export default Ourteam;