import React, { useState } from "react";
import styles from './comment.module.css';

import { BsSendFill } from "react-icons/bs";
import axios from "axios";

function Comment({comments, setComments, postId}) {
    const [newCommentText, setNewCommentText] = useState('');

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
            const response = await axios.post(`http://www.outdecision.com:8080/posts/${postId}/comments`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
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
                {comments && comments.map(comment => (
                    <div className={styles.comment_list} key={comment.id}>
                        <div>
                            <div className={styles.comment_profile}>
                                <img src={comment.profile} alt="프로필"/>
                            </div>
                            <div className={styles.comment_info}>
                                <p>{comment.user}</p>
                                <p>{comment.date}</p>
                            </div>
                        </div>
                        <div className={styles.comment_text}>{comment.comment}</div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Comment;