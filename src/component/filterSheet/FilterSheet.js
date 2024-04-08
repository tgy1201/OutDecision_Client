import React from "react";
import ReactDom from 'react-dom'
import { BottomSheet } from "react-spring-bottom-sheet";
import styles from './filterSheet.module.css';

import 'react-spring-bottom-sheet/dist/style.css';
import './customFilterSheet.css';

function FilterSheet ({open, setFilterOpen, selectedGender, setSelectedGender, voteStatus, setVoteStatus, applyFilter}) {
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };
    
      const handleVoteStatusChange = (event) => {
        setVoteStatus(event.target.value);
    };

    return ReactDom.createPortal(
        <BottomSheet 
            open={open}
            snapPoints={({ minHeight, maxHeight }) => [minHeight*0 + 350, maxHeight*0 + 350]}
            onDismiss={() => setFilterOpen(false)}
        >
            <div className={styles.container}>
                <h3>성별 필터</h3>
                <div className={styles.filter_wrap}>
                    <label>
                        <input type="radio" value="" checked={selectedGender === ''} onChange={handleGenderChange}/>
                        <span className={selectedGender==="" ? `${styles.selected}` : ''}>전체</span>
                    </label>
                    <label>
                        <input type="radio" value="male" checked={selectedGender === 'male'} onChange={handleGenderChange}/>
                        <span className={selectedGender==="male" ? `${styles.selected}` : ''}>남성</span>
                    </label>
                    <label>
                        <input type="radio" value="female" checked={selectedGender === 'female'} onChange={handleGenderChange}/>
                        <span className={selectedGender==="female" ? `${styles.selected}` : ''}>여성</span>
                    </label>
                </div>

                <h3>투표 상태</h3>
                <div className={styles.filter_wrap}>
                    <label>
                        <input type="radio" value="" checked={voteStatus === ''} onChange={handleVoteStatusChange} />
                        <span className={voteStatus==="" ? `${styles.selected}` : ''}>전체</span>
                    </label>
                    <label>
                        <input type="radio" value="progress" checked={voteStatus === 'progress'} onChange={handleVoteStatusChange} />
                        <span className={voteStatus==="progress" ? `${styles.selected}` : ''}>투표중</span>
                    </label>
                    <label>
                        <input type="radio" value="end" checked={voteStatus === 'end'} onChange={handleVoteStatusChange} />
                        <span className={voteStatus==="end" ? `${styles.selected}` : ''}>투표종료</span>
                    </label>
                </div>
                <div className={styles.submit_btn_wrap}>
                    <button onClick={applyFilter} className={styles.submit_btn}>필터 적용</button>
                </div>
            </div>
        </BottomSheet>
    , document.getElementById("root"));
}

export default FilterSheet;