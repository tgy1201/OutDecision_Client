import React from "react";
import styles from "./main.module.css"
import Banner from "../../component/banner/Banner";
import Category from "../../component/category/Category";

function Main () {
    return (
        <>
        <div className={styles.container}>
            <Banner />
            <div className={styles.contents}>
                <div className={styles.category}>
                    <div className={`${styles.category_title} ${styles.pc}`}>카테고리</div>
                    <Category />
                </div>
            </div>
        </div>
        </>
    )
}

export default Main;