import React, { useEffect, useState } from "react";
import PostList from "../postList/PostList";

import { useMediaQuery } from "react-responsive";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './mainPost.module.css';

import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

function MainPost({posts, bname}) {
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);

    const isMobile = useMediaQuery({
        query: "(max-width: 899px)"
    });

    const prevHandler = () => {
        swiperRef.slidePrev();
    };

    const nextHandler = () => {
        swiperRef.slideNext();
    };

    useEffect(()=> {
        if (swiperRef) {
            swiperRef.slideTo(0);
        }
    }, [isMobile, swiperRef])

    return (
        <>
            <Swiper
                spaceBetween={15}
                allowTouchMove={false}
                className={styles.main_post_wrap}
                onActiveIndexChange={(e)=>setSwiperIndex(isMobile? e.realIndex : Math.floor(e.realIndex / 2))}
                onSwiper={(e) => {setSwiperRef(e)}}
                breakpoints={{      
                        900:{
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                      spaceBetween: 20         
                      },
                    }
                }
            >
            {posts.length > 0 ? (
                posts.map((post) => (
                    <SwiperSlide className={styles.main_post} key={post.id}>
                        <PostList post={post} bname={bname}/>
                    </SwiperSlide>
                ))
            )
            : <>Loading...</>
            }
            </Swiper>
            <div className={styles.pagination_wrap}>
                <button 
                    className={styles.pagination_button} 
                    onClick={prevHandler} 
                    style={{color: swiperIndex === 0 ? '#cdcdcd': '#5a5a5a'}}
                >
                    <FiChevronLeft className={styles.icon}/>
                </button>
                <div className={styles.pagination}>
                    <span>{swiperIndex + 1}</span>
                    <span>{'/'}</span>
                    <span>{isMobile ? posts.length : Math.ceil(posts.length / 2)}</span>
                </div>
                <button 
                    className={styles.pagination_button} 
                    onClick={nextHandler} 
                    style={{color: isMobile
                        ? swiperIndex + 1 === posts.length ? '#cdcdcd' : '#5a5a5a' 
                        : swiperIndex + 1 === Math.ceil(posts.length / 2) ? '#cdcdcd' : '#5a5a5a'
                    }}
                >
                    <FiChevronRight className={styles.icon}/>
                </button>
            </div>
        </>
    )
}

export default MainPost;