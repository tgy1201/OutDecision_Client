import React, { useEffect, useState } from "react";
import styles from './mobileMenu.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import { TbLogout, TbLogin } from "react-icons/tb";

function MobileMenu({isSidebarOpen, setIsSidebarOpen, handleSidebarOpen}) { 
    const navigate = useNavigate();
    const [info, setInfo] = useState();

    const isMobile = useMediaQuery({
        query: "(max-width: 1079px)"
    });

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/token/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // withCredentials 대신 credentials: 'include' 사용
            });

            if (response.ok) {
                console.log("로그아웃 성공");
                sessionStorage.removeItem("isLogin");
                // 홈 페이지나 로그인 페이지로 리디렉션
                window.location.href = '/';
            } else {
                // 오류 처리
                console.error("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생", error);
        }
    }

    useEffect(()=> {
        const handlefetchInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/loginSuccess`, {
                    withCredentials: true,
                });

                setInfo(response.data.result);
                console.log(response.data);
            } catch (error) {
            console.error(error);
            }
        };

        if(sessionStorage.isLogin) {
            handlefetchInfo();
        }
    }, [])

    useEffect(() => {
        if (isSidebarOpen && isMobile) {
          document.body.style.overflow = "hidden";
          document.body.style.touchAction = "none";
        } else {
          document.body.style.overflow = "auto";
          document.body.style.touchAction = "auto";
        }
    }, [isSidebarOpen, isMobile]); 

    return (
        <>
            <nav className={isSidebarOpen ? `${styles.sidemenu} ${styles.active} ${styles.mobile}` : `${styles.sidemenu} ${styles.mobile}`}>
                <ul className={styles.sidemenu_header}>
                    <li><Link to="/" onClick={() => handleSidebarOpen(!isSidebarOpen)}><img src="/assets/images/home_b.png" alt="홈" /></Link></li>
                    <li><button onClick={handleSidebarOpen}><img src="/assets/images/cancel.png" alt="취소" /></button></li>
                </ul>
                {!sessionStorage.isLogin?
                <div className={styles.sidemenu_login_wrap}>
                <Link to="/signup" onClick={() => handleSidebarOpen(!isSidebarOpen)}>회원가입</Link>
                <Link to="/login" onClick={() => handleSidebarOpen(!isSidebarOpen)}>로그인</Link>
                </div>
                :
                (info ?
                <div className={styles.sidemenu_info_wrap}>
                    <section className={styles.userInfo_wrap}>
                        <div>
                            <img src={info.userImg} alt="프로필"/>
                        </div>
                        <ul>
                            <li className={info.memberTitle?`${styles.selected}`:`${styles.unselected}`}>{info.memberTitle? info.memberTitle: '칭호없음'}</li>
                            <li>{info.nickname} 님</li>
                        </ul>
                    </section>
                    <section className={styles.userItem_wrap}>
                        <ul>
                            <li className={styles.mytitle_wrap} onClick={()=>navigate('/mypage/mytitle')}>
                                <div>보유칭호</div>
                                <p>{info.titleCnt}</p>
                            </li>
                            <li className={styles.point_wrap} onClick={()=>navigate('/ranking')}>
                                <div>결정포인트</div>
                                <p><span style={{color: '#ac2323', fontWeight: '600'}}>{info.point}</span> P</p>
                            </li>
                        </ul>
                    </section>
                </div>
                : <>Loading...</>)
                }  

                <hr className={styles.breakline} />

                <ul className={styles.sidemenu_item_wrap}>
                   <li>
                        <div className={styles.sidemenu_item}>
                            <div>
                                <img src="/assets/images/mypage.png" alt="마이페이지" />
                            </div>
                            <span>마이페이지</span>
                        </div>
                        <ul className={styles.sidemenu_item_list}>
                            <li><Link to="/mypage" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>마이페이지 홈</Link></li>
                            <li><Link to="/mypage/edit" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>회원정보 수정</Link></li>
                            <li><Link to="/mypage/posting" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>작성한 글</Link></li>
                            <li><Link to="/mypage/vote" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>투표한 글</Link></li>
                            <li><Link to="/mypage/liked" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>좋아요한 글</Link></li>
                            <li><Link to="/mypage/mytitle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>칭호</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.sidemenu_item}>
                            <div>
                                <img src="/assets/images/category.png" alt="카테고리" />
                            </div>
                            <span>카테고리</span>
                        </div>
                        <ul className={styles.sidemenu_item_list}>
                            <li><Link to="/board/all" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>전체</Link></li>
                            <li><Link to="/board/hot" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>HOT</Link></li>
                            <li><Link to="/board/food" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>음식</Link></li>
                            <li><Link to="/board/fashion" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>패션</Link></li>
                            <li><Link to="/board/travel" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>여행</Link></li>
                            <li><Link to="/board/work" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>취업</Link></li>
                            <li><Link to="/board/hobby" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>취미</Link></li>
                            <li><Link to="/board/love" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>연애</Link></li>
                            <li><Link to="/board/other" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>기타</Link></li>
                        </ul>
                    </li>
                    <li style={{borderBottom: "none"}}>
                        <div className={styles.sidemenu_item}>
                            <div>
                                <img src="/assets/images/ranking.png" alt="랭킹" />
                            </div>
                            <span>랭킹</span>
                        </div>
                        <ul className={styles.sidemenu_item_list}>
                            <li><Link to="/ranking" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>포인트 랭킹</Link></li>
                        </ul>
                    </li> 
                </ul>
                
                {sessionStorage.isLogin?
                <div className={styles.logout_wrap}>
                    <span onClick={() => {
                        handleLogout();
                        setIsSidebarOpen(!isSidebarOpen);
                    }}><TbLogout style={{fontSize: '1.3rem'}}/> 로그아웃
                    </span>
                </div>
                :
                <div className={styles.logout_wrap}>                
                    <span onClick={() => {
                        navigate('/login')
                        setIsSidebarOpen(!isSidebarOpen);
                    }}><TbLogin style={{fontSize: '1.3rem'}}/> 로그인
                    </span>
                </div>
                }
            </nav>
            <div className={isSidebarOpen ? `${styles.dimmed} ${styles.mobile}` : styles.mobile} onClick={() => handleSidebarOpen(false)}/>
        </>
    )
}

export default MobileMenu;