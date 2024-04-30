import React, { useState } from "react";
import styles from './postList.module.css'

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const boardNameMap = {
    all: '전체',
    hot: 'HOT',
    food: '음식',
    love: '연애',
    fashion: '패션',
    hobby: '취미',
    work: '취업',
    travel: '여행',
    etc: '기타',
};

function PostList ({post, bname}) {
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [scrollPosition, setScrollPosition] = useState('left-border');
    const [selectedOptions, setSelectedOptions] = useState([]); //사용자가 선택한 투표옵션
  
    const handleOptionChange = (index) => {
        if (post.multiple) {
            if (selectedOptions.includes(index)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== index));
            } else {
            setSelectedOptions([...selectedOptions, index]);
            }
        } else {
            if (selectedOptions.includes(index)) {
                setSelectedOptions([]); //선택한 옵션을 한번 더 클릭할 경우 선택 취소
            } else {
                setSelectedOptions([index]);
            }
        }
    };

    const handleScroll = (e) => {
        const container = e.target
        const scrollRight = container.scrollWidth - container.scrollLeft - container.clientWidth;

        if (container.scrollLeft === 0) {
            setScrollPosition("left-border");
        } else if (scrollRight < 2 && scrollRight > -2) {
            setScrollPosition("right-border");
        } else {
            setScrollPosition("middle");
        }
    };

    const handleVoteSubmit = () => {
        if (selectedOptions.length === 0) {
            alert("투표옵션을 선택해주세요");
            return;
        }
        console.log(selectedOptions, post.id)
    }
    
    return (
        <div className={styles.container}>
            <section className={styles.title_wrap}>
                <div style={{backgroundColor: post.state === '투표중'? "#ac2323" : "gray"}}>{post.state}</div>
                <Link to={bname ? `/board/${bname}/view/${post.id}` : `/board/${post.category}/view/${post.id}`}>
                    <p>[{boardNameMap[post.category]}] {post.title}</p>
                </Link>
            </section>
            <section className={styles.voteInfo_wrap}>   
                <div>23.06.27 18:00 종료  • 단일 선택 • <span style={{color: "#ac2323"}}>24</span> 명 참여</div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <div className={scrollPosition === 'right-border' || scrollPosition === 'middle' ? styles.prev : ''}></div>
                    <div className={scrollPosition === 'left-border' || scrollPosition === 'middle' ? styles.next : ''}></div>
                    <tbody onScroll={handleScroll}>
                        <tr>
                        {Object.values(post.option).map((option, idx)=>
                            <td>
                                {isOpenResult || post.state==="투표종료" || post.voted ?    
                                <div className={styles.result_wrap}>
                                    {option.img !== '' && 
                                    <div className={styles.option_img}>
                                        <img src={option.img} alt="옵션" />
                                    </div>
                                    } 
                                    <div className={styles.result_percent_wrap}>
                                        <p className={option.img ? `${styles.imgText}` : `${styles.text}`}>{option.text}</p>
                                        <span className={styles.percent}>{option.percent}%</span>
                                    </div>
                                    <div className={styles.result} style={{height: `${option.percent}%`, transition: 'height 0.5s ease'}}/>
                                </div>
                                :<div className={selectedOptions.includes(idx) ? `${styles.selected} ${styles.option_wrap}` : `${styles.unselected} ${styles.option_wrap}`} onClick={()=>handleOptionChange(idx)}>
                                    {option.img !== '' && 
                                    <div className={styles.option_img}>
                                        <img src={option.img} alt="옵션" /> 
                                    </div>
                                    }
                                    <div className={styles.option_percent_wrap}>
                                        <p className={option.img ? `${styles.imgText}` : `${styles.text}`}>{option.text}</p>
                                    </div>
                                </div>
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
                        <button className={styles.quick_vote} onClick={handleVoteSubmit} style={{color: selectedOptions.length !== 0 ? "#5a5a5a" : "#a9a9a9"}}>빠른 투표</button>
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
                    <li><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.like}</div></li>
                    <li><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.comment}</div></li> 
                    <li><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.view}</div></li>
                </ul>
            </section>
        </div>
    )
}

export default PostList;