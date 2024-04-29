import React from "react";
import styles from './comment.module.css';

import { BsSendFill } from "react-icons/bs";

function Comment({comments}) {
    return (
        <div className={styles.comment_wrap}>
            <p>전체 댓글 <span>{comments ? `${comments.length}` : '0'}</span>개</p>
            <section className={styles.comment_input_wrap}>
                <textarea className={styles.comment_input} placeholder="" maxLength={90}/>
                <button><BsSendFill style={{verticalAlign: "middle", fontSize: "1.7rem"}}/></button>
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