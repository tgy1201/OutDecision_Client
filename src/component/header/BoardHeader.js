import React from "react";
import CommonHeader from "./CommonHeader";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

function BoardHeader ({category}) {
    const navigate = useNavigate();

    const boardNameMap = {
        all: '전체',
        hot: 'HOT',
        food: '음식',
        love: '연애',
        fashion: '패션',
        hobby: '취미',
        work: '취업',
        travel: '여행',
        other: '기타',
    };

    const handleGoBack = () => {
        navigate(-1);
    }

    const handleBoardChange = (e) => {
        const key = Object.keys(boardNameMap).find(key => boardNameMap[key] === e.target.value);
        navigate(`/board/${key}`);
    }

    return (
        <CommonHeader>
            <button className={styles.menu_back} onClick={handleGoBack}><img src="/assets/images/back.png" alt="뒤로가기" /></button>
            <select className={styles.menu_list} value={boardNameMap[category]} onChange={handleBoardChange}>
                {Object.keys(boardNameMap).map((key) => (
                    <option key={key} value={boardNameMap[key]}>
                        {boardNameMap[key]}
                    </option>
                ))}
            </select>
        </CommonHeader>
    )
}

export default BoardHeader;