import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipCore from 'swiper';
import {Navigation,Pagination, Autoplay} from 'swiper/modules'
import styles from './banner.module.css';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

SwipCore.use([Navigation, Pagination, Autoplay]);

function Banner () {
    return(
        <div className={styles.container}>
            <Swiper
                className={styles.banner}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{clickable:true}}
                //navigation
                autoplay={{delay:5000}}>
                <SwiperSlide>
                    <img src = '/assets/images/banner_1.png' alt="banner1"></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src = '/assets/images/banner_2.png' alt="banner2"></img>
                </SwiperSlide>   
            </Swiper>
        </div>
    )
}

export default Banner;