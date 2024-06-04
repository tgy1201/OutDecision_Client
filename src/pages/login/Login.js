import React, { useState } from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/login`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
            console.log(response);
            if(response.data.isSuccess) {
                sessionStorage.setItem('isLogin', true);
                navigate('/');
            } else {
                setAlertMessage('아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
                return;
            }
        } catch (error) {
            console.error( error);
            if(error.response.data.status === 404) {
                setAlertMessage('아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
                return;
            }
        }
    }

    const handleKakaoLogin = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_IP}/oauth2/authorization/kakao`;
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_IP}/oauth2/authorization/google`;
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
                            onChange={(e) => {setEmail(e.target.value); setAlertMessage('')}}
                        />
                        <div style={{position: "relative", width: '100%'}}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                value={password} 
                                placeholder="비밀번호" 
                                onChange={(e) => {setPassword(e.target.value); setAlertMessage('')}}
                                style={{marginTop: "20px"}} 
                            />
                            <button onClick={()=>setShowPassword(!showPassword)} className={styles.limit}>
                                {showPassword ? <IoEye className={styles.icon}/> : <IoEyeOff className={styles.icon}/>}
                            </button>
                            <div className={styles.errorMsg}>
                            {alertMessage && alertMessage.split('\n').map((line,idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                            </div>
                        </div>
                        <Link to="/checkMember" className={styles.find_pwd}>비밀번호 재설정</Link>
                        <button onClick={handleLogin}>로그인</button>
                        <div className={styles.account}>계정이 없으신가요? <Link to="/signup">Sign up</Link></div>
                        <p><span>간편로그인</span></p>
                        <div className={styles.social_wrap}>
                            <div onClick={handleKakaoLogin}><img src="/assets/images/kakao.png" alt="카카오"/></div>
                            <div onClick={handleGoogleLogin} style={{border: "1px solid lightgray"}}><img src="/assets/images/google.png" alt="구글"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;