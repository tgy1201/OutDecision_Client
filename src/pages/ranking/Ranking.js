import React from "react";
import styles from './ranking.module.css';

function Ranking () {
    return (
        <div className={styles.container}>
            <div className={styles.pc_ranking}>
                PC 랭킹페이지입니다.
            </div>
            <div className={styles.mobile_ranking}>
                모바일 랭킹페이지입니다.
            </div>
        </div>
    )
}

export default Ranking;