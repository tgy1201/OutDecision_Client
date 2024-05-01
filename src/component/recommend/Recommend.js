import React from 'react';
import { useMediaQuery } from 'react-responsive';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './recommed.module.css';

// import required modules
import { Pagination } from 'swiper/modules';
import PostCard from '../postCard/PostCard';

import { GrPowerReset } from "react-icons/gr";

function Recommend ({posts, handleClick}) {
    const isMobile = useMediaQuery({
        query: "(max-width: 767px)"
    });

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
            slidesOffsetAfter={20}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className={styles.myswiper}
            breakpoints={{
                768:{
                    slidesOffsetBefore: 20
                }
            }}
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
