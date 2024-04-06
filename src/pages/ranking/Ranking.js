import React from "react";
import styles from './ranking.module.css';

function Ranking() {
    return (
        <div className={styles.container}>
            <div className={styles.pc_ranking}>
                <div className="flexbox">
                    <div className={styles.rankingtitle}><span className={styles.decoration}>|</span>포인트랭킹</div>
                    <table className={styles.rankingtable}>
                        <thead className={styles.rankinghead}>
                            <tr>
                                <th>순위</th>
                                <th>닉네임</th>
                                <th>가입일</th>
                                <th>포인트</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>2024-03-03</td>
                                <td>13000000</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>384</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>정감자</td>
                                <td>2024-03-01</td>
                                <td>368</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className={styles.mobile_ranking}>
                <div className="flexbox">
                    <table className={styles.rankingtable}>
                        <thead className={styles.rankinghead}>
                            <tr>
                                <th>랭킹</th>
                                <th>닉네임</th>
                                <th>포인트</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>15</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                            <tr>
                                <td>16</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>패알못</td>
                                <td>13000000</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>384</td>
                                <td><div className={styles.imgbox}><img src="/assets/images/profile.png" alt="프로필" /></div>정감자</td>
                                <td>368</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Ranking;