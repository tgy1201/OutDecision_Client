import React from "react";
import styles from './ranking.module.css';

function Ranking() {
    return (
        <div className={styles.container}>
            <div className={styles.pc_ranking}>
                <div className="flexbox">
                    <div className={styles.rankingtitle}>
                        <span className={styles.decoration}>|</span>
                        포인트랭킹
                    </div>
                    <table className={styles.rankingtable}>
                        <thead className={styles.rankinghead}>
                            <tr>
                                <th>랭킹</th>
                                <th>닉네임</th>
                                <th>가입일</th>
                                <th>포인트</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    내가일등
                                </td>
                                <td>2024-04-01</td>
                                <td>78945</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>117</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    정감자
                                </td>
                                <td>2024-04-01</td>
                                <td>117</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>

            <div className={styles.mobile_ranking}>
                <div className={styles.contentswrap}>
                    <h1 className={styles.contitle}>
                        랭킹은 매주 월요일 00:00에 갱신됩니다
                    </h1>
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
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            내가일등
                                        </td>
                                        <td>75608</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>순위</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            정감자
                                        </td>
                                        <td>117</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className={styles.rankinfowrap}>
                            <table className={styles.rankinfo}>
                                일일랭킹보상 주간랭킹보상
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ranking;