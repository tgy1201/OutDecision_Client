import React from "react";
import styles from './ourteam.module.css';

function Ourteam() {
    return (
        <div className={styles.container}>

            <div className={styles.pc_ourteam}>
                <div className={styles.contents}>
                    <div className={styles.ourteam}>
                    </div>
                </div>
                <div className={styles.logobox}>
                    <p>빠른 의사결정을 위한 투표 플랫폼, 결정잘해</p>
                </div>
                <section className={styles.grid}>
                    <div className={styles.service}>
                        <div className={styles.gridinner}>
                            <h3 className={styles.tit}>
                                서비스 소개
                            </h3>
                            <ul className={styles.servicelist}>
                                <li>
                                    <span className={styles.icon}>
                                        <img src="/assets/images/vote.png" alt="고민투표" />
                                    </span>
                                    <div className={styles.caption}>
                                        <span className={styles.listtit}>투표</span>
                                        <p className={styles.listtxt}>
                                            텍스트 뿐만 아니라 사진까지 여러 개의 옵션들로 구성하여 생성 가능합니다
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <img src="/assets/images/point.png" alt="포인트" />
                                    </span>
                                    <div className={styles.caption}>
                                        <span className={styles.listtit}>포인트</span>
                                        <p className={styles.listtxt}>
                                            커뮤니티 활동을 진행할 시 보상으로 일정 포인트를 획득할 수 있습니다
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <img src="/assets/images/up.png" alt="끌어올리기" />
                                    </span>
                                    <div className={styles.caption}>
                                        <span className={styles.listtit}>끌어올리기</span>
                                        <p className={styles.listtxt}>
                                            사용자는 끌어올리기 기능을 사용하여 자신이 작성한 게시물을 최상단에 노출할 수 있습니다
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <img src="/assets/images/algorithm.png" alt="알고리즘" />
                                    </span>
                                    <div className={styles.caption}>
                                        <span className={styles.listtit}>알고리즘</span>
                                        <p className={styles.listtxt}>
                                            사용자의 선호도,투표 기록 등을 분석하여 사용자에게 적합한 투표나 게시글을 추천해줍니다
                                        </p>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className={styles.team}>
                        <div className={styles.gridinner}>
                            <h3 className={styles.tit}>
                                팀 소개
                            </h3>
                            <div className={styles.teambox}>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/BSM.png" alt="백소미" />
                                            <div className={styles.profilecontents}>
                                                <h2>백소미 <span>BackEnd</span></h2>
                                                <p>아자아자</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/SYE.png" alt="신예은" />
                                            <div className={styles.profilecontents}>
                                                <h2>신예은 <span>BackEnd</span></h2>
                                                <p>아자아자</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/KMS.png" alt="김민성" />
                                            <div className={styles.profilecontents}>
                                                <h2>김민성 <span>BackEnd</span></h2>
                                                <p>아자아자</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/YTG.png" alt="유태근" />
                                            <div className={styles.profilecontents}>
                                                <h2>유태근 <span>FrontEnd</span></h2>
                                                <p>아자아자</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/JSY.png" alt="정시연" />
                                            <div className={styles.profilecontents}>
                                                <h2>정시연 <span>FrontEnd</span></h2>
                                                <p>jsy011107@naver.com</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={styles.team}>
                                    <li className={styles.teamitem}>
                                        <div className={styles.profile}>
                                            <img src="/assets/images/HTR.png" alt="한태랑" />
                                            <div className={styles.profilecontents}>
                                                <h2>한태랑 <span>AI</span></h2>
                                                <p>아자아자</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <div className={styles.mobile_ourteam}>
                모바일 서비스소개페이지
            </div>
        </div>
    )
}

export default Ourteam;