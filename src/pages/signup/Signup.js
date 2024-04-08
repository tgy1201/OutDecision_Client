import React, { useState } from "react";
import styles from './signup.module.css'
import { Link, useNavigate } from "react-router-dom";

function Signup () {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('/assets/images/profile.png');
    const [emailCheck, setEmailCheck] = useState('');

    const handleImageUpload = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        return new Promise((resolve) => {
            reader.onload = () => {
                setProfileImage(reader.result);
                resolve();
            };
        });
    };

    /* 이메일 중복 체크 */
    const handleCheckEmail = (e) => {
        if(e.target.value === 'id') {
            setEmailCheck(true)
        } else {
            setEmailCheck(false)
        }
    }

    const handleSignup = () => {
        /*회원가입 성공시*/
        navigate('/signup/success')
    }

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
                                <img src={profileImage} alt="프로필" />
                            </div>
                            <div class={styles.filebox}>
                                <label for="file"><img src="/assets/images/camera.png" alt="카메라" /></label>
                                <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                            </div>
                            {profileImage !== '/assets/images/profile.png' ?
                                (<button onClick={() => setProfileImage('/assets/images/profile.png')}>프로필 사진 삭제</button>)
                                : <div style={{marginTop: "32px"}}></div> 
                            }
                        </div>
                        <div className={styles.nickname}>
                            <input type="text" placeholder="닉네임" />
                            <button>중복검사</button>
                            <div className={styles.nickname_check} style={{color: "green"}}>*사용가능한 닉네임입니다.</div>
                        </div>
                        <input type="text" placeholder="이름" />
                        <input type="email" placeholder="이메일" onBlur={handleCheckEmail} style={{border: emailCheck === true ? "2px solid green" : emailCheck === false ? "2px solid red" : ""}}/>
                        <input type="password" placeholder="비밀번호" />
                        <input type="password" placeholder="비밀번호 확인" />
                        <input type="tel" placeholder="휴대폰번호" />
                        <button onClick={handleSignup}>회원가입</button>
                        <div className={styles.account}>이미 계정이 있으신가요? <Link to="/login">Log in</Link></div>
                        <p><span>간편회원가입</span></p>
                        <div className={styles.social_wrap}>
                            <Link to="/signup/social"><img src="/assets/images/kakao.png" alt="카카오"/></Link>
                            <Link to="/signup/social" style={{border: "1px solid lightgray"}}><img src="/assets/images/google.png" alt="구글"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;