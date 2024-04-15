import React, { useState } from "react";
import styles from './write.module.css'
import DatePicker from 'react-datepicker';
import Toggle from 'react-toggle';
import 'react-datepicker/dist/react-datepicker.css';
import "react-toggle/style.css"
import { ko } from 'date-fns/locale'

function Write () {
    const hourOption = Array.from({ length: 24 }, (_, i) => i + 1);
    const minuteOption = [0, 10, 20, 30, 40, 50];

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const [startDate, setStartDate] = useState(now);
    const [selectedHours, setSelectedHours] = useState(hours);
    const [selectedMinutes, setSelectedMinutes] = useState(minutes);

    const [isChecked, setIsChecked] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');

    const handleHoursChange = (newValue) => {

        if (now.getDate() === startDate.getDate()) {
            if (Number(newValue) > hours) {
                setSelectedHours(Number(newValue));
            } else if (Number(newValue) === hours) {
                if (selectedMinutes > minutes) {
                    setSelectedHours(Number(newValue));
                }
                else {
                    alert("현재 시간 이후로 설정 가능합니다");
                }
            } else {
                alert("현재 시간 이후로 설정 가능합니다");
            }
        } else {
            setSelectedHours(Number(newValue));
        }
    }

    const handleMinutesChange = (newValue) => {

        if (now.getDate() === startDate.getDate()) {
            if (selectedHours > hours) {
                setSelectedMinutes(Number(newValue));
            } else if (selectedHours === hours) {
                if (Number(newValue) > minutes) {
                    setSelectedMinutes(Number(newValue));
                }
                else {
                    alert("현재 시간 이후로 설정 가능합니다");
                }
            } else {
                alert("현재 시간 이후로 설정 가능합니다");
            }
        } else {
            setSelectedMinutes(Number(newValue));
        }
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    return (
        <div className={styles.container}>
            <section className={styles.vote_header}>
                <p>투표 작성</p>    
            </section>
            <section className={styles.vote_body}>
                <table className={styles.vote_table}>
                    <colgroup>
                        <col width="15%"/>
                        <col width="85%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>카테고리</td>
                            <td>
                                <select className={styles.category} defaultValue="">
                                    <option>--카테고리--</option>
                                    <option>음식</option>
                                    <option>패션</option>
                                    <option>여행</option>
                                    <option>취업</option>
                                    <option>취미</option>
                                    <option>연애</option>
                                    <option>기타</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>투표 제목</td>
                            <td><input className={styles.vote_title} placeholder="투표 제목을 입력해주세요"/><div className={styles.limit}>0 / 12</div></td>
                        </tr>
                        <tr>
                            <td>투표 항목</td>
                            <td>ㄴㄴ</td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td><input className={styles.vote_content} placeholder="작성한 투표에 대해 부가적인 설명을 적어주세요"/><div className={styles.limit}>0 / 100</div></td>
                        </tr>
                        <tr>
                            <td>종료 시간</td>
                            <td style={{display: "flex"}}>
                                <DatePicker
                                locale={ko}
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                minDate={now}
                                />
                                <select className={styles.hour} value={selectedHours} onChange={(e) => handleHoursChange(e.target.value)}>
                                {hourOption.map((hour) => (
                                    <option key={hour} value={hour-1}>
                                        {hour > 10 ? `${hour-1}시` : `0${hour-1}시`}
                                    </option>
                                ))}
                                </select>
                                <select className={styles.minute} value={selectedMinutes} onChange={(e) => handleMinutesChange(e.target.value)}>
                                {minuteOption.map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute}분
                                    </option>
                                ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>복수 투표</td>
                            <td><Toggle 
                                 defaultChecked={isChecked}
                                 icons={false}
                                 onChange={()=>setIsChecked(!isChecked)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>대상 성별</td>
                            <td className={styles.gender}>
                                <label>
                                    <input type="radio" value="" checked={selectedGender === ''} onChange={handleGenderChange}/>
                                    <span>전체</span>
                                </label>
                                <label>
                                    <input type="radio" value="male" checked={selectedGender === 'male'} onChange={handleGenderChange}/>
                                    <span>남성</span>
                                </label>
                                <label>
                                    <input type="radio" value="female" checked={selectedGender === 'female'} onChange={handleGenderChange}/>
                                    <span>여성</span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.submit_wrap}>
                    <button>취소</button>
                    <button>등록</button>
                </div>
            </section>
        </div>
    )
}

export default Write;