import React, { useEffect, useState } from "react";
import styles from './view.module.css';
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Comment from "../../component/comment/Comment";

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";


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

function View({setCategory}) {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page'); // 댓글페이지번호

    const {bname, postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isOpenResult, setIsOpenResult] = useState(false);
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

    const handleVoteSubmit = () => {
        if (selectedOptions.length === 0) {
            alert("투표옵션을 선택해주세요");
            return;
        }
        console.log(selectedOptions, postId)
    }
    
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/post/${postId}`, {
                params: {
                  postId: postId,
                },
                withCredentials: true,
            });

            setPost(response.data.result);
            setComments(response.data.result.commentsList.commentsDTOList);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPost();
    }, [postId]);

    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    return (
        <div className={styles.container}>
            {post? (
                <div className={styles.view_wrap}>
                    <div className={styles.board_title_wrap}>
                        <h1><Link to={`/board/${bname}`}>{boardNameMap[bname]}</Link></h1>           
                    </div>
                    <div className={styles.post_wrap}>
                        <section className={styles.postInfo_wrap}>
                            <div className={styles.profile_wrap}>
                                <img src={post.profile} alt="프로필"/>
                            </div>
                            <div className={styles.user_wrap}>
                                <p>{post.nickname}</p>
                                <p>{post.createdAt}</p>
                            </div>
                            <ul>
                                <li style={{color: "#b00000"}}><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.likesCnt}</div></li>
                                <li style={{color: "#412ed1"}}><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{comments.length}</div></li> 
                                <li style={{color: "5a5a5a"}}><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.views}</div></li>
                            </ul>
                        </section>
                        <section className={styles.voteInfo_wrap}>
                            <div className={styles.voteInfo}>
                                <section className={styles.state_wrap}>
                                    <div style={{backgroundColor: filterMap[post.status] === '투표중'? "#ac2323" : "gray"}}>{filterMap[post.status]}</div>
                                </section>
                                <section className={styles.voteTitle_wrap}>
                                    <p>Q. {post.title}</p>
                                    <div>{post.deadline} 종료</div>
                                </section>
                                <section className={styles.vote_wrap}>                          
                                    <div>단일 선택</div>
                                    <div><FaUser style={{verticalAlign: "middle", marginRight: "5px"}}/><span style={{color: "#ac2323", fontWeight: "600"}}>{post.participationCnt}</span> 명 참여</div>
                                    <table className={styles.vote_table}>
                                        <tbody>
                                        {Object.values(post.optionsList).map((option, idx)=>    
                                            <tr key={idx}>
                                                {isOpenResult || filterMap[post.status] ==="투표종료" || post.voted ?
                                                    <td style={{border: "1px solid gray"}}>
                                                        <div className={styles.result_wrap} style={{width: `${option.votePercentage}%`}}>
                                                            {option.imgUrl !== '' && 
                                                            <div className={styles.option_img} style={{marginLeft: '8px'}}>
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
                                    </table>
                                    <div className={styles.resultBtn_wrap}>
                                        {filterMap[post.status] === "투표종료" ?
                                            <div>이미 종료된 투표입니다.</div>
                                        : post.voted?
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
                            </div>
                            <section className={styles.content_wrap}>
                                {post.content}
                            </section>
                            <section className={styles.like_wrap}>
                                <button>♥ 좋아요 {post.likesCnt}</button>
                            </section>
                        </section>
                    </div>
                    <Comment comments={comments} setComments={setComments} postId={postId} page={page}/>
                </div>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    )
}

export default View;