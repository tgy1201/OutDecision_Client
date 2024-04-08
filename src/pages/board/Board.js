import React, { useEffect, useState } from "react";
import styles from './board.module.css';
import { Link, useParams } from "react-router-dom";
import FilterSheet from "../../component/filterSheet/FilterSheet";

function Board ({setCategory}) {
    const {bname} = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [voteStatus, setVoteStatus] = useState('');

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

    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    const applyFilter = () => {
        // 여기에서 필터를 적용하고 게시판을 다시 렌더링하거나 데이터를 업데이트할 수 있음
        console.log('선택된 성별:', selectedGender);
        console.log('투표 상태:', voteStatus);
        setFilterOpen(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.board}>
                <div className={styles.board_title_wrap}>
                    <h1>{boardNameMap[bname]}<span>387</span></h1>           
                </div>
                <div className={styles.board_nav}>
                    <div>
                        <button className={styles.select}>전체글</button>
                        <button className={styles.unselect}>HOT</button>
                    </div>
                    <Link className={styles.write_btn}>
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
                        <button className={styles.filter_btn} onClick={()=> setFilterOpen(true)}>
                            <span>필터</span>
                            <div>
                                <img src="/assets/images/filter.png" alt="필터" />
                            </div>
                        </button>
                        <FilterSheet 
                            open={filterOpen} 
                            setFilterOpen={setFilterOpen} 
                            selectedGender={selectedGender}
                            setSelectedGender={setSelectedGender}
                            voteStatus={voteStatus}
                            setVoteStatus={setVoteStatus}
                            applyFilter={applyFilter}
                        />
                    </div>
                    <div className={styles.sorting_btn}> 
                        <Link><img src="/assets/images/sort_dashboard.png" alt="정렬"/></Link>
                        <Link><img src="/assets/images/sort_list_b.png" alt="정렬"/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;