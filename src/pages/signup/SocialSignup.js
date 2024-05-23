import React, { useState } from "react";
import styles from './signup.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SocialSignup () {
    const navigate = useNavigate();
    const [profile, setProfile] = useState('/assets/images/profile.png');
    const [alertMessage, setAlertMessage] = useState('');

    const [inputValue, setInputValue] = useState({
        nickname: '',
        profileImage: null,
    });

    const handleImageUpload = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        return new Promise((resolve) => {
            reader.onload = () => {
                setProfile(reader.result);
                resolve();
            };
        });
    };

    const handleImageCancel = () => {
        setInputValue((prevState) => ({ ...prevState, profileImage: null }));
        setProfile('/assets/images/profile.png');
    }

    /*닉네임 중복 체크 */
    const handleCheckNickname = async (e) => {
        e.preventDefault();

        if (!inputValue.nickname) {
            setAlertMessage('닉네임을 입력해주세요');
            return;
        }

        const formData = new FormData();
        formData.append('request', inputValue.nickname);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/duplication/nickname`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            });
            console.log(response.data);

            response.data.isSuccess 
            ? setAlertMessage('사용 가능한 닉네임입니다')
            : setAlertMessage('중복된 닉네임입니다') 
        } catch (error) {
            console.error(error);
        }
    }

    /* 닉네임 유효성 검사 */
    const handleValidNickname = (e) => {
        e.preventDefault();

        if (alertMessage.nickname === '사용 가능한 닉네임입니다') return;

        if (!inputValue.nickname) {
            setAlertMessage('닉네임을 입력해주세요');
        } else {
            setAlertMessage('아이디 중복을 확인해주세요');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({ ...prevState, [name]: value }));
        setAlertMessage('');
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        handleValidNickname(e);

        if (alertMessage.nickname !=='사용 가능한 닉네임입니다') {
            return;
        }

        const {nickname} = inputValue;

        const data = {
            nickname,
        }

        const formData = new FormData();
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: "application/json",
        });

        formData.append('request', blob );
        formData.append('userImg', inputValue.profileImage);
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/register/v1`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            });
            console.log(response.data);
            navigate('/signup/success')
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.cotent}>
                <div className={styles.main}>
                    <div className={styles.title_wrap}>
                        <div>Signup</div>
                    </div>
                    <div className={styles.signup}>
                        <div className={styles.profile_wrap}>
                            <div className={styles.profile_image_wrap}>
                                <img src={profile} alt="프로필" />
                            </div>
                            <div class={styles.filebox}>
                                <label for="file"><img src="/assets/images/camera.png" alt="카메라" /></label>
                                <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                            </div>
                            {profile !== '/assets/images/profile.png' ?
                                (<button onClick={() => handleImageCancel()}>프로필 사진 삭제</button>)
                                : <div style={{marginTop: "32px"}}></div> 
                            }
                        </div>
                        <div className={styles.nickname_wrap}>
                            <div style={{position: "relative", width: '100%'}}>
                                <input 
                                    type="text" 
                                    placeholder="닉네임" 
                                    name="nickname"
                                    vale={inputValue.nickname}
                                    onChange={handleChange}
                                    onBlur={handleValidNickname}
                                    maxLength={12}/>
                                <div className={styles.limit}>{inputValue.nickname.length} / 12</div>
                            </div>
                            <button onClick={handleCheckNickname} style={{color: inputValue.nickname? '#393939': '#919191'}}>중복검사</button>
                            {alertMessage !== '' && 
                            <div 
                                className={styles.alert} 
                                style={{color: alertMessage !== '사용 가능한 닉네임입니다' ? '#ac2323' : 'green'}} 
                            >
                            *{alertMessage}
                            </div>
                            }
                        </div>
                        <button onClick={handleSignup}>회원가입</button>
                        <div className={styles.account} style={{marginBottom: "30px"}}>이미 계정이 있으신가요? <Link to="/login">Log in</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialSignup;