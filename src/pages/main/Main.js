import React, { useEffect, useState } from "react";
import styles from "./main.module.css"
import Banner from "../../component/banner/Banner";
import Category from "../../component/category/Category";
import Recommend from "../../component/recommend/Recommend";
import axios from "axios";
import MainPost from "../../component/mainPost/MainPost";

import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import MainRanking from "../../component/mainRanking/MainRanking";
import MainFinishedPost from "../../component/mainFinishedPost/MainFinishedPost";

function Main() {
    const [recommendPosts, setRecommendPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const [newPosts, setNewPosts] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [finishedPosts, setFinishedPosts] = useState([]);

    useEffect(() => {   
        handlefetchRecommendPosts();   
    }, []);

    useEffect(()=> {
        handlefetchData();

    }, []);

    const handlefetchRecommendPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/recommend`, {
                withCredentials: true,
            });
            setRecommendPosts(response.data.result.recommendPostList);
            console.log(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handlefetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/`, {
                withCredentials: true,
            });
            setHotPosts(response.data.result.hotPostList);
            setNewPosts(response.data.result.latestPostList);
            setFinishedPosts(response.data.result.closedPostList);
            setRanks(response.data.result.rankingListDTO.rankingList);
        } catch (error) {
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
                    <Recommend posts={recommendPosts} handleClick={handlefetchRecommendPosts} />
                </section>
                <section className={styles.hot}>
                    <div className={styles.post_header}>
                        <p>지금 뜨고 있는 투표는?</p>
                        <div>
                            <Link to="/board/hot">
                                HOT 게시물<FiChevronRight style={{ verticalAlign: 'middle', fontSize: "1.8rem" }} />
                            </Link>
                        </div>
                    </div>
                    <MainPost posts={hotPosts} bname={'hot'} />
                </section>
                <section className={styles.all}>
                    <div className={styles.post_header}>
                        <p>따끈따끈 방금 올라온 투표는?</p>
                        <div>
                            <Link to="/board/all">
                                최신 게시물<FiChevronRight style={{ verticalAlign: 'middle', fontSize: "1.8rem" }} />
                            </Link>
                        </div>
                    </div>
                    <MainPost posts={newPosts} bname={'all'} />
                </section>
                <section className={styles.rank}>
                    <div className={`${styles.rank_header} ${styles.post_header}`}>
                        <p>이번주 투표왕은?</p>
                        <div>
                            <Link to="/ranking">
                                포인트 랭킹<FiChevronRight style={{ verticalAlign: 'middle', fontSize: "1.8rem" }} />
                            </Link>
                        </div>
                    </div>
                    <MainRanking ranks={ranks} />
                </section>
                <section className={styles.end}>
                    <div className={`${styles.end_header} ${styles.post_header}`}>
                        <p>투표 결과를 바로 확인해보세요</p>
                        <div>
                            <Link to="/board/all?vote=end">
                                종료된 게시물<FiChevronRight style={{ verticalAlign: 'middle', fontSize: "1.8rem" }} />
                            </Link>
                        </div>
                    </div>
                    <MainFinishedPost posts={finishedPosts} />
                </section>
            </div>
        </div>
    )
}

export default Main;