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
                                    도려
                                </td>
                                <td>78945</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    뭉치
                                </td>
                                <td>74067</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    빵지
                                </td>
                                <td>68430</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    뽀식이
                                </td>
                                <td>42046</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    상여자
                                </td>
                                <td>35764</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    둘리
                                </td>
                                <td>31453</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    마이콜
                                </td>
                                <td>24503</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    챈니
                                </td>
                                <td>17554</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    아쿠아맨
                                </td>
                                <td>14783</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    집이다요
                                </td>
                                <td>11476</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    뭉갱잉
                                </td>
                                <td>9456</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    건강한멸치
                                </td>
                                <td>8945</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>308</td>
                                <td>
                                    <div className={styles.profile}>
                                        <img src="/assets/images/profile.png" alt="프로필" />
                                    </div>
                                    정감자
                                </td>
                                <td>1107</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>

            <div className={styles.mobile_ranking}>
                <div className={styles.contentswrap}>
                    <div className={styles.rankingtitle}>

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
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            도려
                                        </td>
                                        <td>78945</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            뭉치
                                        </td>
                                        <td>74067</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            빵지
                                        </td>
                                        <td>68430</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            뽀식이
                                        </td>
                                        <td>42046</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            상여자
                                        </td>
                                        <td>35764</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            둘리
                                        </td>
                                        <td>31453</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            마이콜
                                        </td>
                                        <td>24503</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            챈니
                                        </td>
                                        <td>17554</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            아쿠아맨
                                        </td>
                                        <td>14783</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            집이다요
                                        </td>
                                        <td>11476</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            뭉갱잉
                                        </td>
                                        <td>9456</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            건강한멸치
                                        </td>
                                        <td>8945</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>308</td>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src="/assets/images/profile.png" alt="프로필" />
                                            </div>
                                            정감자
                                        </td>
                                        <td>1107</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className={styles.pointinfobox}>
                            <table className={styles.infotable}>
                                <thead className={styles.infohead}>
                                    <tr>
                                        <th>일일랭킹보상</th>
                                        <th>주간랭킹보상</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>응모권 X 10장</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>응모권 X 7장</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>응모권 X 5장</td>
                                    </tr>
                                    <tr>
                                        <td>4~10</td>
                                        <td>응모권 X 3장</td>
                                    </tr>
                                    <tr>
                                        <td>11~50</td>
                                        <td>응모권 X 2장</td>
                                    </tr>
                                    <tr>
                                        <td>51~100</td>
                                        <td>응모권 X 1장</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Ranking;