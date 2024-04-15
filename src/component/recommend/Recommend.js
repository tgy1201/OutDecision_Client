import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './recommed.module.css';

// import required modules
import { Pagination } from 'swiper/modules';
import PostCard from '../postCard/PostCard';

import { GrPowerReset } from "react-icons/gr";
import axios from 'axios';


function Recommend () {
    const isMobile = useMediaQuery({
        query: "(max-width: 767px)"
    });
    const [posts, setPosts] = useState([]); // 서버에서 받아온 데이터 저장

    useEffect(() => {
        handleClick(); // 컴포넌트 마운트 시 자동으로 데이터 요청
    }, []);

    const handleClick = async () => {
        try {
            const response = await axios.get("/assets/data/posts.json");
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error)
        } 
    };

    return (
        <>
            <div className={styles.recommend_header}>
                <div>추천 게시물</div>
                <p>투표하고 의견을 제시해보세요</p>
                <button onClick={handleClick}><GrPowerReset style={{verticalAlign: "middle", fontSize: "1.5rem"}}/></button>
            </div>
            <Swiper
            slidesPerView={'auto'}
            centeredSlides={isMobile? true : false}
            spaceBetween={30}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className={styles.myswiper}
            >
            {posts.map((post, idx)=>
                (
                    <SwiperSlide key={idx} className={styles.post_wrap}>
                        <PostCard post={post} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default Recommend;
