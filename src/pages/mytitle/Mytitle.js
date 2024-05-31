import React, { useState, useEffect } from "react";
import styles from "./mytitle.module.css";
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import axios from "axios";

const initialBoxData = [
    { id: 'foodie', title: '🍴미식가', state: '미획득', explain: "'음식'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'romantist', title: '💖로맨티스트', state: '미획득', explain: "'연애'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'fashionista', title: '🕶️패셔니스타', state: '미획득', explain: "'패션'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'hobbyist', title: '취미가', state: '미획득', explain: "'취미'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'ceo', title: '💸사장', state: '미획득', explain: "'취업'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'traveler', title: '✈️트래블러', state: '미획득', explain: "'여행'게시판에서 인기글 10회", progress: 0, maxProgress: 10, barWidth: '0%' },
    { id: 'greedy', title: '😏욕심쟁이', state: '미획득', explain: "모든 칭호 수집", progress: 0, maxProgress: 6, barWidth: '0%' },
    { id: 'newbie', title: '🌱새싹', state: '획득', explain: "최초 회원가입", progress: 1, maxProgress: 1, barWidth: '100%' },
];

function Mytitle() {
    const [boxData, setBoxData] = useState(initialBoxData);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applyMessage, setApplyMessage] = useState(null);

    const handleBoxClick = (index) => {
        setSelectedBoxIndex(index);
    };

    useEffect(() => {
        const fetchMissionData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/mypage/title/missions`, {
                    withCredentials: true
                });
                const data = response.data;

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
                } else {
                    throw new Error(data.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setApplyMessage("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchMissionData();
    }, []);

    const applyTitle = async () => {
        if (selectedBoxIndex === null) {
            setApplyMessage("선택된 칭호가 없습니다.");
            return;
        }
        if (boxData[selectedBoxIndex].state === '미획득') {
            setApplyMessage("미획득한 칭호는 변경할 수 없습니다.");
            return;
        }
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_IP}/mypage/title`,
                { title: boxData[selectedBoxIndex].title },
                { withCredentials: true }
            );
            const data = response.data;
            if (data.isSuccess && data.code === "2000") {
                setApplyMessage("칭호가 성공적으로 변경되었습니다.");
            } else {
                setApplyMessage("칭호 변경에 실패하였습니다.");
            }
        } catch (error) {
            console.error('Error applying title:', error);
            setApplyMessage("칭호 변경 중 오류가 발생하였습니다.");
        }
    };

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
                                key={box.id}
                                className={`${styles.box} ${selectedBoxIndex === index ? styles.clicked : ''}`}
                                onClick={() => handleBoxClick(index)}
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
                        <button className={styles.apply} onClick={() => applyTitle(selectedBoxIndex)}>칭호 적용</button>
                        {applyMessage && <div className={styles.applyMessage}>{applyMessage}</div>}
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
                                onClick={() => handleBoxClick(index)}
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
                        <button className={styles.apply} onClick={() => applyTitle(selectedBoxIndex)}>칭호 적용</button>
                        {applyMessage && <div className={styles.applyMessage}>{applyMessage}</div>}
                    </div>
                </section>
            </div>
        </div>
    );

}

export default Mytitle;
