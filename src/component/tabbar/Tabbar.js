import React from "react";
import styles from "./tabbar.module.css"
import { Link } from "react-router-dom";

function Tabbar () {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.quick_menu_wrap}>
                <span>
                    <img src="/assets/images/home_w.png" alt="home" />
                </span>
                <span>홈</span>
            </Link>
            <Link to="/board/all" className={styles.quick_menu_wrap}>
                <span>
                    <img src="/assets/images/board.png" alt="board" />
                </span>
                <span>게시판</span>
            </Link>
            <Link to="/write" className={styles.quick_menu_wrap}>
                <span className={styles.quick_middle_menu}>
                    <img src="/assets/images/write.png" alt="write" />
                </span>
                <span>투표 작성</span>
            </Link>
            <Link to="/ranking" className={styles.quick_menu_wrap}>
                <span>
                    <img src="/assets/images/ranking.png" alt="ranking" />
                </span>
                <span>랭킹</span>
            </Link>
            <Link to="/mypage" className={styles.quick_menu_wrap}>
                <span>
                    <img src="/assets/images/mypage.png" alt="mypage" />
                </span>
                <span>마이페이지</span>
            </Link>
        </div>
    )
}

export default Tabbar;