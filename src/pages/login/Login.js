import React, { useState } from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        try {
          const response = await axios.post('https://api.outdecision.com/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              withCredentials: true
          });
          console.log('로그인성공');
          console.log(response.data);
          navigate('/');
        } catch (error) {
          console.error( error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.cotent}>
                <div className={styles.main}>
                    <div className={styles.title_wrap}>
                        <div>Login</div>
                    </div>
                    <div className={styles.login}>
                        <input 
                            type="email" 
                            value={email} 
                            placeholder="이메일"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            value={password} 
                            placeholder="비밀번호" 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{marginTop: "20px"}} 
                        />
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