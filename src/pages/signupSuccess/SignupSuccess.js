import React from "react";
import styles from './signupSuccess.module.css'
import { Link } from "react-router-dom";

function SignupSuccess () {

    return (
        <div className={styles.container}>
            <div className={styles.cotent}>
                <div className={styles.main}>
                    <div className={styles.success_wrap}>
                        <div>
                            <img src="/assets/images/check_red.png" alt="회원가입 성공" />
                        </div>
                        <div>회원가입이 완료되었습니다.</div>
                        <p>로그인 후 편리하고 안전하게 </p>
                        <p>결정잘해 서비스를 이용하실 수 있습니다.</p>
                        <Link to="/login" >로그인</Link>
                    </div>       
                </div>
            </div>
        </div>
    )
}

export default SignupSuccess;