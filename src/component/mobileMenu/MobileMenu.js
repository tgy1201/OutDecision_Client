import React from "react";
import styles from './mobileMenu.module.css';
import { Link } from "react-router-dom";

function MobileMenu({isSidebarOpen, setIsSidebarOpen, handleSidebarOpen}) {
    return (
        <>
            <nav className={isSidebarOpen ? `${styles.sidemenu} ${styles.active} ${styles.mobile}` : `${styles.sidemenu} ${styles.mobile}`} >
                <ul className={styles.sidemenu_header}>
                    <li><Link to="/" onClick={() => handleSidebarOpen(!isSidebarOpen)}><img src="/assets/images/home_b.png" alt="홈" /></Link></li>
                    <li><button onClick={handleSidebarOpen}><img src="/assets/images/cancel.png" alt="취소" /></button></li>
                </ul>
                <div className={styles.sidemenu_login_wrap}>
                    <Link to="/signup" onClick={() => handleSidebarOpen(!isSidebarOpen)}>회원가입</Link>
                    <Link to="/login" onClick={() => handleSidebarOpen(!isSidebarOpen)}>로그인</Link>
                </div>

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
                            <li><Link to="/" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>회원정보 수정</Link></li>
                            <li><Link to="/mypage/posting" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>작성한 글</Link></li>
                            <li><Link to="/mypage/vote" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>투표한 글</Link></li>
                            <li><Link to="/mypage/liked" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>좋아요한 글</Link></li>
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
                
                <div className={styles.logout_wrap}>
                    <div>
                        <img src="/assets/images/logout.png" alt="로그아웃" />
                    </div>
                    <span onClick={() => setIsSidebarOpen(!isSidebarOpen)}>로그아웃</span>
                </div>
            </nav>
            <div className={isSidebarOpen ? `${styles.dimmed} ${styles.mobile}` : styles.mobile} onClick={() => handleSidebarOpen(false)}/>
        </>
    )
}

export default MobileMenu;