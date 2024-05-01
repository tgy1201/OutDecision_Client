import React, { useEffect, useState } from "react";
import styles from "./main.module.css"
import Banner from "../../component/banner/Banner";
import Category from "../../component/category/Category";
import Recommend from "../../component/recommend/Recommend";
import axios from "axios";
import MainPost from "../../component/mainPost/MainPost";

import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Main () {
    const [recommendPosts, setRecommendPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [newPosts, setNewPosts] =  useState([]);

    useEffect(() => {
        handlefetchRecommendPosts();
        handlefetchHotPosts();
        handlefetchNewPosts();
    }, []);

    const handlefetchRecommendPosts = async () => {
        try {
            const response = await axios.get('/assets/data/posts.json');
            setRecommendPosts(response.data.posts);
        } catch(error) {
            console.log(error);
        }
    };

    const handlefetchHotPosts = async () => {
        try {
            const response = await axios.get('/assets/data/posts.json');
            setHotPosts(response.data.posts.slice(0,4));
        } catch(error) {
            console.log(error);
        }
    };
    
    const handlefetchNewPosts = async () => {
        try {
            const response = await axios.get('/assets/data/posts.json');
            setNewPosts(response.data.posts.slice(0,4));
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <Banner />
            <div className={styles.contents}>
                <section className={styles.category}>
                    <div className={`${styles.category_title} ${styles.pc}`}>카테고리</div>
                    <Category />
                </section>
                <section className={styles.recommend}>
                    <Recommend posts={recommendPosts} handleClick={handlefetchRecommendPosts}/>
                </section>
                <section className={styles.hot}>
                    <div className={styles.post_header}>
                        <p>지금 뜨고 있는 투표는?</p>
                        <Link to="/board/hot">
                            <div>HOT 게시물<FiChevronRight style={{verticalAlign: 'middle', fontSize: "1.8rem"}}/></div>
                        </Link>  
                    </div>
                    <MainPost posts={hotPosts} bname={'hot'}/>
                </section>
                <section className={styles.all}>
                    <div className={styles.post_header}>
                        <p>따끈따끈 방금 올라온 투표는?</p>
                        <Link to="/board/all">
                            <div>최신 게시물<FiChevronRight style={{verticalAlign: 'middle', fontSize: "1.8rem"}}/></div>
                        </Link>  
                    </div>
                    <MainPost posts={newPosts} bname={'all'}/>
                </section>
                <section className={styles.end}>
                    종료된 게시물
                </section>
            </div>
        </div>
    )
}

export default Main;