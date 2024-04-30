import React, { useEffect, useState } from "react";
import styles from "./main.module.css"
import Banner from "../../component/banner/Banner";
import Category from "../../component/category/Category";
import Recommend from "../../component/recommend/Recommend";
import Hot from "../../component/hot/Hot";
import axios from "axios";

function Main () {
    const [hotPosts, setHotPosts] = useState([]);
    const [recommendPosts, setRecommendPosts] = useState([]);

    useEffect(() => {
        handlefetchHotPosts();
        handleRefreshRecommendPosts();
    }, []);

    const handlefetchHotPosts = async () => {
        try {
            const response = await axios.get('/assets/data/posts.json');
            setHotPosts(response.data.posts);
        } catch(error) {
            console.log(error);
        }
    };
    
    const handleRefreshRecommendPosts = async () => {
        try {
            const response = await axios.get('/assets/data/posts.json');
            setRecommendPosts(response.data.posts);
        } catch(error) {
            console.log(error);
        }
    };
    
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
                    <Recommend posts={recommendPosts} handleClick={handleRefreshRecommendPosts}/>
                </section>
                <section className={styles.hot}>
                    <Hot posts={hotPosts}/>
                </section>
                <section className={styles.all}>
                    최신게시물
                </section>
                <section className={styles.end}>
                    종료된 게시물
                </section>
            </div>
        </div>
        </>
    )
}

export default Main;