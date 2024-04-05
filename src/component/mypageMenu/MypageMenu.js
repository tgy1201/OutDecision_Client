import React from "react";
import styles from './mypageMenu.module.css'
import { Link } from "react-router-dom";

function MypageMenu () {
    return (
        <div className={styles.container}>
            <h2>마이페이지</h2>
            <ul className={styles.menu_list}>
                <li><Link to="/mypage" className={styles.active}>마이페이지 홈</Link></li>
                <li><Link to="/">회원정보 수정</Link></li>
                <li><Link to="/">작성한 글</Link></li>
                <li><Link to="/">작성한 댓글</Link></li>
                <li><Link to="/">좋아요한 글</Link></li>
            </ul>
        </div>
    )
}

export default MypageMenu;