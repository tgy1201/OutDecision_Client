import React from "react";
import styles from './category.module.css'
import { Link } from "react-router-dom";

//import { TbCategoryFilled } from "react-icons/tb"; // 전체
import { BsFire } from "react-icons/bs"; // HOT
import { MdFastfood } from "react-icons/md"; // 음식
import { FaShirt } from "react-icons/fa6";
import { ImAirplane } from "react-icons/im"; // 여행
import { MdWorkHistory } from "react-icons/md"; //취업
import { IoGameController } from "react-icons/io5"; //취미
import { MdFavorite } from "react-icons/md"; // 연애
import { CgMoreO } from "react-icons/cg"; //etc

function Category () {
    return (
        <div className={styles.category}>
            <div className={styles.category_wrap}>
                <Link to="/board/hot" >
                    <span><BsFire className={styles.icon}/></span>
                    <span>HOT</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/food" >
                <span><MdFastfood className={styles.icon}/></span>
                    <span>음식</span>
                </Link>
            </div>
            <div className={styles.category_wrap} >
                <Link to="/board/fashion">
                    <span><FaShirt className={styles.icon}/></span>
                    <span>패션</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/travel">
                    <span><ImAirplane className={styles.icon}/></span>
                    <span>여행</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/work">
                    <span><MdWorkHistory className={styles.icon}/></span>
                    <span>취업</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/hobby" >
                    <span><IoGameController className={styles.icon}/></span>
                    <span>취미</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/love" >
                    <span><MdFavorite className={styles.icon}/></span>
                    <span>연애</span>
                </Link>
            </div>
            <div className={styles.category_wrap}>
                <Link to="/board/etc">
                    <span><CgMoreO className={styles.icon}/></span>
                    <span>기타</span>
                </Link>
            </div>
        </div>
    )
}

export default Category;