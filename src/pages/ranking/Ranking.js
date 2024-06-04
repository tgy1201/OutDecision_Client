import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './ranking.module.css';

function Ranking() {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [memberRanking, setMemberRanking] = useState(null);

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
                        포인트는 매주 월요일 자정에 초기화됩니다
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
                                <tr key={index}>
                                    <td>{ranking.rank}</td>
                                    <td>
                                        <div className={styles.profile}>
                                            <img src={ranking.userImg} alt="프로필" />
                                            {ranking.rank === 1 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/gold_wings.png" alt="날개" />
                                                </div>
                                            )}
                                            {ranking.rank === 2 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/silver_wings.png" alt="날개" />
                                                </div>
                                            )}
                                            {ranking.rank === 3 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/ratio_wings.png" alt="날개" />
                                                </div>
                                            )}
                                        </div>
                                        {ranking.nickname} <span className={styles.title}>{ranking.memberTitle}</span>
                                    </td>
                                    <td>{ranking.point}</td>
                                </tr>
                            ))}
                        </tbody>
                        {memberRanking && (
                            <tfoot>
                                <tr>
                                    <td>{memberRanking.rank}</td>
                                    <td>
                                        <div className={styles.profile}>
                                            <img src={memberRanking.userImg} alt="프로필" />
                                            {memberRanking.rank === 1 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/gold_wings.png" alt="날개" />
                                                </div>
                                            )}
                                            {memberRanking.rank === 2 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/silver_wings.png" alt="날개" />
                                                </div>
                                            )}
                                            {memberRanking.rank === 3 && (
                                                <div className={styles.wings}>
                                                    <img src="/assets/images/ratio_wings.png" alt="날개" />
                                                </div>
                                            )}
                                        </div>
                                        {memberRanking.nickname} <span className={styles.title}>{memberRanking.memberTitle}</span>
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
                        포인트는 매주 월요일 자정에 초기화됩니다
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
                                        <tr key={index}>
                                            <td>{ranking.rank}</td>
                                            <td>
                                                <div className={styles.profile}>
                                                    <img src={ranking.userImg} alt="프로필" />
                                                    {ranking.rank === 1 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/gold_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                    {ranking.rank === 2 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/silver_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                    {ranking.rank === 3 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/ratio_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                </div>
                                                {ranking.nickname} <span className={styles.title}>{ranking.memberTitle}</span>
                                            </td>
                                            <td>{ranking.point}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                {memberRanking && (
                                    <tfoot>
                                        <tr>
                                            <td>{memberRanking.rank}</td>
                                            <td>
                                                <div className={styles.profile}>
                                                    <img src={memberRanking.userImg} alt="프로필" />
                                                    {memberRanking.rank === 1 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/gold_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                    {memberRanking.rank === 2 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/silver_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                    {memberRanking.rank === 3 && (
                                                        <div className={styles.wings}>
                                                            <img src="/assets/images/ratio_wings.png" alt="날개" />
                                                        </div>
                                                    )}
                                                </div>
                                                {memberRanking.nickname} <span className={styles.title}>{memberRanking.memberTitle}</span>
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
