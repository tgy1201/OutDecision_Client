import React from "react";
import styles from './category.module.css'
import { Link } from "react-router-dom";

function Category () {
    return (
        <div className={styles.category}>
            <div className={styles.category_wrap} >
                <Link to="/board/all">
                    <span>
                        <img src="/assets/images/all.png" alt="전체" />
                    </span>
                    <span>전체</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/hot" >
                    <span>
                        <img src="/assets/images/hot.png" alt="hot" />
                    </span>
                    <span>HOT</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/food" >
                    <span>
                        <img src="/assets/images/food.png" alt="음식" />
                    </span>
                    <span>음식</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/travel">
                    <span>
                        <img src="/assets/images/travel.png" alt="여행" />
                    </span>
                    <span>여행</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/work">
                    <span>
                        <img src="/assets/images/work.png" alt="취업" />
                    </span>
                    <span>취업</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/hobby" >
                    <span>
                        <img src="/assets/images/hobby.png" alt="취미" />
                    </span>
                    <span>취미</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/love" >
                    <span>
                        <img src="/assets/images/love.png" alt="연애" />
                    </span>
                    <span>연애</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/etc">
                    <span>
                        <img src="/assets/images/etc.png" alt="기타" />
                    </span>
                    <span>기타</span>
                </Link>
            </div>
        </div>
    )
}

export default Category;