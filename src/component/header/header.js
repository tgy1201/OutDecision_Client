import React from "react";
import styles from './header.module.css'
import { useLocation } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import CommonHeader from "./CommonHeader";
import BoardHeader from "./BoardHeader";
import MobileHeader from "./MobileHeader";

function Header({category}) {
    const location = useLocation();

    const isLoginPage = location.pathname  === '/login';
    const isSignPage = location.pathname.includes('/signup');
    const isMyPage = location.pathname.includes('/mypage');
    const isBoardPage = location.pathname.includes('/board/');
    const isRankingPage = location.pathname.includes('/ranking');
    
    

    return (
        <header>
            <div className={styles.pc}>
                <CommonHeader />
            </div>

            <div className={styles.mobile}>
                {isLoginPage ? <MobileHeader.LoginHeader /> :
                 isSignPage ? <MobileHeader.SignupHeader /> :
                 isMyPage ? <MobileHeader.MypageHeader /> :
                 isBoardPage ? <BoardHeader category={category}/> :
                 isRankingPage ? <MobileHeader.RankingHeader /> :
                 <HomeHeader />}
            </div>                
        </header>
    );
}

export default Header;