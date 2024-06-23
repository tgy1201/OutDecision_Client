import React, { useState } from "react";
import styles from './comment.module.css';

import { BsSendFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { TiArrowForward } from "react-icons/ti";
import axios from "axios";
import Pagination from "../pagination/Pagination";

function Comment({comments, setComments, postId, page}) {
    const [newCommentText, setNewCommentText] = useState('');
    const [newReplyText, setNewReplyText] = useState('');
    const [rootCommentId, setRootCommentId] = useState();

    const commentsPerPage = 10;
    const firstCommentIndex = ((page && parseInt(page) > 0 ? parseInt(page) : 1) - 1) * commentsPerPage;
    const lastCommentIndex = firstCommentIndex + commentsPerPage;
    const currentComments = comments.slice(firstCommentIndex, lastCommentIndex);

    const handleChangeComment = (e) => {
        setNewCommentText(e.target.value);
    };

    const handleChangeReply = (e) => {
        setNewReplyText(e.target.value);
    };

    const handleReplyComment = (commentsId) => {
        if (!sessionStorage.isLogin) {
            alert('로그인 후 이용가능합니다');
            return;
        }

        if(commentsId === rootCommentId) {
            setRootCommentId();
        } else {
            setNewReplyText('');
            setRootCommentId(commentsId);
        }
    }

    const handleRemoveComment = async (commentsId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/posts/${postId}/comments/${commentsId}`, {
                withCredentials: true,
            });

            if(response.data.isSuccess) {
                //state에서 삭제한 댓글 제거
                setComments(comments.filter((comment)=>comment.commentsId !== commentsId));
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveReply = async (replyId) => {
        console.log(replyId);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!sessionStorage.isLogin) {
            alert('로그인 후 이용가능합니다');
            return;
        }

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

    const handleSubmitReply = async (commentsId) => {
        const updatedComments = comments.map((c) => {
            if (c.commentsId === commentsId) {
              return { ...c, replies: [ { replyId: 4, isOwn: true, profileUrl: '', memberTitle: null, nickname: '테스트', createdAt: '2024.06.23 18:00', body: newReplyText }] };
            }
            return c;
        });
        setComments(updatedComments);
        setRootCommentId();
        setNewReplyText('');
        console.log(comments)
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
                    <div key={idx}>
                        <div className={styles.comment_list}>
                            <div className={styles.comment_option_wrap}>
                                <p className={styles.comment_plus} onClick={()=>handleReplyComment(comment.commentsId)}><FaComment style={{fontSize: '0.8rem'}}/> 답글</p>
                                {comment.isOwn &&  <p className={styles.comment_delete} onClick={()=>handleRemoveComment(comment.commentsId)}><MdDeleteForever style={{fontSize: '1.0rem'}}/> 삭제</p>}
                            </div>
                            <div className={styles.user_wrap}>
                                <div className={styles.comment_profile}>
                                    <img src={comment.profileUrl} alt="프로필"/>
                                </div>
                                <div className={styles.comment_info}>
                                    <p>{comment.memberTitle &&<span style={{color: '#354edd', fontSize: '1.0rem'}}>{comment.memberTitle} </span>}{comment.nickname}</p>
                                    <p>{comment.createdAt}</p>
                                </div>
                            </div>
                            <div className={styles.comment_text}>{comment.body}</div>
                        </div>
                        {comment.commentsId === rootCommentId && 
                            <div className={styles.comment_reply_wrap}>
                                <TiArrowForward style={{transform: "scaleY(-1)", fontSize: "2.4rem", margin: "5px"}}/>
                                <div className={styles.reply_input_wrap}>
                                    <textarea className={styles.reply_input} value={newReplyText} onChange={handleChangeReply} placeholder="" maxLength={70}/>
                                    <button onClick={()=>handleSubmitReply(comment.commentsId)}><BsSendFill style={{verticalAlign: "middle", fontSize: "1.4rem"}}/></button>
                                </div>
                            </div>
                        }
                        {comment.replies && comment.replies.map((reply, idx) => (
                            <div className={styles.comment_reply_wrap} key={idx}>
                                <TiArrowForward style={{transform: "scaleY(-1)", fontSize: "2.4rem", margin: "5px"}}/>
                                <div className={styles.comment_list}>
                                    <div className={styles.comment_option_wrap}>
                                        {reply.isOwn &&  <p className={styles.comment_delete} onClick={()=>handleRemoveReply(reply.replyId)}><MdDeleteForever style={{fontSize: '1.0rem'}}/> 삭제</p>}
                                    </div>
                                    <div className={styles.user_wrap}>
                                        <div className={styles.comment_profile}>
                                            <img src={reply.profileUrl} alt="프로필"/>
                                        </div>
                                        <div className={styles.comment_info}>
                                            <p>{reply.memberTitle &&<span style={{color: '#354edd', fontSize: '1.0rem'}}>{reply.memberTitle} </span>}{reply.nickname}</p>
                                            <p>{reply.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className={styles.comment_text}>{reply.body}</div>
                                </div>
                            </div>
                        ))}
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