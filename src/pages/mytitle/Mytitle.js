import React from "react";
import styles from "./mytitle.module.css";
import MypageMenu from "../../component/mypageMenu/MypageMenu";

function Mytitle() {
    return (
        <div className={styles.container}>
            <div className={styles.pc_mytitle}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={6} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                    </div>
                </section>
            </div>
            <div className={styles.mobile_mytitle}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={6} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.edit}>
                            칭호미션 내용입니다
                        </div>
                        <div className={styles.box}>
                             <div className={styles.title}>
                                패셔니스타
                            </div>
                            <div className={styles.state}>
                                미획득
                            </div>
                            <div className={styles.explain}>
                                '패션'게시판에서 인기글 10회
                            </div>
                            <div className={styles.progress}>
                                1/10
                            </div>


                        </div>
                        <div className={styles.apply}>
                            칭호 적용
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Mytitle;