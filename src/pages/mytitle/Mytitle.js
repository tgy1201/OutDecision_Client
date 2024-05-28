import React, { useState, useEffect } from "react";
import styles from "./mytitle.module.css";
import MypageMenu from "../../component/mypageMenu/MypageMenu";

//API 호출 전 기본 데이터 설정
const initialBoxData = [
    { id: 'foodie', title: '미식가', state: '미획득', explain: "'음식'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'romantist', title: '로맨티스트', state: '미획득', explain: "'연애'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'fashionista', title: '패셔니스타', state: '미획득', explain: "'패션'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'hobbyist', title: '취미가', state: '미획득', explain: "'취미'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'ceo', title: '일꾼', state: '미획득', explain: "'취업'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'traveler', title: '여행가', state: '미획득', explain: "'여행'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'greedy', title: '욕심쟁이', state: '미획득', explain: "모든 칭호 수집", progress: 0, maxProgress: 6, barWidth: '0%' },
    { id: 'newbie', title: '새싹', state: '획득', explain: "최초 회원가입", progress: 1, maxProgress: 1, barWidth: '100%' },
];

function Mytitle({ memberId }) {
    const [boxData, setBoxData] = useState(initialBoxData);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClick = (index) => {
        setSelectedBoxIndex(index);
    };

    useEffect(() => {
        fetch(`/mypage/${memberId}/title/missons`)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess && data.code === "2000") {
                    const result = data.result;
                    const updatedBoxData = initialBoxData.map((box) => {
                        const mission = result[box.id];
                        if (mission) {
                            const currentProgress = mission.missionCnt;
                            const maxProgress = box.maxProgress;
                            const barWidth = `${(currentProgress / maxProgress) * 100}%`;

                            return {
                                ...box,
                                progress: currentProgress,
                                barWidth,
                                state: currentProgress >= maxProgress ? '획득' : '미획득'
                            };
                        }
                        return box;
                    });
                    setBoxData(updatedBoxData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [memberId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_mytitle}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={6} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        {boxData.map((box, index) => (
                            <div
                                key={index}
                                className={`${styles.box} ${selectedBoxIndex === index ? styles.clicked : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <div className={styles.tswrapper}>
                                    <div className={styles.title}>{box.title}</div>
                                    <div className={styles.statewrapper}>
                                        <div className={`${styles.state} ${box.state === '획득' ? styles.acquired : ''}`}>
                                            {box.state}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.pbwrapper}>
                                    <div className={styles.progress}>{`${box.progress}/${box.maxProgress}`}</div>
                                    <div className={styles.bar} style={{ '--bar-width': box.barWidth }}></div>
                                </div>
                                <div className={styles.explain}>{box.explain}</div>
                            </div>
                        ))}
                        <div className={styles.apply}>칭호 적용</div>
                    </div>
                </section>
            </div>
            <div className={styles.mobile_mytitle}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={6} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        {boxData.map((box, index) => (
                            <div
                                key={box.id}
                                className={`${styles.box} ${selectedBoxIndex === index ? styles.clicked : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <div className={styles.tswrapper}>
                                    <div className={styles.title}>{box.title}</div>
                                    <div className={`${styles.state} ${box.state === '획득' ? styles.acquired : ''}`}>
                                        {box.state}
                                    </div>
                                </div>
                                <div className={styles.epwrapper}>
                                    <div className={styles.explain}>{box.explain}</div>
                                    <div className={styles.progress}>{`${box.progress}/${box.maxProgress}`}</div>
                                </div>
                                <div className={styles.bar} style={{ '--bar-width': box.barWidth }}></div>
                            </div>
                        ))}
                        <div className={styles.apply}>칭호 적용</div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Mytitle;