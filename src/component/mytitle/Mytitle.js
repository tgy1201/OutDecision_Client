import React from "react";
import styles from "./mytitle.module.css";
import MypageMenu from "../mypageMenu/MypageMenu";


function Mytitle() {
    return(
        <div className={styles.container}>
            <div className={styles.pc_mytitle}>
                <section>
                    <MypageMenu active={6} />
                </section>
            </div>
            <div className={styles.mobile_mytitle}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={6} />
                </section>
                <section>

                </section>
            </div>
        </div>
    )
}

export default Mytitle;