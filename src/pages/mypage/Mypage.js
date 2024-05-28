import React, { useState } from "react";
import styles from './mypage.module.css';
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import { Link, useNavigate } from "react-router-dom";

function Mypage() {
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('post');
    const [hoveredRow, setHoveredRow] = useState(null)

    const handleMouseOver = (index) => {
        setHoveredRow(index);
    }

    const handleMouseOut = () => {
        setHoveredRow(null);
    }

    const handleMenu = (menu) => {
        setActiveMenu(menu);
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_mypage}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={1} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.mypage}>마이페이지</div>
                        <div className={styles.profile}>
                            <div className={styles.imagebox}>
                                <div className={styles.image}>
                                    <img src="/assets/images/profile2.png" alt="프로필" />
                                </div>
                                <div className={styles.namebox}>
                                    <div>
                                        <div className={styles.nickname}>로맨티스트</div>
                                        <button>변경</button>
                                    </div>
                                    <span>정감자 </span>님
                                </div>
                            </div>
                            <div className={styles.userinfo}>보유칭호 <span>3개</span></div>
                            <div className={styles.userinfo}>포인트 <span>7000점 (랭킹 : 3위)</span></div>
                        </div>
                        <div className={styles.posting}>
                            <div className={styles.menu}>
                                <span onClick={() => handleMenu('post')} className={activeMenu === 'post' ? styles.active : styles.inactive}>작성한 글</span>
                                <span onClick={() => handleMenu('vote')} className={activeMenu === 'vote' ? styles.active : styles.inactive}>투표한 글</span>
                                <span onClick={() => handleMenu('liked')} className={activeMenu === 'liked' ? styles.active : styles.inactive}>좋아요한 글</span>
                            </div>
                            {activeMenu === 'post' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/posting')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">바지 뭐 살까 </Link><span>(2)</span></div>
                                        <div>패션 | 02-28</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">강릉 vs 속초 추천 좀 </Link><span>(4)</span></div>
                                        <div>여행 | 05-16</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">클라이밍 장비살건데 </Link><span>(0)</span></div>
                                        <div>취미 | 05-20</div>
                                    </div>
                                </div>
                            )}
                            {activeMenu === 'vote' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/vote')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">저녁 메뉴 추천해줘 </Link><span>(3)</span></div>
                                        <div>음식 | 03-08</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">공시 준비해본 사람? </Link><span>(7)</span></div>
                                        <div>취업 | 03-29</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">감자에 뭐 찍어 먹어? </Link><span>(4)</span></div>
                                        <div>음식 | 04-16</div>
                                    </div>
                                </div>
                            )}
                            {activeMenu === 'liked' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/liked')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">너네 이거 이해 가능? </Link><span>(14)</span></div>
                                        <div>연애 | 05-08</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">베이스 사려고 하는데 </Link><span>(5)</span></div>
                                        <div>취미 | 05-17</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">1주년 선물 뭐사지 </Link><span>(4)</span></div>
                                        <div>연애 | 05-21</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.mobile_mypage}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={1} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.profile}>
                            <div className={styles.imagebox}>
                                <div className={styles.image}>
                                    <img src="/assets/images/profile2.png" alt="프로필" />
                                </div>
                                <div className={styles.namebox}>
                                    <div>
                                        <div className={styles.nickname}>로맨티스트</div>
                                        <button>변경</button>
                                    </div>
                                    <span>정감자 </span>님
                                </div>
                            </div>
                            <div className={styles.userinfo}>보유칭호 <span>3개</span></div>
                            <div className={styles.userinfo}>포인트 <span>7480점 (랭킹 : 5위)</span></div>
                        </div>
                        <div className={styles.posting}>
                            <div className={styles.menu}>
                                <span onClick={() => handleMenu('post')} className={activeMenu === 'post' ? styles.active : styles.inactive}>작성한 글</span>
                                <span onClick={() => handleMenu('vote')} className={activeMenu === 'vote' ? styles.active : styles.inactive}>투표한 글</span>
                                <span onClick={() => handleMenu('liked')} className={activeMenu === 'liked' ? styles.active : styles.inactive}>좋아요한 글</span>
                            </div>
                            {activeMenu === 'post' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/posting')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">바지 뭐 살까 </Link><span>(2)</span></div>
                                        <div>패션 | 02-28</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">강릉 vs 속초 추천 좀 </Link><span>(4)</span></div>
                                        <div>여행 | 05-16</div>
                                    </div>
                                </div>
                            )}
                            {activeMenu === 'vote' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/vote')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">저녁 메뉴 추천해줘 </Link><span>(3)</span></div>
                                        <div>음식 | 03-08</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">공시 준비해본 사람? </Link><span>(7)</span></div>
                                        <div>취업 | 03-29</div>
                                    </div>
                                </div>
                            )}
                            {activeMenu === 'liked' && (
                                <div className={styles.postlist}>
                                    <div className={styles.plus} onClick={() => navigate('/mypage/liked')}>더보기</div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 1 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">너네 이거 이해 가능? </Link><span>(14)</span></div>
                                        <div>연애 | 05-08</div>
                                    </div>
                                    <div className={styles.post} onMouseOver={() => handleMouseOver(2)} onMouseOut={handleMouseOut} style={{ backgroundColor: hoveredRow === 2 ? "#e6e6e6" : "" }}>
                                        <div><Link className={styles.link} to="/board/view/1">베이스 사려고 하는데 </Link><span>(5)</span></div>
                                        <div>취미 | 05-17</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Mypage;