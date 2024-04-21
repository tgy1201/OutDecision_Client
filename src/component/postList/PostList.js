import React, { useState } from "react";
import styles from './postList.module.css'

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";

function PostList ({post}) {
    const [isOpenResult, setIsOpenResult] = useState(false);
    
    return (
        <div className={styles.container}>
            <section className={styles.title_wrap}>
                <div style={{backgroundColor: post.state === '투표중'? "#ac2323" : "gray"}}>{post.state}</div>
                <p>[{post.category}] {post.title}</p>
            </section>
            <section className={styles.voteInfo_wrap}>   
                <div>23.06.27 18:00 종료  • 단일 선택 • <span style={{color: "#ac2323"}}>24</span> 명 참여</div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <tbody>
                        <tr>
                        {Object.values(post.option).map((option)=>
                            <td>
                                {isOpenResult || post.state==="투표종료" || post.voted ?    
                                <div className={styles.result_wrap}>{option.img !== '' && <div className={styles.option_img}><img src={option.img} alt="옵션" /></div>} <div className={styles.result_percent_wrap}><p className={option.img ? `${styles.imgText}` : `${styles.text}`}>{option.text}</p><span className={styles.percent}>{option.percent}%</span></div><div className={styles.result} style={{height: `${option.percent}%`}}/></div>
                                :<div className={styles.option_wrap} >{option.img !== '' && <div className={styles.option_img}><img src={option.img} alt="옵션" /> </div>} <p className={option.img ? `${styles.imgText}` : `${styles.text}`}>{option.text}</p></div>
                                }
                            </td>
                            )}        
                        </tr> 
                    </tbody>
                </table>
                <div className={styles.voteBtn_wrap}>
                {post.state === "투표종료" ?
                    <div>이미 종료된 투표입니다.</div>
                    : post.voted ?
                    <div>이미 완료한 투표입니다.</div>
                    : !isOpenResult ?
                    <>
                        <button className={styles.quick_vote}>빠른 투표</button>
                        <button className={styles.result_vote} onClick={()=>setIsOpenResult(true)}>결과 보기</button>
                    </>
                    :   <button className={styles.go_vote} onClick={()=>setIsOpenResult(false)}>투표하러가기</button>
                } 
                </div>
            </section>
            <section className={styles.content_wrap}>
                <p>{post.content}</p>
            </section>
            <section className={styles.postInfo_wrap}>
                <ul>
                    <li>{post.user}</li>
                    <li>{post.date}</li>
                    <li><IoHeartOutline style={{verticalAlign: "middle", marginRight: "1px"}}/>{post.like}</li>
                    <li><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "1px"}}/>3</li> 
                    <li><IoEyeOutline style={{verticalAlign: "middle", marginRight: "1px"}}/>38000</li>
                </ul>
            </section>
        </div>
    )
}

export default PostList;