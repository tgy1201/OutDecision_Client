import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from './postList.module.css'

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { GoBell, GoBellFill } from "react-icons/go";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import axios from "axios";


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

function PostList ({post, bname}) {
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [scrollPosition, setScrollPosition] = useState('left-border');
    const [selectedOptions, setSelectedOptions] = useState([]); //사용자가 선택한 투표옵션
    const [isAlarmCheck, setIsAlarmCheck] = useState(false);

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search'); // 검색어
    const searchType = searchParams.get('searchType'); // 검색 유형(title, content)

    useEffect(()=>{
        setIsAlarmCheck(post?.loginMemberPostInfoDTO?.receiveAlert || false);
    }, [post]) 

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
        console.log(selectedOptions, post.postId)
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
            setIsAlarmCheck(response.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelAlarm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/post/${post.postId}/notification`, {}, {
                withCredentials: true,
            });

            console.log(response.data);
            //setIsAlarmCheck(response.data.result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            {isAlarmCheck ? 
            <GoBellFill onClick={handleCancelAlarm}style={{position: "absolute", right: "2px", top: "2px", fontSize: "1.6rem", color: "#4a4a4a"}}/>
            : <GoBell onClick={handleClickAlarm} style={{position: "absolute", right: "2px", top: "2px", fontSize: "1.6rem", color: "#4a4a4a"}} />
            }
            <section className={styles.title_wrap}>
                <div style={{backgroundColor: filterMap[post.status] === '투표중'? "#ac2323" : "gray"}}>{filterMap[post.status]}</div>
                <Link to={bname ? `/board/${bname}/view/${post.postId}` : `/board/${post.category}/view/${post.postId}`}>
                    <div style={{display: "flex", gap: '5px'}}>
                        <p>{!bname || bname === 'hot' || bname === 'all' ? `[${boardNameMap[post.category]}]` : ''}</p>
                        <p dangerouslySetInnerHTML={ {__html: highlightText(post.title, search, 'title')} }></p>
                    </div>
                </Link>
            </section>
            <section className={styles.voteInfo_wrap}>   
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    {post.deadline} 종료  • {post.pluralVoting ? '복수 선택' : '단일 선택'} • <span style={{color: "#ac2323"}}>{post.participationCnt}</span> 명 참여
                    {post.gender === 'male' ?  <> • <IoMdMale style={{color: '#5445dc', verticalAlign: 'middle'}}/></>: post.gender === 'female' ? <> • <IoMdFemale style={{color: '#ac2323', verticalAlign: 'middle'}}/></> : ''}
                </div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <thead className={scrollPosition === 'right-border' || scrollPosition === 'middle' ? styles.prev : ''}></thead>
                    <thead className={scrollPosition === 'left-border' || scrollPosition === 'middle' ? styles.next : ''}></thead>
                    <tbody onScroll={handleScroll}>
                        <tr>
                        {Object.values(post.optionsList).map((option, idx)=>
                            <td key={idx}>
                                {isOpenResult || filterMap[post.status] ==="투표종료" || post.voted ?    
                                <div className={styles.result_wrap}>
                                    {option.imgUrl !== '' && 
                                    <div className={styles.option_img}>
                                        <img src={option.imgUrl} alt="옵션" />
                                    </div>
                                    } 
                                    <div className={styles.result_percent_wrap}>    
                                        <div className={option.img ? `${styles.imgText}` : `${styles.text}`}>
                                            <p dangerouslySetInnerHTML={ {__html: highlightText(option.body, search, 'option')} }></p>
                                        </div>
                                        <span className={styles.percent}>{option.votePercentage}%</span>
                                    </div>
                                    <div className={styles.result} style={{height: `${option.votePercentage}%`, transition: 'height 0.5s ease'}}/>
                                </div>
                                :<div className={selectedOptions.includes(option.optionId) ? `${styles.selected} ${styles.option_wrap}` : `${styles.unselected} ${styles.option_wrap}`} onClick={()=>handleOptionChange(option.optionId)}>
                                    {option.imgUrl !== '' && 
                                    <div className={styles.option_img}>
                                        <img src={option.imgUrl} alt="옵션" /> 
                                    </div>
                                    }
                                    <div className={styles.option_percent_wrap}>
                                        <div className={option.imgUrl ? `${styles.imgText}` : `${styles.text}`}>
                                            <p dangerouslySetInnerHTML={ {__html: highlightText(option.body, search, 'option')} }></p>
                                        </div>
                                    </div>
                                </div>
                                }
                            </td>
                            )}        
                        </tr> 
                    </tbody>
                </table>
                <div className={styles.voteBtn_wrap}>
                {filterMap[post.status] === "투표종료" ?
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
        </div>
    )
}

export default PostList;