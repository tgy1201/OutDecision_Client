import React from "react";
import CommonHeader from "./CommonHeader";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

function LoginHeader () {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <CommonHeader>
            <button className={styles.menu_back} onClick={handleGoBack}><img src="/assets/images/back.png" alt="뒤로가기" /></button>
            <span style={{fontSize: "1.4rem", marginLeft: "35px"}}>로그인</span>
        </CommonHeader>
    )
}

function SignupHeader () {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <CommonHeader>
            <button className={styles.menu_back} onClick={handleGoBack}><img src="/assets/images/back.png" alt="뒤로가기" /></button>
            <span style={{fontSize: "1.4rem", marginLeft: "35px"}}>회원가입</span>
        </CommonHeader>
    )
}

function MypageHeader () {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <CommonHeader>
            <button className={styles.menu_back} onClick={handleGoBack}><img src="/assets/images/back.png" alt="뒤로가기" /></button>
            <span style={{fontSize: "1.4rem", marginLeft: "35px"}}>마이페이지</span>
        </CommonHeader>
    )
}

function RankingHeader () {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <CommonHeader>
            <button className={styles.menu_back} onClick={handleGoBack}><img src="/assets/images/back.png" alt="뒤로가기" /></button>
            <span style={{fontSize: "1.4rem", marginLeft: "35px"}}>포인트랭킹</span>
        </CommonHeader>
    )
}

const MobileHeader = {
    LoginHeader,
    SignupHeader,
    MypageHeader,
    RankingHeader
}

export default MobileHeader;