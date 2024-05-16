import React, { useState } from "react";
import styles from './postCard.module.css';
import { Link } from "react-router-dom";

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
// import { GoBell } from "react-icons/go";
import { GoBellFill } from "react-icons/go";

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

const filterMap = {
    female: '여성',
    male: '남성',
    progress: '투표중',
    end: '투표종료'
}

function PostCard({post, bname}) {
    /*포스트 고유넘버를 서버에 보내서 로그인 한 유저가 해당 포스트에 (1) 투표를 했는지, (2) 했다면 몇번에 투표했는지 받기*/
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]); //사용자가 선택한 투표옵션
  
    const handleOptionChange = (index) => {
        if (post.pluralVoting) {
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

    const handleVoteSubmit = () => {
        if (selectedOptions.length === 0) {
            alert("투표옵션을 선택해주세요");
            return;
        }
        console.log(selectedOptions, post.postId)
    }

    return(
        <>
            <GoBellFill style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a"}}/>
            <section className={styles.state_wrap}>
                <div style={{backgroundColor: filterMap[post.status] === '투표중'? "#ac2323" : "gray"}}>{filterMap[post.status]}</div>
            </section>
            <section className={styles.title_wrap}>
                <Link to={bname ? `/board/${bname}/view/${post.postId}` : `/board/${post.category}/view/${post.postId}`}>
                    <p>{!bname || bname === 'hot' || bname === 'all' ? `[${boardNameMap[post.category]}]` : ''}{post.title}</p>
                </Link>
                <div>{post.deadline} 종료</div>
                <div>{post.pluralVoting ? '복수 선택' : '단일 선택'} • <span style={{color: "#ac2323"}}>{post.participationCnt}</span> 명 참여</div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <tbody>
                    {Object.values(post.optionsList).map((option, idx)=>    
                        <tr key={idx}>
                            {isOpenResult || filterMap[post.status] ==="투표종료" || post.voted ?
                                <td style={{border: "1px solid gray"}}>
                                    <div className={styles.result_wrap} style={{width: `${option.votePercentage}%`}}>
                                        {option.imgUrl !== '' && 
                                        <div className={styles.option_img} style={{marginLeft: "8px"}}>
                                            <img src={option.imgUrl} alt="옵션" />
                                        </div>
                                        } 
                                    </div>
                                    <p className={option.imgUrl? `${styles.text}`: `${styles.text2}`}>
                                        {option.body}
                                    </p>
                                    <span className={styles.percent}>{option.votePercentage}%</span>
                                </td>
                            :   <td className={selectedOptions.includes(idx) ? `${styles.selected}` : `${styles.unselected}`} onClick={()=>handleOptionChange(idx)}>
                                    <div className={styles.option_wrap} >
                                        {option.imgUrl !== '' && 
                                        <div className={styles.option_img}>
                                            <img src={option.imgUrl} alt="옵션" /> 
                                        </div>} 
                                        <p>{option.body}</p>
                                    </div>
                                </td>
                            }
                        </tr> 
                    )}
                    </tbody>
                    <tfoot>
                        <tr>
                            {filterMap[post.status] === "투표종료" ?
                                <td><div>이미 종료된 투표입니다.</div></td>
                            : post.voted?
                                <td><div>이미 완료한 투표입니다.</div></td> 
                            : !isOpenResult ?
                                <td>
                                    <button className={styles.quick_vote} onClick={handleVoteSubmit} style={{color: selectedOptions.length !== 0 ? "#5a5a5a" : "#a9a9a9"}}>빠른 투표</button>
                                    <button className={styles.result_vote} onClick={()=>setIsOpenResult(true)}>결과 보기</button>
                                </td>
                            :   <td><button className={styles.go_vote} onClick={()=>setIsOpenResult(false)}>투표하러가기</button></td>
                            }       
                        </tr>
                    </tfoot>
                </table>
            </section>
            <section className={styles.content_wrap}>
                <p>{post.content}</p>
            </section>
            <section className={styles.postInfo_wrap}>
                <ul>
                    <li>{post.nickname}</li>
                    <li>{post.bumpsTime}</li>
                    <li><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.likesCnt}</div></li>
                    <li><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.commentsCnt}</div></li> 
                    <li><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.views}</div></li>
                </ul>
            </section>
        </>
    );
}

export default PostCard;