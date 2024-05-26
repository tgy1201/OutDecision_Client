import React, { useState, useEffect } from "react";
import styles from './header.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "../mobileMenu/MobileMenu";

function CommonHeader ({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('?')[0]; //쿼리스트링을 제외한 주소 추출

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchText, setSearchText]= useState('');

    /* 스크롤 시 헤더 높이 감소를 위한 감지 이벤트 */
    useEffect(() => {
        const updateScrollPosition = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setScrollPosition(scrollTop);
        };

        window.addEventListener('scroll', updateScrollPosition);
        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, []);

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchKeyword = () => {
        if(searchText) {
            navigate(`/board/all?search=${searchText}&searchType=all`);
        } else {
            alert('검색어를 입력하세요');
        }
    }

    useEffect(()=> {
        setSearchText('');
    }, [path]);

    return (
        <>
        {/* 스크롤이 160px(헤더높이) 이상 내려가면 헤더 높이 줄임 */}
        <header className={scrollPosition > 160 ? `${styles.scroll_header}` : ''}>
            <div className={styles.pc_header}>
                <div className={scrollPosition > 160 ? `${styles.scroll_topbar}` : `${styles.topbar}`}>
                    <ul>
                        <li>{!sessionStorage.isLogin?(<Link to="/login">로그인</Link>):(<>로그아웃</>)}</li>
                        <li><Link to="/signup">회원가입</Link></li>
                    </ul>
                </div>
                <div className={styles.nav_wrap} style={{padding : scrollPosition > 160 ? "15px 0 7px 0" : "0 0 15px 0"}}>
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
                                    <li><Link to="/board/other">기타</Link></li>
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
                            <input 
                                className={styles.input} 
                                value={searchText} 
                                onChange={handleChangeSearch} 
                                type="text" 
                                maxLength={20} 
                                placeholder="검색어를 입력하세요"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                      handleSearchKeyword();
                                    }
                                }}
                            />
                            <button onClick={handleSearchKeyword}><img src="/assets/images/search.png" alt="검색"/></button>
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
                            <input 
                                value={searchText} 
                                onChange={handleChangeSearch} 
                                type="text" 
                                maxLength={20} 
                                placeholder="Search"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                      handleSearchKeyword();
                                    }
                                }}
                                />
                            <button onClick={handleSearchKeyword}><img src="/assets/images/search.png" alt="검색"/></button>
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