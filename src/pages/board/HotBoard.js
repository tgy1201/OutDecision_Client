import React, { useEffect, useState } from "react";
import styles from './board.module.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FilterSheet from "../../component/filterSheet/FilterSheet";
import DesktopFilter from "../../component/filterSheet/DesktopFilter";
import Dashboard from "../../component/Dashboard/Dashboard";
import PostList from "../../component/postList/PostList";

/* 카테고리 전체와 HOT은 인기글 없음 / HOT은 글쓰기 없음 / 전체는 내부검색 없음(통합검색) */

function HotBoard ({setCategory}) {
    const navigate = useNavigate();
    const {bname, type} = useParams();

    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [voteStatus, setVoteStatus] = useState('');

    const isMobile = useMediaQuery({
        query: "(max-width: 1079px)"
    });

    const handleDisplayType = (type) => {
        navigate(`/board/${bname}/hot/${type}`);
    }

    const handleChangeBoard = (board) => {
        if (type === 'dashboard' || type === 'list') {
            if (board === 'hot') {
                navigate(`/board/${bname}/hot/${type}`);
            } else {
                navigate(`/board/${bname}/${type}`);
            }
        } else {
            if (board === 'hot') {
                navigate(`hot/dashboard`);
            } else {
                navigate(`dashboard`);
            }
        }
    }

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

    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    const applyFilter = (filterType, value) => {
        // 여기에서 필터를 적용하고 게시판을 다시 렌더링하거나 데이터를 업데이트할 수 있음
        if (filterType === 'gender') {
            setSelectedGender(value);
        } else if (filterType === 'voteStatus') {
            setVoteStatus(value)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <div className={styles.board_title_wrap}>
                    <h1>{boardNameMap[bname]}<span>387</span></h1>           
                </div>
                <div className={styles.board_nav}>
                    <div>
                        <button className={styles.unselect} onClick={()=>handleChangeBoard()}>전체글</button>
                        <button className={styles.select} onClick={()=>handleChangeBoard('hot')}>HOT</button>
                    </div>
                    <Link className={styles.write_btn} style={{display: bname === 'hot' && "none"}}>
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
                        <button className={styles.filter_btn} onClick={()=> setFilterOpen(!filterOpen)} style={{borderColor: selectedGender !=='' || voteStatus !=='' ? "#ac2323" : ""}}>
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
                            gender={selectedGender}
                            vote={voteStatus}
                            />
                        }
                        {filterOpen &&
                        <FilterSheet 
                            /*모바일 바텀필터시트*/
                            open={filterOpen} 
                            setFilterOpen={setFilterOpen} 
                            applyFilter={applyFilter}
                            gender={selectedGender}
                            vote={voteStatus}
                        />
                        }
                        {selectedGender !== "" && !isMobile &&
                            <div className={styles.gender_btn}>
                                {filterMap[selectedGender]} 
                                <button onClick={()=>setSelectedGender('')}>X</button>
                            </div>
                        }
                        {voteStatus !== "" && !isMobile &&
                            <div className={styles.voteStatus_btn}>
                                {filterMap[voteStatus]} 
                                <button onClick={()=>setVoteStatus('')}>X</button>
                            </div>
                        }
                    </div>
                    <div className={styles.sorting_btn}>
                        <button onClick={()=> handleDisplayType('dashboard')}>
                        {type !== 'list' ?
                            <img src="/assets/images/sort_dashboard.png" alt="정렬"/>
                        : <img src="/assets/images/sort_dashboard_b.png" alt="정렬"/>
                        }
                        </button>
                        <button onClick={()=> handleDisplayType('list')}>
                        {type === 'list' ?
                            <img src="/assets/images/sort_list.png" alt="정렬"/>
                        : <img src="/assets/images/sort_list_b.png" alt="정렬"/>
                        }
                        </button>
                    </div>
                </div>
                <div className={styles.mobile_filter} style={{display: selectedGender === "" && voteStatus === "" ? "none" : ""}}>
                    {selectedGender !== "" && isMobile &&
                        <div className={styles.gender_btn}>
                            {filterMap[selectedGender]} 
                            <button onClick={()=>setSelectedGender('')}>X</button>
                        </div>
                    }
                    {voteStatus !== "" && isMobile &&
                        <div className={styles.voteStatus_btn}>
                            {filterMap[voteStatus]} 
                            <button onClick={()=>setVoteStatus('')}>X</button>
                        </div>
                    }
                </div>

                {!type || type === 'dashboard' ? <Dashboard /> : <PostList />}
            </div>
        </div>
    )
}

export default HotBoard;