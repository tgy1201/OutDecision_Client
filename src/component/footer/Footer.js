import React from "react";
import styles from "./footer.module.css"
import { Link } from "react-router-dom";

function Footer () {
    return (
        <div className={styles.container}>
            <div className={`${styles.pc_footer} ${styles.pc}`}>
                <div className={styles.footer_wrap}>
                    <ul>
                        <li>
                            <div style={{width: "120px"}}>
                                <img src="/assets/images/logo_w.png" alt="화이트로고" />
                            </div>
                        </li>
                        <li>Copyrightⓒ2024 OutDecision, All rights reserved.</li>
                    </ul>
                    <ul>
                        <li><Link to="/Ourteam">Our service</Link></li>
                        <li><Link to="/Ourteam">Our Team</Link></li>
                        <li>
                            <div style={{width: "30px"}}>
                                <img src="/assets/images/youtube.png" alt="화이트로고" />
                            </div>
                        </li>
                        <li>
                            <div style={{width: "25px"}}>
                                <img src="/assets/images/github.png" alt="화이트로고" />
                            </div>
                        </li>
                        <li>
                            <div style={{width: "23px"}}>
                                <img src="/assets/images/instagram.png" alt="화이트로고" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${styles.mobile_footer} ${styles.mobile}`}>
                <div className={styles.footer_wrap}>
                <ul>
                        <li>
                            <div style={{width: "30px"}}>
                                <img src="/assets/images/youtube.png" alt="화이트로고" />
                            </div>
                        </li>
                        <li>
                            <div style={{width: "25px"}}>
                                <img src="/assets/images/github.png" alt="화이트로고" />
                            </div>
                        </li>
                        <li>
                            <div style={{width: "23px"}}>
                                <img src="/assets/images/instagram.png" alt="화이트로고" />
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>Our service</li>
                        <li>Our Team</li>
                    </ul>
                    <div style={{width: "120px"}}>
                        <img style={{width: "100%"}} src="/assets/images/logo_w.png" alt="화이트로고" />
                    </div>
                    <div>Copyrightⓒ2024 OutDecision, All rights reserved.</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;