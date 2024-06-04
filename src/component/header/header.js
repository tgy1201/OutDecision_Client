import React from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import BoardHeader from "./BoardHeader";
import MobileHeader from "./MobileHeader";

function Header({category}) {
    const location = useLocation();

    const isLoginPage = location.pathname  === '/login';
    const isResetPage = location.pathname === '/checkMember' || location.pathname.includes('/resetPassword');
    const isSignPage = location.pathname.includes('/signup');
    const isMyPage = location.pathname.includes('/mypage');
    const isBoardPage = location.pathname.includes('/board/');
    const isRankingPage = location.pathname.includes('/ranking');
    const isWritePage = location.pathname === '/write';
  
    return (
        <header>
            {isLoginPage ? <MobileHeader.LoginHeader /> :
                isResetPage ? <MobileHeader.ResetHeader /> :
                isSignPage ? <MobileHeader.SignupHeader /> :
                isMyPage ? <MobileHeader.MypageHeader /> :
                isBoardPage ? <BoardHeader category={category}/> :
                isRankingPage ? <MobileHeader.RankingHeader /> :
                isWritePage ? <MobileHeader.WriteHeader /> :
                <HomeHeader />
            }             
        </header>
    );
}

export default Header;