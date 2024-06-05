import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './recommed.module.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import PostCard from '../postCard/PostCard';

import { GrPowerReset } from "react-icons/gr";

function Recommend ({posts, handleClick}) {

    return (
        <>
            <div className={styles.recommend_header}>
                <div>추천 게시물</div>
                <p>투표하고 의견을 제시해보세요</p>
                <button onClick={handleClick}><GrPowerReset style={{verticalAlign: "middle", fontSize: "1.5rem"}}/></button>
            </div>
            <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            slidesOffsetAfter={20}
            observer={true}
            observeParents={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            modules={[FreeMode, Pagination]}
            className={styles.myswiper}
            breakpoints={{
                768:{
                    slidesOffsetBefore: 20,
                    centeredSlides: false,
                    freeMode: true
                }
            }}
            >
            {posts && posts.length > 0 ? (
            posts.map((post, idx)=>
                (
                    <SwiperSlide key={idx} className={styles.post_wrap}>
                        <PostCard post={post} />
                    </SwiperSlide>
                ))
            )
            :<>Loading...</>
            }
            </Swiper>
        </>
    );
}

export default Recommend;
