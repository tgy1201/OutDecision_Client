import React, { useEffect, useState } from "react";
import styles from './postCard.module.css';
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";


import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { GoBell, GoBellFill, GoBellSlash } from "react-icons/go";
import { IoMdMale, IoMdFemale } from "react-icons/io";

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
    const [voteCnt, setVoteCnt] = useState(0);
    const [isAlarmCheck, setIsAlarmCheck] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [votedOptionId, setVotedOptionId] = useState([]);
    const [postOptions, setPostOptions] = useState([]);

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search'); // 검색어
    const searchType = searchParams.get('searchType'); // 검색 유형(title, content)
    const type = searchParams.get('type');
    const page = searchParams.get('page');
  
    useEffect(()=>{
        setVoteCnt(post?.participationCnt);
        setIsVoted(post?.loginMemberPostInfoDTO?.votedOptionIds.length > 0 ? true : false);
        setVotedOptionId(post?.loginMemberPostInfoDTO?.votedOptionIds);
        setIsAlarmCheck(post?.loginMemberPostInfoDTO?.receiveAlert || false);
        setPostOptions(post?.optionsList);
        setSelectedOptions([]);
    }, [post, type, page])    

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
                setPostOptions(response.data.result.optionsList);
                setIsVoted(true);
                setVoteCnt(voteCnt + 1);
                setVotedOptionId(response.data.result.selectedOptions);
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const highlightText = (text, searchTerm, type) => {
        if (!text || !searchTerm) return text;
      
        let highlightedText = '';

        if (searchType === 'all') {
            // 기본값 (전체 하이라이트)
            highlightedText = text.replace(new RegExp(searchTerm, 'gi'), (matchedText) => (
            `<span class="highlight">${matchedText}</span>`
            ));
        } else if (searchType === type) {
            highlightedText = text.replace(new RegExp(searchTerm, 'gi'), (matchedText) => (
            `<span class="highlight">${matchedText}</span>`
            ));
        } else if (searchType === type) {
            highlightedText = text.replace(new RegExp(searchTerm, 'gi'), (matchedText) => (
            `<span class="highlight">${matchedText}</span>`
            ));
        } else if (searchType === type) {
            highlightedText = text.replace(new RegExp(searchTerm, 'gi'), (matchedText) => (
            `<span class="highlight">${matchedText}</span>`
            ));
        } else {
            return text;
        }
      
        return highlightedText;
    };

    const handleClickAlarm = async (e) => {
        e.preventDefault();
        
        if(!sessionStorage.isLogin) {
            alert('로그인 후 이용가능합니다');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/post/${post.postId}/notification`, {}, {
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
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/post/${post.postId}/notification`, {
                withCredentials: true,
            });

            console.log(response.data);
            setIsAlarmCheck(false);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {post.status==='progress'?
                isAlarmCheck ? 
                <GoBellFill onClick={handleCancelAlarm} style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a", cursor: "pointer"}}/>
                : <GoBell onClick={handleClickAlarm} style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a", cursor: "pointer"}} />
            : <GoBellSlash style={{position: "absolute", right: "11px", top: "11px", fontSize: "1.6rem", color: "#4a4a4a"}} />
            }
            <section className={styles.state_wrap}>
                <div style={{backgroundColor: filterMap[post.status] === '투표중'? "#ac2323" : "gray"}}>{filterMap[post.status]}</div>
            </section>
            <section className={styles.title_wrap}>
                <Link to={bname ? `/board/${bname}/view/${post.postId}` : `/board/${post.category}/view/${post.postId}`}>
                    <div style={{display: "flex", gap: '5px'}}>
                        <p>{!bname || bname === 'hot' || bname === 'all' ? `[${boardNameMap[post.category]}]` : ''}</p>
                        <p dangerouslySetInnerHTML={ {__html: highlightText(post.title, search, 'title')} }></p>
                    </div>
                </Link>
                <div>{post.deadline} 종료</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    {post.pluralVoting ? '복수 선택' : '단일 선택'} • <span style={{color: "#ac2323"}}>{voteCnt}</span> 명 참여 
                    {post.gender === 'male' ?  <> • <IoMdMale style={{color: '#5445dc', verticalAlign: 'middle'}}/></>: post.gender === 'female' ? <> • <IoMdFemale style={{color: '#ac2323', verticalAlign: 'middle'}}/></> : ''}
                </div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <tbody>
                    {postOptions && postOptions.map((option, idx)=>    
                        <tr key={idx}>
                            {isOpenResult || filterMap[post.status] ==="투표종료" || isVoted ?
                                <td className={votedOptionId?.includes(option.optionId)?`${styles.selected}`:`${styles.unselected}`}>
                                    <div className={styles.result_wrap} style={{width: `${option.votePercentage}%`, backgroundColor: votedOptionId?.includes(option.optionId)? '#fbdbdb':'#cacaca'}}>
                                        {option.imgUrl !== '' && 
                                        <div className={styles.option_img} style={{marginLeft: "8px"}}>
                                            <img src={option.imgUrl} alt="옵션" />
                                        </div>
                                        } 
                                    </div>
                                    <div className={option.imgUrl? `${styles.text}`: `${styles.text2}`}>
                                        <p dangerouslySetInnerHTML={ {__html: highlightText(option.body, search, 'option')} }></p>
                                    </div>
                                    <span className={styles.percent}>{option.votePercentage}%</span>
                                </td>
                            :   <td className={selectedOptions.includes(option.optionId) ? `${styles.selected}` : `${styles.unselected}`} onClick={()=>handleOptionChange(option.optionId)}>
                                    <div className={styles.option_wrap} >
                                        {option.imgUrl !== '' && 
                                        <div className={styles.option_img}>
                                            <img src={option.imgUrl} alt="옵션" /> 
                                        </div>} 
                                        <p dangerouslySetInnerHTML={ {__html: highlightText(option.body, search, 'option')} }></p>
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
                            : isVoted?
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
                <p dangerouslySetInnerHTML={ {__html: highlightText(post.content, search, 'content')} }></p>
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