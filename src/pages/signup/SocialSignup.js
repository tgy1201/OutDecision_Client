import React, { useState } from "react";
import styles from './signup.module.css'
import { Link, useNavigate } from "react-router-dom";

function SocialSignup () {
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        checkpass: '',
        profileImage: null,
    });

    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('/assets/images/profile.png');

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
                        <div className={styles.nickname_wrap}>
                            <div style={{position: "relative", width: '100%'}}>
                                <input type="text" placeholder="닉네임" name="nickname" maxLength={12}/>
                                <div className={styles.limit}>0 / 12</div>
                            </div>
                            <button>중복검사</button>
                            <div className={styles.nickname_check} style={{color: "green"}}>*사용가능한 닉네임입니다.</div>
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