import React from "react";
import styles from './mypage.module.css';
import MypageMenu from "../../component/mypageMenu/MypageMenu";

function Mypage () {

    return (
        <div className={styles.container}>
            <div className={styles.pc_mypage}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={1}/>
                </section>
                <section className={styles.content}>
                    마이페이지 홈 내용
                </section>
            </div>
            <div className={styles.mobile_mypage}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={1}/>
                </section>
                <section className={styles.content}>
                    마이페이지 홈 내용
                </section>
            </div>
        </div>
    )
}

export default Mypage;