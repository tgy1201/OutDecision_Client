import React from "react";
import CommonHeader from "./CommonHeader";
import { Link } from "react-router-dom";
import styles from './header.module.css'

function HomeHeader () {
    return (
        <CommonHeader>
            <Link to="/" className={styles.logo}><img src="/assets/images/logo.png" alt="로고" /></Link>
        </CommonHeader>
    )
}

export default HomeHeader;