import React, { useState } from "react";
import styles from './resetPassword.module.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function ResetPassword ({memberId}) {
    const navigate = useNavigate();
    const {email} = useParams();

    const [password, setPassword] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        password: '',
        pwCheck: '',
    });
    const pwRegex = /^\S{8,}$/

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setAlertMessage((prevState) => ({ ...prevState, password: '' }))
    };

    const handleChangePwCheck = (e) => {
        setPwCheck(e.target.value);
        setAlertMessage((prevState) => ({ ...prevState, pwCheck: '' }));
    };

    /* 비밀번호 유효성 검사 */
    const handleValidPassword = (e) => {
        e.preventDefault();

        if (!password) {
            setAlertMessage((prevState) => ({ ...prevState, password: '비밀번호를 입력해주세요' }));
        } else if(!pwRegex.test(password)) {
            setAlertMessage((prevState) => ({ ...prevState, password: '비밀번호는 8~16글자여야 합니다' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, password: '' }));
        }
    }

    /* 비밀번호 확인 유효성 검사 */
    const handleValidPwCheck = (e) => {
        e.preventDefault();

        if(!pwCheck) {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '비밀번호를 다시 입력해주세요' }));
        } else  if (pwCheck !== password) {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '비밀번호가 일치하지 않습니다' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '' }));
        }
    }

    const handleShowPassword = (target) => {
        if (target==='password') {
            setShowPassword(!showPassword);
        } else {
            setShowPwCheck(!showPwCheck);
        }
    }

    const handleValidForm = (e) => {
        handleValidPassword(e);
        handleValidPwCheck(e);

        if(!alertMessage.password && !alertMessage.pwCheck) {
            return true;
        } else {
            return false;
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const valid = handleValidForm(e);

        if(!valid) return;
        
        const formData = new FormData();
        formData.append('memberId', memberId)
        formData.append('newPassword', password);

        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_IP}/update/password`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log(response);
            if(response.data.isSuccess) {
                alert('비밀번호 변경 성공');
                navigate('/login');
            } else {
                alert('비밀번호 변경 실패');
                return;
            }
        } catch (error) {
            console.error( error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.cotent}>
                <div className={styles.main}>
                    <div className={styles.title_wrap}>
                        <div>비밀번호 재설정</div>
                        <p>이메일 <span style={{color: '#354edd', fontWeight: '600'}}>{email}</span>의 새 비밀번호를 등록해 주세요</p>
                    </div>
                    <div className={styles.login}>
                        <div>
                            <div style={{position: "relative", width: '100%'}}>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="비밀번호" 
                                    name="password" 
                                    value={password} 
                                    onChange={handleChangePassword}
                                    onBlur={handleValidPassword}
                                    className={alertMessage.password !== '' ? `${styles.false}`: ''}
                                />
                                <button onClick={()=>handleShowPassword('password')} className={styles.limit}>
                                {showPassword ? <IoEye className={styles.icon}/> : <IoEyeOff className={styles.icon}/>}
                                </button>
                            </div>
                            {alertMessage.password !== '' && <div className={styles.alert} style={{color: '#ac2323'}} >*{alertMessage.password}</div>}
                        </div>
                        <div>
                            <div style={{position: "relative", width: '100%'}}>
                                <input 
                                    type={showPwCheck ? 'text' : 'password'}
                                    placeholder="비밀번호 확인" 
                                    name="pwCheck" 
                                    value={pwCheck} 
                                    onChange={handleChangePwCheck} 
                                    onBlur={handleValidPwCheck} 
                                    className={alertMessage.pwCheck !== '' ? `${styles.false}` : ''}
                                />
                                <button onClick={()=>handleShowPassword('pwcheck')} className={styles.limit}>
                                {showPwCheck ? <IoEye className={styles.icon}/> : <IoEyeOff className={styles.icon}/>}
                                </button>
                            </div>
                            {alertMessage.pwCheck !== '' && <div className={styles.alert} style={{color: '#ac2323'}} >*{alertMessage.pwCheck}</div>}
                        </div>
                        <button onClick={handleLogin}>변경하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;