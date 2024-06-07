import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './ranking.module.css';
import { GiCurlyWing } from "react-icons/gi";

function Ranking() {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [memberRanking, setMemberRanking] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/ranking`, {
                    withCredentials: true
                });
                setRankings(response.data.result.rankingList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching rankings:", error);
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    useEffect(() => {
        const fetchMemberRanking = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/ranking/member`, {
                    withCredentials: true
                });
                if (response.data.result === null) {
                    setMemberRanking(null);
                } else {
                    setMemberRanking(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching member ranking:", error);
                setMemberRanking(null); // 오류 발생 시에도 memberRanking을 null로 설정
            }
        };

        // /ranking API 호출이 완료된 후에 /ranking/member API를 호출
        if (!loading) {
            fetchMemberRanking();
        }
    }, [loading]);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
            nextMonday.setHours(0, 0, 0, 0);
            const timeDiff = nextMonday - now;

            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초`);
        };

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000); // 1초마다 업데이트

        return () => clearInterval(timer); // 타이머 정리
    }, []);

    const renderNickname = (nickname) => {
        if (nickname.length > 8) {
            // 닉네임이 4글자보다 길 경우 블러처리
            return (
                <span className={styles.blurred} data-fullname={nickname}>
                    {nickname.slice(0, 5)}
                </span>
            );
        }
        return nickname;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_ranking}>
                <div className="flexbox">
                    <div className={styles.rankingtitle}>
                        <span className={styles.decoration}>|</span>
                        포인트랭킹
                    </div>
                    <div className={styles.rankingdescription}>
                        초기화까지 남은 시간: {timeLeft}
                    </div>
                    <table className={styles.rankingtable}>
                        <thead className={styles.rankinghead}>
                            <tr>
                                <th>랭킹</th>
                                <th>닉네임</th>
                                <th>포인트</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankings.map((ranking, index) => (
                                <tr
                                    key={index}
                                    className={
                                        ranking.rank === 1 ? `${styles.rank_wrap} ${styles.first}` :
                                            ranking.rank === 2 ? `${styles.rank_wrap} ${styles.second}` :
                                                ranking.rank === 3 ? `${styles.rank_wrap} ${styles.third}` :
                                                    `${styles.rank_wrap}`
                                    }
                                >
                                    <td>
                                        <p className={styles.rank}>
                                            {ranking.rank <= 3 && <GiCurlyWing className={styles.left_wing} />}
                                            {ranking.rank}
                                            {ranking.rank <= 3 && <GiCurlyWing className={styles.right_wing} />}
                                        </p>
                                    </td>
                                    <td>
                                        <div className={styles.profile}>
                                            <img src={ranking.userImg} alt="프로필" />
                                        </div>
                                        <span className={styles.title}>{ranking.memberTitle}</span> {ranking.nickname}
                                    </td>
                                    <td>{ranking.point}</td>
                                </tr>
                            ))}
                        </tbody>

                        {memberRanking && (
                            <tfoot>
                                <tr
                                    className={
                                        memberRanking.rank === 1 ? `${styles.rank_wrap} ${styles.first}` :
                                            memberRanking.rank === 2 ? `${styles.rank_wrap} ${styles.second}` :
                                                memberRanking.rank === 3 ? `${styles.rank_wrap} ${styles.third}` :
                                                    `${styles.rank_wrap}`
                                    }>
                                    <td>
                                        <p className={styles.rank}>
                                            {memberRanking.rank <= 3 && <GiCurlyWing className={styles.left_wing} />}
                                            {memberRanking.rank}
                                            {memberRanking.rank <= 3 && <GiCurlyWing className={styles.right_wing} />}
                                        </p>
                                    </td>
                                    <td>
                                        <div className={styles.profile}>
                                            <img src={memberRanking.userImg} alt="프로필" />
                                        </div>
                                        <span className={styles.title}>{memberRanking.memberTitle}</span> {renderNickname(memberRanking.nickname)}
                                    </td>
                                    <td>{memberRanking.point}</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            <div className={styles.mobile_ranking}>
                <div className={styles.contentswrap}>
                    <div className={styles.rankingtitle}>
                        <span className={styles.decoration}>|</span>
                        포인트랭킹
                    </div>
                    <div className={styles.rankingdescription}>
                        초기화까지 남은 시간<br />
                        {timeLeft}
                    </div>
                    <div>
                        <div className={styles.ranktablewrap}>
                            <table className={styles.ranktable}>
                                <thead className={styles.rankhead}>
                                    <tr>
                                        <th>랭킹</th>
                                        <th>닉네임</th>
                                        <th>포인트</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankings.map((ranking, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                ranking.rank === 1 ? `${styles.rank_wrap} ${styles.first}` :
                                                    ranking.rank === 2 ? `${styles.rank_wrap} ${styles.second}` :
                                                        ranking.rank === 3 ? `${styles.rank_wrap} ${styles.third}` :
                                                            `${styles.rank_wrap}`
                                            }
                                        >
                                            <td>
                                                <p className={styles.rank}>
                                                    {ranking.rank <= 3 && <GiCurlyWing className={styles.left_wing} />}
                                                    {ranking.rank}
                                                    {ranking.rank <= 3 && <GiCurlyWing className={styles.right_wing} />}
                                                </p>
                                            </td>
                                            <td>
                                                <div className={styles.nickname_wrap}>
                                                    <div className={styles.profile}>
                                                        <img src={ranking.userImg} alt="프로필" />
                                                    </div>
                                                    <div className={styles.title_wrap}>
                                                        {ranking.memberTitle?<div className={styles.title}>{ranking.memberTitle}</div>:''}
                                                        <div className={styles.nickname}>{ranking.nickname}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{ranking.point}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                {memberRanking && (
                                    <tfoot>
                                        <tr
                                            className={
                                                memberRanking.rank === 1 ? `${styles.rank_wrap} ${styles.first}` :
                                                    memberRanking.rank === 2 ? `${styles.rank_wrap} ${styles.second}` :
                                                        memberRanking.rank === 3 ? `${styles.rank_wrap} ${styles.third}` :
                                                            `${styles.rank_wrap}`
                                            }>
                                            <td>
                                                <p className={styles.rank}>
                                                    {memberRanking.rank <= 3 && <GiCurlyWing className={styles.left_wing} />}
                                                    {memberRanking.rank}
                                                    {memberRanking.rank <= 3 && <GiCurlyWing className={styles.right_wing} />}
                                                </p>
                                            </td>
                                            <td>
                                                <div className={styles.profile}>
                                                    <img src={memberRanking.userImg} alt="프로필" />
                                                </div>
                                                <span className={styles.title}>{memberRanking.memberTitle}</span> <br />
                                                <span className={styles.nickname}>{renderNickname(memberRanking.nickname)}</span>
                                            </td>
                                            <td>{memberRanking.point}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;
