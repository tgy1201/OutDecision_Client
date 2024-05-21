import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './ranking.module.css';

function Ranking() {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [memberId, setMemberId] = useState(null);
    const [memberRanking, setMemberRanking] = useState(null);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get('https://api.outdecision.com/ranking');
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
        const fetchMemberId = async () => {
            // 여기에서 사용자의 로그인 상태를 확인하고, 로그인 상태일 때 memberId를 설정합니다.
            // 만약 로그인 상태가 아니라면 memberId는 null로 설정됩니다.
            setMemberId(null);
            const isLoggedIn = true; // 로그인 상태 확인 로직 구현
            if (isLoggedIn) {
                setMemberId(2024); // 예시로 memberId를 설정하고, 실제 로그인 상태에 따라 로직을 구현하세요.
            }
        };

        fetchMemberId();
    }, []);

    useEffect(() => {
        const fetchMemberRanking = async () => {
            if (memberId !== null) {
                try {
                    const response = await axios.get(`https://api.outdecision.com/ranking/${memberId}`);
                    setMemberRanking(response.data.result);
                } catch (error) {
                    console.error("Error fetching member ranking:", error);
                }
            }
        };

        fetchMemberRanking();
    }, [memberId]);

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
                                <tr key={index} className={ranking.memberId === memberId ? styles.memberHighlight : ''}>
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
                                        {ranking.nickname}
                                    </td>
                                    <td>{ranking.point}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot style={{ display: (memberRanking !== null && Object.keys(memberRanking).length !== 0) ? 'table-footer-group' : 'none' }}>
                            {memberRanking && Object.keys(memberRanking).length !== 0 && (
                            <tr>
                                <td>{memberRanking?.rank}</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src={memberRanking?.userImg} alt="프로필"/>
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
                                    {memberRanking?.nickname}
                                </td>
                                <td>{memberRanking?.point}</td>
                            </tr>
                            )}
                        </tfoot>
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
                                    <tr key={index} className={ranking.memberId === memberId ? styles.memberHighlight : ''}>
                                        <td>{ranking.rank}</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src={ranking.userImg} alt="프로필"/>
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
                                            {ranking.nickname}
                                        </td>
                                        <td>{ranking.point}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot style={{ display: (memberRanking !== null && Object.keys(memberRanking).length !== 0) ? 'table-footer-group' : 'none' }}>
                            {memberRanking && Object.keys(memberRanking).length !== 0 && (
                            <tr>
                                <td>{memberRanking?.rank}</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src={memberRanking?.userImg} alt="프로필"/>
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
                                    {memberRanking?.nickname}
                                </td>
                                <td>{memberRanking?.point}</td>
                            </tr>
                            )}
                        </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Ranking;