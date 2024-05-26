import React, { useState } from "react";
import styles from "./mytitle.module.css";
import MypageMenu from "../../component/mypageMenu/MypageMenu";

const boxData = [
    { title: '미식가', state: '미획득', explain: "'음식'게시판에서 인기글 10회", progress: '5/10', barWidth: '50%' },
    { title: '로맨티스트', state: '미획득', explain: "'연애'게시판에서 인기글 10회", progress: '2/10', barWidth: '20%' },
    { title: '패셔니스타', state: '미획득', explain: "'패션'게시판에서 인기글 10회", progress: '4/10', barWidth: '40%' },
    { title: '취미가', state: '미획득', explain: "'취미'게시판에서 인기글 10회", progress: '7/10', barWidth: '70%' },
    { title: '일꾼', state: '미획득', explain: "'취업'게시판에서 인기글 10회", progress: ' 1/10', barWidth: '10%' },
    { title: '여행가', state: '획득', explain: "'여행'게시판에서 인기글 10회", progress: '10/10', barWidth: '100%' },
    { title: '욕심쟁이', state: '미획득', explain: "모든 칭호 수집", progress: '1/6', barWidth: '16%' },
    { title: '새싹', state: '획득', explain: "최초 회원가입", progress: '1/1', barWidth: '100%' },

];


function Mytitle() {
    const [clickedBoxes, setClickedBoxes] = useState(Array(boxData.length).fill(false));

    const handleClick = (index) => {
        const newClickedBoxes = [...clickedBoxes];
        newClickedBoxes[index] = !newClickedBoxes[index];
        setClickedBoxes(newClickedBoxes);
    };

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
                                className={`${styles.box} ${clickedBoxes[index] ? styles.clicked : ''}`}
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
                                    <div className={styles.progress}>{box.progress}</div>
                                    <div className={styles.bar} style={{ '--bar-width': box.barWidth }}></div>
                                </div>
                                <div className={styles.explain}>{box.explain}</div>
                            </div>
                        ))}
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
                                key={index}
                                className={`${styles.box} ${clickedBoxes[index] ? styles.clicked : ''}`}
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
                                    <div className={styles.progress}>{box.progress}</div>
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