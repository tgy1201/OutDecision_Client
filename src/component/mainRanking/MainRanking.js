import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './mainRanking.module.css';

import { FreeMode, Pagination } from 'swiper/modules';

import { GiCurlyWing } from "react-icons/gi";

function MainRanking ({ranks}) {
    return (
        <Swiper
            slidesPerView={2.7}
            spaceBetween={15}
            freeMode={true}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            modules={[FreeMode, Pagination]}
            className={styles.myswiper}
            breakpoints={{      
                600:{
                    slidesPerView: 3.2,
                    spaceBetween: 16         
                },
                700:{
                    slidesPerView: 3.7,
                    spaceBetween: 17         
                },
                880:{
                    slidesPerView: 4.2,
                    spaceBetween: 18         
                },
                980:{
                    slidesPerView: 4.7,
                    spaceBetween: 19 
                }
                ,
                1080:{
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                }
                }
            }
            >
            {ranks.length > 0 ? (
                ranks.map((rank, idx)=>
                (
                    <SwiperSlide 
                        key={idx} 
                        className={
                            rank.rank===1 ? `${styles.rank_wrap} ${styles.first}` : 
                            rank.rank===2 ? `${styles.rank_wrap} ${styles.second}` :
                            rank.rank===3 ? `${styles.rank_wrap} ${styles.third}` :
                            `${styles.rank_wrap}`
                            }
                        >
                        <p className={styles.rank}>
                            <GiCurlyWing className={styles.left_wing}/>
                            {rank.rank}
                            <GiCurlyWing className={styles.right_wing}/></p>
                        <div className={styles.profile_wrap}>
                            <img src={rank.userImg} alt="프로필" />
                        </div>
                        <p className={styles.user}>{rank.nickname}</p>
                        <p className={styles.point}><span style={{color: '#ac2323', fontWeight: '600'}}>{rank.point}</span> 점</p>
                    </SwiperSlide>
                ))
            )
            : <>Loading...</>
            }
        </Swiper>
    )
}

export default MainRanking;