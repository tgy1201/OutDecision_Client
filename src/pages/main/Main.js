import React from "react";
import styles from "./main.module.css"
import Banner from "../../component/banner/Banner";
import Category from "../../component/category/Category";
import Recommend from "../../component/recommend/Recommend";

function Main () {

    return (
        <>
        <div className={styles.container}>
            <Banner />
            <div className={styles.contents}>
                <section className={styles.category}>
                    <div className={`${styles.category_title} ${styles.pc}`}>카테고리</div>
                    <Category />
                </section>
                <section className={styles.recommend}>
                    <Recommend />
                </section>
            </div>
        </div>
        </>
    )
}

export default Main;