import React, { useState } from "react";
import styles from './comment.module.css';

import { BsSendFill } from "react-icons/bs";
import axios from "axios";
import Pagination from "../pagination/Pagination";

function Comment({comments, setComments, postId, page}) {
    const [newCommentText, setNewCommentText] = useState('');

    const commentsPerPage = 10;
    const firstCommentIndex = ((page && parseInt(page) > 0 ? parseInt(page) : 1) - 1) * commentsPerPage;
    const lastCommentIndex = firstCommentIndex + commentsPerPage;
    const currentComments = comments.slice(firstCommentIndex, lastCommentIndex);

    const handleChangeComment = (e) => {
       setNewCommentText(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        const newComment = newCommentText.trim();
        if (!newComment) {
            alert('댓글을 입력해주세요');
            return;
        }

        const formData = new FormData();
        formData.append('body', newComment);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/posts/${postId}/comments`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            });
            console.log(response.data);
            setComments([response.data.result, ...comments]); //새로운 댓글 맨앞에 추가
            setNewCommentText('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.comment_wrap}>
            <p>전체 댓글 <span>{comments ? `${comments.length}` : '0'}</span>개</p>
            <section className={styles.comment_input_wrap}>
                <textarea className={styles.comment_input} value={newCommentText} onChange={handleChangeComment} placeholder="" maxLength={90}/>
                <button onClick={handleSubmitComment}><BsSendFill style={{verticalAlign: "middle", fontSize: "1.7rem"}}/></button>
            </section>
            <section className={styles.comment_list_wrap}>
                {currentComments && currentComments.map((comment, idx) => (
                    <div className={styles.comment_list} key={idx}>
                        <div>
                            <div className={styles.comment_profile}>
                                <img src={comment.profileUrl} alt="프로필"/>
                            </div>
                            <div className={styles.comment_info}>
                                <p>{comment.nickname}</p>
                                <p>{comment.createdAt}</p>
                            </div>
                        </div>
                        <div className={styles.comment_text}>{comment.body}</div>
                    </div>
                ))}
            </section>
            <Pagination
                postsNum = {comments.length} // 게시물 총 개수
                postsPerPage = {commentsPerPage} // 페이지 당 게시물 개수
                currentPage = {page && parseInt(page) > 0 ? parseInt(page) : 1} // 현재 페이지
                pageCount = {5} // 페이지그룹 내 최대 페이지 번호 개수
            />
        </div>
    )
}

export default Comment;