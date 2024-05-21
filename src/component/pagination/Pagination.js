import React, { useEffect, useState } from "react";
import styles from './pagination.module.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

function Pagination ({postsNum, postsPerPage, currentPage, pageCount }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handlePageParams = (page) => {
        /* 페이지 매개변수는 현재 쿼리 문자열에 붙임 */
        searchParams.set('page', page);
        navigate(`?${searchParams.toString()}`)
    }

    const totalPages = Math.ceil(postsNum / postsPerPage); // 총 페이지 수 서버에서 줌
    const pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹 개수
    const isOverPage = pageGroup * pageCount < totalPages; // 마지막 페이지그룹인지 확인
    const pagesPerPage = isOverPage ? pageCount : pageGroup === 1 ? totalPages : totalPages - (pageGroup - 1) * pageCount; // 페이지 당 페이지번호 개수

    const [start, setStart] = useState(1);
    const prev = start === 1;
    const next = start + pageCount - 1 >= totalPages;

    useEffect(() => {
        if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
        if (currentPage < start) setStart((prev) => prev - pageCount);
    }, [currentPage, pageCount, start]);

    return (
        <nav className={styles.pagination_wrap}>
            <ul>
                <li className={prev ? styles.invisible : ''}>
                <button onClick={() => handlePageParams(start-1)}><FaAngleLeft style={{verticalAlign: "middle"}}/></button>
                </li>
                {[...Array(Math.max(0,pagesPerPage))].map((a, i) => (
                        <li key={i}>
                            <button className={`${styles.page} ${currentPage === start + i && styles.active}`} onClick={() => handlePageParams(start+i)}>
                            { start + i }
                            </button>
                        </li>
                ))}
                <li className={next ? styles.invisible : ''}>
                <button onClick={() => handlePageParams(start+pageCount)}><FaAngleRight style={{verticalAlign: "middle"}}/></button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;