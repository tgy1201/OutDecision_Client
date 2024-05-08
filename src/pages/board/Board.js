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
    etc: '기타',
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
    const type = searchParams.get('type');
    const hot = searchParams.get('mode');
    const gender = searchParams.get('gender');
    const vote = searchParams.get('vote');
    const page = searchParams.get('page');

    const {bname} = useParams();

    const [filterOpen, setFilterOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    /* 게시판 카테고리 갱신 */
    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    /* 페이지에 해당하는 게시글 6개 저장 */
    useEffect(()=> {
        axios.get("/assets/data/posts.json").then((a)=>{
            setPosts(a.data.posts)
        })
    }, [setPosts]);

    /*
    useEffect(()=> {
        handlefetchPosts();
    })

    const handlefetchPosts = async () => {
        try {
            const response = await axios.get('http://175.45.202.225:8080/posts', {
                params: {
                  mode: 'noraml',
                  page: 1,
                  sort: 'latest'
                },
              });
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    };
    */

    /* 필터가 적용된 게시물 저장 */
    useEffect(() => {
        const filteredPosts = posts.filter((post) => {
            if (gender && filterMap[gender] !== post.gender) {
                return false;
            }
            if (vote && filterMap[vote] !== post.state) {
                return false;
            }
            return true;
        });
      
        setFilteredPosts(filteredPosts);
    }, [gender, vote, posts]);

    const handleTypeParams = (type) => {
        searchParams.set('type', type);
        searchParams.delete('page'); //페이지 초기화
        navigate(`?${searchParams.toString()}`)
    }

    const handleChangeBoard = (board) => {
        if (type) {
            if (board === 'hot') {
                navigate(`?mode=hot&type=${type}`);
            } else {
                navigate(`?type=${type}`);
            }
        } else {
            if (board === 'hot') {
                navigate(`?mode=hot&type=dashboard`);
            } else {
                navigate(`?type=dashboard`);
            }
        }
    }

    const applyFilter = (filterType, value) => {
        // 여기에서 필터를 적용하고 게시판을 다시 렌더링하거나 데이터를 업데이트할 수 있음
        if (filterType === 'gender') {
            value && searchParams.set('gender', value);
        } else if (filterType === 'voteStatus') {
            value && searchParams.set('vote', value);
        }
    };
    
    const deleteFilter = (filterType) => {
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
                    <h1>{boardNameMap[bname]}<span>387</span></h1>           
                </div>
                <div className={styles.board_nav}>
                    <div>
                        <button className={hot ? `${styles.unselect}` : `${styles.select}`} onClick={()=>handleChangeBoard()}>전체글</button>
                        <button className={hot ? `${styles.select}` : `${styles.unselect}`} onClick={()=>handleChangeBoard('hot')} style={{display: bname === 'hot' || bname === 'all' ? "none" : ""}}>HOT</button>
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
                        <select className={styles.filter_sort}>
                            <option>최신순</option>
                            <option>조회순</option>
                            <option>좋아요순</option>
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

                {!type || type === 'dashboard' 
                ? <Dashboard posts={filteredPosts} bname={bname} page={page}/> 
                : <List posts={filteredPosts} bname={bname} page={page}/>
                }

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