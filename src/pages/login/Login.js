import React from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";

function Login () {
    const navigate = useNavigate();

    const handleLogin = () => {
        /*로그인 성공시*/
        navigate('/');
    }
    return (
        <div className={styles.container}>
            <div className={styles.cotent}>
                <div className={styles.main}>
                    <div className={styles.title_wrap}>
                        <div>Login</div>
                    </div>
                    <div className={styles.login}>
                        <input type="text" placeholder="이메일"/>
                        <input type="password" style={{marginTop: "20px"}} placeholder="비밀번호" />
                        <Link to="/" className={styles.find_pwd}>비밀번호 찾기</Link>
                        <button onClick={handleLogin}>로그인</button>
                        <div className={styles.account}>계정이 없으신가요? <Link to="/signup">Sign up</Link></div>
                        <p><span>간편로그인</span></p>
                        <div className={styles.social_wrap}>
                            <div><img src="/assets/images/kakao.png" alt="카카오"/></div>
                            <div style={{border: "1px solid lightgray"}}><img src="/assets/images/google.png" alt="구글"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;