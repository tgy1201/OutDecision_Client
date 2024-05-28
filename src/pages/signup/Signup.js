import React, { useState } from "react";
import styles from './signup.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Signup () {
    const navigate = useNavigate();
    const [profile, setProfile] = useState('/assets/images/profile.png');
    const [showPassword, setShowPassword] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);

    const [inputValue, setInputValue] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        pwCheck: '',
        profileImage: null,
    });

    /* 에러메시지 모음 */
    const [alertMessage, setAlertMessage] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        pwCheck: '',
    });

    /* 유효성 정규식 집합 */
    const inputRegexs = {
        emailRegex : /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // example@naver.com
        nameRegex : /^[a-zA-Z가-힣\s]*$/,
        pwRegex : /^\S{8,}$/ // 공백 미포함, 8자 이상
    }

    /* 이름 유효성 검사 */
    const handleValidName = (e) => {
        e.preventDefault();

        if (!inputValue.name) {
            setAlertMessage((prevState) => ({ ...prevState, name: '이름을 입력해주세요' }));
        } else if(!inputRegexs.nameRegex.test(inputValue.name)) {
            setAlertMessage((prevState) => ({ ...prevState, name: '올바른 이름을 입력해주세요' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, name: '' }));
        }
    }

    /* 닉네임 유효성 검사 */
    const handleValidNickname = (e) => {
        e.preventDefault();

        if (alertMessage.nickname === '사용 가능한 닉네임입니다') return;

        if (!inputValue.nickname) {
            setAlertMessage((prevState) => ({ ...prevState, nickname: '닉네임을 입력해주세요' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, nickname: '아이디 중복을 확인해주세요' }));
        }
    }

    /* 비밀번호 유효성 검사 */
    const handleValidPassword = (e) => {
        e.preventDefault();

        if (!inputValue.password) {
            setAlertMessage((prevState) => ({ ...prevState, password: '비밀번호를 입력해주세요' }));
        } else if(!inputRegexs.pwRegex.test(inputValue.password)) {
            setAlertMessage((prevState) => ({ ...prevState, password: '비밀번호는 8~16글자여야 합니다' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, password: '' }));
        }
    }

    /* 비밀번호 확인 유효성 검사 */
    const handleValidPwCheck = (e) => {
        e.preventDefault();

        if(!inputValue.pwCheck) {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '비밀번호를 다시 입력해주세요' }));
        } else  if (inputValue.pwCheck !== inputValue.password) {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '비밀번호가 일치하지 않습니다' }));
        } else {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '' }));
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'name') {
            setAlertMessage((prevState) => ({ ...prevState, name: '' }));
        } else if (name === 'nickname') {
            setAlertMessage((prevState) => ({ ...prevState, nickname: '' }));
        } else if (name === 'email') {
            setAlertMessage((prevState) => ({ ...prevState, email: '' }))
        } else if (name === 'password') {
            setAlertMessage((prevState) => ({ ...prevState, password: '' }))
        } else if (name === 'pwCheck') {
            setAlertMessage((prevState) => ({ ...prevState, pwCheck: '' }));
        }
    };

    const handleShowPassword = (target) => {
        if (target==='password') {
            setShowPassword(!showPassword);
        } else {
            setShowPwCheck(!showPwCheck);
        }
    }

    /* 프로필 업로드 */
    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
         setInputValue((prevState) => ({ ...prevState, profileImage: e.target.files[0] }));
        }

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        return new Promise((resolve) => {
            reader.onload = () => {
                setProfile(reader.result);
                resolve();
            };
        });
    };

    /* 프로필 업로드 취소 */
    const handleImageCancel = () => {
        setInputValue((prevState) => ({ ...prevState, profileImage: null }));
        setProfile('/assets/images/profile.png');
    }

    /*닉네임 중복 체크 */
    const handleCheckNickname = async (e) => {
        e.preventDefault();

        if (!inputValue.nickname) {
            setAlertMessage((prevState) => ({ ...prevState, nickname: '닉네임을 입력해주세요' }));
            return;
        }

        const formData = new FormData();
        formData.append('request', inputValue.nickname);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/duplication/nickname`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            });
            console.log(response.data);

            response.data.isSuccess 
            ? setAlertMessage((prevState) => ({ ...prevState, nickname: '사용 가능한 닉네임입니다' }))
            : setAlertMessage((prevState) => ({ ...prevState, nickname: '중복된 닉네임입니다' })) 
        } catch (error) {
            console.error(error);
        }
    }

    /* 이메일 중복 체크 & 유효성 검사*/
    const handleCheckEmail = async (e) => {
        e.preventDefault();

        if (!inputValue.email) {
            setAlertMessage((prevState) => ({ ...prevState, email: '이메일을 입력해주세요' }));
            return;
        } else if(!inputRegexs.emailRegex.test(inputValue.email)) {
            setAlertMessage((prevState) => ({ ...prevState, email: '올바른 이메일 형식이 아닙니다' }));
            return;
        } 

        const formData = new FormData();
        formData.append('request', inputValue.email);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/duplication/email`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            });
            console.log(response.data);

            response.data.isSuccess 
            ? setAlertMessage((prevState) => ({ ...prevState, email: '' }))
            : setAlertMessage((prevState) => ({ ...prevState, email: '이미 가입된 이메일입니다' })) 
        } catch (error) {
            console.error(error);
        }
    }

    const handleValidForm = (e) => {
        handleValidName(e);
        handleValidNickname(e);
        handleCheckEmail(e);
        handleValidPassword(e);
        handleValidPwCheck(e);

        if(!alertMessage.name && !alertMessage.email && !alertMessage.password && !alertMessage.pwCheck && alertMessage.nickname==='사용 가능한 닉네임입니다') {
            return true;
        } else {
            return false;
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const valid = handleValidForm(e);

        if(!valid) return;

        const {name, nickname, email, password} = inputValue;

        const data = {
            name,
            nickname,
            email,
            password,
        }

        const formData = new FormData();
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: "application/json",
        });

        formData.append('request', blob );

        const emptyFile = new Blob([], { type: 'application/octet-stream' });
        if(inputValue.profileImage !== null) {
            formData.append('userImg', inputValue.profileImage);
        } else {
            formData.append('userImg', emptyFile);
        }
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/register/v2`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
            });
            console.log(response);
            navigate('/signup/success')
        } catch (error) {
          console.error(error);
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
                        <div>Signup</div>
                    </div>
                    <div className={styles.signup}>
                        <section className={styles.profile_wrap}>
                            <div className={styles.profile_image_wrap}>
                                <img src={profile} alt="프로필" />
                            </div>
                            <div className={styles.filebox}>
                                <label htmlFor="file"><img src="/assets/images/camera.png" alt="카메라" /></label>
                                <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                            </div>
                            {profile !== '/assets/images/profile.png' ?
                                (<button onClick={() => handleImageCancel()}>프로필 사진 삭제</button>)
                                : <div style={{marginTop: "32px"}}></div> 
                            }
                        </section>
                        <section className={styles.input_wrap}>
                            <div className={styles.nickname_wrap}>
                                <div style={{position: "relative", width: '100%'}}>
                                    <input 
                                        type="text" 
                                        placeholder="닉네임" 
                                        name="nickname" 
                                        value={inputValue.nickname} 
                                        onChange={handleChange}
                                        onBlur={handleValidNickname} 
                                        className={
                                            alertMessage.nickname !== '' && alertMessage.nickname !== '사용 가능한 닉네임입니다'
                                            ? `${styles.false}` : ''
                                        } 
                                        maxLength={12}
                                    />
                                    <div className={styles.limit}>{inputValue.nickname.length} / 12</div>
                                </div>
                                <button onClick={handleCheckNickname} style={{color: inputValue.nickname? '#393939': '#919191'}}>중복검사</button>
                                {alertMessage.nickname !== '' && 
                                <div 
                                    className={styles.alert} 
                                    style={{color: alertMessage.nickname !== '사용 가능한 닉네임입니다' ? '#ac2323' : 'green'}} 
                                >
                                *{alertMessage.nickname}
                                </div>
                                }                
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="이름" 
                                    name="name" 
                                    value={inputValue.name} 
                                    onChange={handleChange} 
                                    onBlur={handleValidName} 
                                    maxLength={5} 
                                    className={alertMessage.name !== '' ? `${styles.false}` : ''}
                                />
                                {alertMessage.name !== '' && <div className={styles.alert} style={{color: '#ac2323'}} >*{alertMessage.name}</div>}
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="이메일" 
                                    name="email" 
                                    value={inputValue.email} 
                                    onChange={handleChange} 
                                    onBlur={handleCheckEmail} 
                                    className={alertMessage.email !== '' ? `${styles.false}` : ''}
                                />
                                {alertMessage.email !== '' && <div className={styles.alert} style={{color: '#ac2323'}} >*{alertMessage.email}</div>}
                            </div>
                            <div>
                                <div style={{position: "relative", width: '100%'}}>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="비밀번호" 
                                        name="password" 
                                        value={inputValue.password} 
                                        onChange={handleChange}
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
                                        value={inputValue.pwCheck} 
                                        onChange={handleChange} 
                                        onBlur={handleValidPwCheck} 
                                        className={alertMessage.pwCheck !== '' ? `${styles.false}` : ''}
                                    />
                                    <button onClick={()=>handleShowPassword('pwcheck')} className={styles.limit}>
                                    {showPwCheck ? <IoEye className={styles.icon}/> : <IoEyeOff className={styles.icon}/>}
                                    </button>
                                </div>
                                {alertMessage.pwCheck !== '' && <div className={styles.alert} style={{color: '#ac2323'}} >*{alertMessage.pwCheck}</div>}
                            </div>
                        </section>
                        <button onClick={handleSignup}>회원가입</button>
                        <div className={styles.account}>이미 계정이 있으신가요? <Link to="/login">Log in</Link></div>
                        <p><span>간편회원가입</span></p>
                        <div className={styles.social_wrap}>
                            <Link onClick={handleKakaoLogin}>
                            <img src="/assets/images/kakao.png" alt="카카오"/>
                            </Link>
                            <Link onClick={handleGoogleLogin} style={{border: "1px solid lightgray"}}>
                            <img src="/assets/images/google.png" alt="구글"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;