import React from "react";
import styles from './mypage.module.css';
import MypageMenu from "../../component/mypageMenu/MypageMenu";

function Mypage () {
    return (
        <div className={styles.container}>
            <div className={styles.pc_mypage}>
                <div className={styles.sidebar_wrap}>
                    <MypageMenu />
                </div>
                <section className={styles.content}>
                    마이페이지 홈 내용
                </section>
            </div>
            <div className={styles.mobile_mypage}>
                마이페이지 홈입니다.
            </div>
        </div>
    )
}

export default Mypage;