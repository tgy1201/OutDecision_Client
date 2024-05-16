import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './board.module.css';
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FilterSheet from "../../component/filterSheet/FilterSheet";
import DesktopFilter from "../../component/filterSheet/DesktopFilter";
import Dashboard from "../../component/Dashboard/Dashboard";
import List from "../../component/List/List";

/* 카테고리 전체와 HOT은 인기글 없음 / HOT은 글쓰기 없음 / 전체는 내부검색 없음(통합검색) */
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

function Board ({setCategory}) {
    const isMobile = useMediaQuery({
        query: "(max-width: 1079px)"
    });

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const type = searchParams.get('type'); // 게시판 정렬 유형(dashboard, list)
    const mode = searchParams.get('mode'); // 게시판 모드(normal, hot)
    const gender = searchParams.get('gender'); // 필터 성별(male, female)
    const vote = searchParams.get('vote'); // 필터 투표상태(progress, end)
    const page = searchParams.get('page'); // 페이지번호
    const search = searchParams.get('search'); // 검색어
    const searchType = searchParams.get('searchType'); // 검색 유형(title, content)
    const sort = searchParams.get('sort'); // 게시글 정렬(latest, likes, views)

    const {bname} = useParams();

    const [filterOpen, setFilterOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsNum, setPostsNum] = useState(0);

    /* 게시판 카테고리 갱신 */
    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    useEffect(()=> {
        const handlefetchPosts = async (bname) => {
            try {
                const url = bname === 'all'
                    ? 'http://175.45.202.225:8080/posts'
                    : `http://175.45.202.225:8080/posts/${bname}`;
            
                const response = await axios.get(url, {
                    params: {
                        mode: mode ? mode : 'normal',
                        page: page ? parseInt(page) : 1,
                        sort: sort ? sort : 'latest',
                        gender: gender && gender,
                        vote: vote && vote,
                        search: search && search,
                        searchType: searchType && searchType,
                        category: bname === 'all' ? null : bname, // 'all' 이외의 경우 bname 값 사용
                    },
                });
            
                setPostsNum(response.data.result.totalElements);
                setPosts(response.data.result.postList);
            } catch (error) {
            console.error(error);
            }
        };

        handlefetchPosts(bname);
    }, [bname, mode, page, sort, gender, vote, search, searchType])

    const handleTypeParams = (type) => {
        /* type 변경 시 mode, gender, vote, search, searchType, sort 유지(있으면) / page 초기화 */
        searchParams.set('type', type);
        searchParams.delete('page'); //페이지 초기화
        navigate(`?${searchParams.toString()}`)
    }

    const handleChangeBoard = (modeValue) => {
        navigate(
            modeValue === 'hot'
            ? type ? `?mode=hot&type=${type}` : `?mode=hot&type=dashboard`
            : type ? `?mode=normal&type=${type}` : `?mode=normal&type=dashboard`
        )
    }

    const handleChangeSort = (sortValue) => {
        searchParams.set('sort', sortValue);
        searchParams.delete('page');
        navigate(`?${searchParams.toString()}`)
    }

    const applyFilter = (filterType, value) => {
        /* 쿼리스트링에 fiterType 매개변수 추가 */
        if (filterType === 'gender') {
            value && searchParams.set('gender', value);
        } else if (filterType === 'voteStatus') {
            value && searchParams.set('vote', value);
        }
    };
    
    const deleteFilter = (filterType) => {
        /* 쿼리스트링에서 fiterType에 해당하는 매개변수 제거 후 이동 */
        if (filterType === 'gender') {
            searchParams.delete('gender');
        } else if (filterType === 'voteStatus') {
            searchParams.delete('vote');
        }
        navigate(`?${searchParams.toString()}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <div className={styles.board_title_wrap}>
                    <h1>{boardNameMap[bname]}<span>{postsNum}</span></h1>           
                </div>
                <div className={styles.board_nav}>
                    <div>
                        <button className={!mode || mode === 'normal' ? `${styles.select}` : `${styles.unselect}`} onClick={()=>handleChangeBoard('normal')}>전체글</button>
                        <button className={mode === 'hot' ? `${styles.select}` : `${styles.unselect}`} onClick={()=>handleChangeBoard('hot')} style={{display: bname === 'hot' || bname === 'all' ? "none" : ""}}>HOT</button>
                    </div>
                    <Link to="/write" className={styles.write_btn} style={{display: bname === 'hot' && "none"}}>
                        <div className={styles.write_img}>
                            <img src="/assets/images/write.png" alt="투표작성" />
                        </div>
                        <span>투표작성</span>
                    </Link>
                </div>
                <div className={styles.board_filter_wrap}>
                    <div className={styles.board_filter}>
                        <select className={styles.filter_sort} onChange={(e) => handleChangeSort(e.target.value)}>
                            <option value="latest">최신순</option>
                            <option value="views">조회순</option>
                            <option value="likes">좋아요순</option>
                        </select>

                        <button className={styles.filter_btn} onClick={()=> setFilterOpen(!filterOpen)} style={{borderColor: gender || vote ? "#ac2323" : ""}}>
                            <span>필터</span>
                            <div>
                                <img src="/assets/images/filter.png" alt="필터" />
                            </div>
                        </button>
                        {filterOpen &&
                            <DesktopFilter
                            /*데스크톱 필터*/
                            open={filterOpen} 
                            setFilterOpen={setFilterOpen} 
                            applyFilter={applyFilter}
                            gender={gender}
                            vote={vote}
                            searchParams={searchParams}
                            />
                        }
                        {filterOpen &&
                        <FilterSheet 
                            /*모바일 바텀필터시트*/
                            open={filterOpen} 
                            setFilterOpen={setFilterOpen} 
                            applyFilter={applyFilter}
                            gender={gender}
                            vote={vote}
                            searchParams={searchParams}
                        />
                        }

                        {/* [데스크톱]필터 적용시 필터 내용 요약*/}
                        {gender && !isMobile &&
                            <div className={styles.gender_btn}>
                                {filterMap[gender]} 
                                <button onClick={()=>deleteFilter('gender')}>X</button>
                            </div>
                        }
                        {vote && !isMobile &&
                            <div className={styles.voteStatus_btn}>
                                {filterMap[vote]} 
                                <button onClick={()=>deleteFilter('voteStatus')}>X</button>
                            </div>
                        }
                    </div>

                    {/* 정렬 버튼 네비게이션 */}
                    <div className={styles.sorting_btn}>
                        <button onClick={()=> handleTypeParams('dashboard')}>
                        {type !== 'list' ?
                            <img src="/assets/images/sort_dashboard.png" alt="정렬"/>
                        : <img src="/assets/images/sort_dashboard_b.png" alt="정렬"/>
                        }
                        </button>
                        <button onClick={()=> handleTypeParams('list')}>
                        {type === 'list' ?
                            <img src="/assets/images/sort_list.png" alt="정렬"/>
                        : <img src="/assets/images/sort_list_b.png" alt="정렬"/>
                        }
                        </button>
                    </div>

                </div>

                {/* [모바일]필터 적용시 필터 내용 요약*/}
                <div className={styles.mobile_filter} style={{display: gender && vote === "" ? "none" : ""}}>
                    {gender && isMobile &&
                        <div className={styles.gender_btn}>
                            {filterMap[gender]} 
                            <button onClick={()=>deleteFilter('gender')}>X</button>
                        </div>
                    }
                    {vote && isMobile &&
                        <div className={styles.voteStatus_btn}>
                            {filterMap[vote]} 
                            <button onClick={()=>deleteFilter('voteStatus')}>X</button>
                        </div>
                    }
                </div>

                {/* type이 없거나 dashboard면 Dashboad 컴포넌트로, type이 list면 List 컴포넌트로 렌더링*/}
                {!type || type === 'dashboard' 
                ? <Dashboard posts={posts} postsNum={postsNum} postsPerPage={6} bname={bname} page={page}/> 
                : <List posts={posts} postsNum={postsNum} postsPerPage={6} bname={bname} page={page}/>
                }

                {/* 검색바 */}
                <div className={styles.search_wrap}>
                    <select>
                        <option>제목</option>
                        <option>내용</option>
                    </select>
                    <div className={styles.input_wrap}>
                        <input type="text" maxLength={20}/>
                        <button><img src="/assets/images/search.png" alt="검색"/></button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Board;