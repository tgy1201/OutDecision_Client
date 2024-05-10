import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import styles from './mainFinishedPost.module.css';

import PostCard from '../postCard/PostCard';

function MainFinishedPost ({posts}) {

    return (
        <>
            <Swiper
            slidesPerView={'auto'}
            centeredSlides={false}
            spaceBetween={30}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
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

export default MainFinishedPost;
