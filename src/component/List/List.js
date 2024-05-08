import React from "react";
import styles from './list.module.css'
import PostList from "../postList/PostList";
import Pagination from "../pagination/Pagination";

function List ({posts, bname, page}) {
    const postsPerPage = 6;
    const firstPostIndex = ((page && parseInt(page) > 0 ? parseInt(page) : 1) - 1) * postsPerPage;
    const lastPostIndex = firstPostIndex + postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <table className={styles.container}>
                <tbody>
                {currentPosts.map((post, idx)=>
                (
                <tr className={styles.post_wrap} key={idx}>
                    <td><PostList post={post} bname={bname}/></td>
                </tr>
                ))}
                </tbody> 
            </table>
            <Pagination
                postsNum = {posts.length} // 게시물 총 개수
                postsPerPage = {postsPerPage} // 페이지 당 게시물 개수
                currentPage = {page && parseInt(page) > 0 ? parseInt(page) : 1} // 현재 페이지
                pageCount = {5} // 페이지그룹 내 최대 페이지 번호 개수
            />
        </>
    )
}

export default List;