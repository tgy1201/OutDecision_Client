import React, { useEffect, useState } from "react";
import styles from './view.module.css';
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Comment from "../../component/comment/Comment";

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { GoBell, GoBellFill, GoBellSlash} from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { TbPencilCog } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import ImageModal from "../../component/imageModal/ImageModal";

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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page'); // 댓글페이지번호

    const {bname, postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]); //사용자가 선택한 투표옵션
    const [isAlarmCheck, setIsAlarmCheck] = useState(false);
    const [likesCnt, setLikesCnt] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [votedOptionId, setVotedOptionId] = useState([]);
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

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

    const handleVoteSubmit = async (e) => {
        e.preventDefault();

        if (!sessionStorage.isLogin) {
            alert("로그인 후 이용가능합니다");
            return;
        }

        if (selectedOptions.length === 0) {
            alert("투표옵션을 선택해주세요");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/vote`, selectedOptions, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            });
            if(response.data.isSuccess) {
                setIsVoted(true);
                setPost((preState)=> ({...preState,
                participationCnt: post.participationCnt+1,
                optionsList: response.data.result.optionsList,
                }))
                setVotedOptionId(response.data.result.selectedOptions);
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickAlarm = async (e) => {
        e.preventDefault();
        
        if(!sessionStorage.isLogin) {
            alert('로그인 후 이용가능합니다');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/post/${postId}/notification`, {}, {
                withCredentials: true,
            });

            console.log(response.data);
            setIsAlarmCheck(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelAlarm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/post/${postId}/notification`, {
                withCredentials: true,
            });

            console.log(response.data);
            setIsAlarmCheck(false);
        } catch (error) {
            console.error(error);
        }
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
            setLikesCnt(response.data.result.likesCnt);

            if(response.data.result.loginMemberPostInfoDTOList) {
                setIsAlarmCheck(response.data.result.loginMemberPostInfoDTOList.receiveAlert);
                setIsLiked(response.data.result.loginMemberPostInfoDTOList.isLiked);
                setIsVoted(response.data.result.loginMemberPostInfoDTOList.votedOptionIds.length > 0 ? true : false);
                setVotedOptionId(response.data.result.loginMemberPostInfoDTOList.votedOptionIds);
            }
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

    const handleLike = async (e) => {
        e.preventDefault();

        if (!sessionStorage.isLogin) {
            alert("로그인 후 이용가능합니다");
            return;
        }
        if (isLiked) {
            alert("이미 좋아요를 누른 게시글입니다");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/post/${postId}/like`, null, {
                withCredentials: true,
            });
            setLikesCnt(response.data.result);
            setIsLiked(true);
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    const handleUptoPost = async (e) => {
        e.preventDefault();

        if(post.bumps === 0) {
            alert('끌어올리기 개수가 모두 소진되었습니다');
            return;    
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/post/${postId}/bumps`, null, {
                withCredentials: true,
            });
            if(response.data.isSuccess) {
                alert('끌어올리기 성공');
                setPost((preState)=> ({...preState,
                    bumps: post.bumps - 1,
                    }))
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditPost = () => {
        if (post.participationCnt > 0) {
            alert('투표참여자가 존재하여 게시글을 수정할 수 없습니다');
            return;
        }
        navigate(`/edit/${postId}`);
    }

    const handleRemovePost = async (e) => {
        e.preventDefault();
        if (post.participationCnt > 0) {
            alert('투표참여자가 존재하여 게시글을 삭제할 수 없습니다');
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/post/${postId}`, {
                withCredentials: true,
            });
            if(response.data.isSuccess) {
                alert('게시글 삭제 완료');
                navigate(`/board/${bname}`);
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleZoomImage = (imgUrl) => {
        setSelectedImage(imgUrl);
        setIsOpen(true);
    }

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
          document.body.style.touchAction = "none";
        } else {
          document.body.style.overflow = "auto";
          document.body.style.touchAction = "auto";
        }
    }, [isOpen]); 

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
                                <img src={post.profileUrl} alt="프로필"/>
                            </div>
                            <div className={styles.user_wrap}>
                                <p>{post.nickname}</p>
                                <p>{post.createdAt}</p>
                            </div>
                            <ul>
                                <li style={{color: "#b00000"}}><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{likesCnt}</div></li>
                                <li style={{color: "#412ed1"}}><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{comments.length}</div></li> 
                                <li style={{color: "5a5a5a"}}><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.views}</div></li>
                            </ul>
                        </section>
                        <section className={styles.voteInfo_wrap}>
                            <div className={styles.voteInfo}>
                                {post.gender === 'male' ?  
                                <IoMdMale style={{position: "absolute", left: "11px", top: "11px", fontSize: "1.6rem", color: '#5445dc', verticalAlign: 'middle'}}/>
                                : post.gender === 'female' ?
                                <IoMdFemale style={{position: "absolute", left: "11px", top: "11px", fontSize: "1.6rem", color: '#ac2323', verticalAlign: 'middle'}}/> : ''
                                }
                                {post.status==='progress'?
                                isAlarmCheck ? 
                                <GoBellFill onClick={handleCancelAlarm}style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a", cursor: "pointer"}}/>
                                : <GoBell onClick={handleClickAlarm} style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a", cursor: "pointer"}} />
                                : <GoBellSlash style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a"}} />
                                }
                                <section className={styles.state_wrap}>
                                    <div style={{backgroundColor: filterMap[post.status] === '투표중'? "#ac2323" : "gray"}}>{filterMap[post.status]}</div>
                                </section>
                                <section className={styles.voteTitle_wrap}>
                                    <p>Q. {post.title}</p>
                                    <div>{post.deadline} 종료</div>
                                </section>
                                <section className={styles.vote_wrap}>                          
                                    <div>{post.pluralVoting ? '복수 선택' : '단일 선택'}</div>
                                    <div><FaUser style={{verticalAlign: "middle", marginRight: "5px"}}/><span style={{color: "#ac2323", fontWeight: "600"}}>{post.participationCnt}</span> 명 참여</div>
                                    <table className={styles.vote_table}>
                                        <tbody>
                                        {Object.values(post.optionsList).map((option, idx)=>    
                                            <tr key={idx}>
                                                {isOpenResult || filterMap[post.status] ==="투표종료" || isVoted ?
                                                    <td className={votedOptionId?.includes(option.optionId)?`${styles.selected}`:`${styles.unselected}`}>
                                                        <div className={styles.result_wrap} style={{width: `${option.votePercentage}%`, backgroundColor: votedOptionId?.includes(option.optionId)? '#fbdbdb':'#cacaca'}}>
                                                            {option.imgUrl !== '' && 
                                                            <div className={styles.option_img} style={{marginLeft: '8px'}} onClick={()=>handleZoomImage(option.imgUrl)}>
                                                                <img src={option.imgUrl} alt="옵션" />
                                                            </div>
                                                            } 
                                                        </div>
                                                        <p className={option.imgUrl? `${styles.text}`: `${styles.text2}`}>
                                                            {option.body}
                                                        </p>
                                                        <span className={styles.percent}>{option.votePercentage}%</span>
                                                    </td>
                                                :   <td className={selectedOptions.includes(option.optionId) ? `${styles.selected}` : `${styles.unselected}`} onClick={()=>handleOptionChange(option.optionId)}>
                                                        <div className={styles.option_wrap} >
                                                            {option.imgUrl !== '' && 
                                                            <div className={styles.option_img} onClick={()=>handleZoomImage(option.imgUrl)}>
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
                                        : isVoted?
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
                            <section className={styles.like_wrap} style={{marginBottom: post.bumps? 0 : '40px'}}>
                                <button onClick={handleLike}>♥ 좋아요 {likesCnt}</button>
                            </section>
                            {!(post.bumps === null) &&
                            <section className={styles.util_wrap}>           
                                <button className={styles.upto_btn} onClick={handleUptoPost}><LuArrowUpWideNarrow />끌어올리기 {post.bumps}</button>
                                <button onClick={handleEditPost}><TbPencilCog />수정</button>
                                <button onClick={handleRemovePost}><MdOutlineDeleteOutline />삭제</button>
                            </section>
                            }
                        </section>
                    </div>
                    <Comment comments={comments} setComments={setComments} postId={postId} page={page}/>
                    <ImageModal isOpen={isOpen} setIsOpen={setIsOpen} imgUrl={selectedImage} />
                </div>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    )
}

export default View;