import React, { useState } from "react";
import styles from './header.module.css';
import { Link } from "react-router-dom";
import MobileMenu from "../mobileMenu/MobileMenu";

function CommonHeader ({children}) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    /* 연동 테스트 */
    const [test, setTest]= useState('');

    const handleTest = (e) => {
        const newValue = e.target.value;
        setTest(newValue);
        console.log(test);
    }

    return (
        <>
        <header>
            <div className={styles.pc_header}>
                <div className={styles.topbar}>
                    <ul>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                    </ul>
                </div>
                <div className={styles.nav_wrap}>
                    <Link to="/" className={styles.logo}><img src="/assets/images/logo.png" alt="로고" /></Link>
                    <div className={styles.nav}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/board/all">카테고리</Link>
                                <ul className={styles.category_menu_wrap}>
                                    <li><Link to="/board/all">전체</Link></li>
                                    <li><Link to="/board/hot">HOT</Link></li>
                                    <li><Link to="/board/food">음식</Link></li>
                                    <li><Link to="/board/fashion">패션</Link></li>
                                    <li><Link to="/board/travel">여행</Link></li>
                                    <li><Link to="/board/work">취업</Link></li>
                                    <li><Link to="/board/hobby">취미</Link></li>
                                    <li><Link to="/board/love">연애</Link></li>
                                    <li><Link to="/board/etc">기타</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/ranking">랭킹</Link></li>
                            <li><Link to="/mypage">마이페이지</Link></li>
                        </ul>
                    </div>
                    <button className={styles.btn_search} onClick={ handleSearchOpen }>
                        {!isSearchOpen && (
                            <img src="/assets/images/search.png" alt="검색돋보기" />
                        )}
                        {isSearchOpen && (
                            <>X</>
                        )}
                    </button>
                </div>
                <div className={styles.search_wrap} style={isSearchOpen ? {"display": "block"} : {"display" : "none"}}>
                    <div className={styles.search_area}>
                        <div className={styles.input_area}>
                            <input className={styles.input} value={test} onChange={handleTest} type="text" maxLength={20} placeholder="검색어를 입력하세요" />
                            <button><img src="/assets/images/search.png" alt="검색"/></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mobile_header}>
                <div className={styles.nav_wrap}>
                    {children}
                    <div className={styles.nav}>
                        <ul>
                            <li><button onClick={handleSearchOpen}><img src="/assets/images/search.png" alt="검색"/></button></li>
                            <li><button onClick={handleSidebarOpen}><img src="/assets/images/menu.png" alt="메뉴"/></button></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.search_wrap} style={isSearchOpen ? {"display": "block"} : {"display" : "none"}}>
                    <div className={styles.search_area}>
                        <div className={styles.input_area}>
                            <input value={test} onChange={handleTest} type="text" maxLength={20} placeholder="Search"/>
                            <button><img src="/assets/images/search.png" alt="검색"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <MobileMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleSidebarOpen={handleSidebarOpen}/>
        </>
    )
}

export default CommonHeader;