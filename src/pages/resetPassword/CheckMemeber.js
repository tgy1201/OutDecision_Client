import React, { useState } from "react";
import styles from './resetPassword.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckMember ({setMemberId}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckMember = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/help/pwInquiry`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log(response);
            if(response.data.isSuccess) {
                setMemberId(response.data.result.memberId);
                navigate(`/resetPassword/${email}`);
            } else {
                setAlertMessage('이름 또는 이메일 정보를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
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
                        <p>회원가입시 입력한 아래의 정보를 입력해 주세요</p>
                    </div>
                    <div className={styles.login}>
                        <input 
                            type='text' 
                            value={name} 
                            placeholder="이름" 
                            onChange={(e) => {setName(e.target.value); setAlertMessage('')}}
                                
                        />
                        <div style={{position: "relative", width: '100%'}}>  
                            <input 
                            type="email" 
                            value={email} 
                            placeholder="이메일"
                            onChange={(e) => {setEmail(e.target.value); setAlertMessage('')}}
                            style={{marginTop: "20px"}} 
                            />
                            <div className={styles.errorMsg}>
                            {alertMessage && alertMessage.split('\n').map((line,idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                            </div>
                        </div>
                        <button onClick={handleCheckMember}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckMember;