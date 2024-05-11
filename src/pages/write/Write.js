import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from './write.module.css'
import DatePicker from 'react-datepicker';
import Toggle from 'react-toggle';
import 'react-datepicker/dist/react-datepicker.css';
import "react-toggle/style.css"
import { ko } from 'date-fns/locale'

import { GoPlus } from "react-icons/go";
import { LuImagePlus } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";

import { MdFastfood } from "react-icons/md"; // 음식
import { FaShirt } from "react-icons/fa6"; //패션
import { ImAirplane } from "react-icons/im"; // 여행
import { MdWorkHistory } from "react-icons/md"; //취업
import { IoGameController } from "react-icons/io5"; //취미
import { MdFavorite } from "react-icons/md"; // 연애
import { CgMoreO } from "react-icons/cg"; //etc
import axios from "axios";

function Write () {
    const isMobile = useMediaQuery({
        query: "(max-width: 1079px)"
    });

    const hourOption = Array.from({ length: 24 }, (_, i) => i + 1);
    const minuteOption = [0, 10, 20, 30, 40, 50];

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const [startDate, setStartDate] = useState(now);
    const [selectedHours, setSelectedHours] = useState(hours);
    const [selectedMinutes, setSelectedMinutes] = useState(0);

    const [options, setOptions] = useState([{ text: "", imageURL: "", image: null },{ text: "", imageURL: "", image: null }]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isToggleChecked, setIsToggleChecked] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');


    const [scrollPosition, setScrollPosition] = useState('left-border');

    const handleScroll = (e) => {
        const container = e.target
        const scrollRight = container.scrollWidth - container.scrollLeft - container.clientWidth;

        if (container.scrollLeft === 0) {
            setScrollPosition("left-border");
        } else if (scrollRight < 2 && scrollRight > -2) {
            setScrollPosition("right-border");
        } else {
            setScrollPosition("middle");
        }
    };
   

    const handleTitleChange = (newValue) => {
        setTitle(newValue);
    }

    const handleContentChange = (newValue) => {
        setContent(newValue);
    }

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

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    const handleTextUpload = (e, optionIdx) => {
        const optionValue = e.target.value;
        const updatedOptions = [...options];
        updatedOptions[optionIdx].text = optionValue;
        setOptions(updatedOptions);
    };

    const handleImageUpload = (e, optionIdx) => {
        const reader = new FileReader();
        const updatedOptions = [...options];
        updatedOptions[optionIdx].image = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);

        return new Promise((resolve) => {
            reader.onload = () => {
                updatedOptions[optionIdx].imageURL = reader.result;
                setOptions(updatedOptions);
                resolve();
            };
        });
    };

    const handleIncrease = () => {
        if (options.length < 10) {
            setOptions(existingOptions => [...existingOptions, { text: "", imageURL: "", image: null }]);
          } else {
            alert('최대 옵션 개수는 10개입니다.');
          }
    };

    const handleRemoveOption = (optionIdx) => {
        if (options.length > 2) {
            setOptions(options => options.filter((option, i) => i !== optionIdx));
          } else {
            alert('최소 옵션 개수는 2개입니다.');
          }
    };

    const handlePostUpload = async (e) => {
        e.preventDefault();

        const textList = options.map((option) => option.text);
        const imageFileList = options.map((option) => option.image);

        const formmatedDate = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} ${selectedHours > 9 ? selectedHours : '0'+selectedHours}:${selectedMinutes !== 0 ? selectedMinutes : '00'}`
        
        const data = {
            title: title,
            content: content,
            category: selectedCategory,
            gender: selectedGender,
            pluralVoting: isToggleChecked,
            deadline: formmatedDate
        }

        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });

        formData.append('request', blob);
 
        const blob2 = new Blob([JSON.stringify(textList)], { type: 'application/json' });
        formData.append('optionNames', blob2);

        const emptyFile = new Blob([], { type: 'application/octet-stream' });
        imageFileList.forEach((imageFile) => {
            if (imageFile !== null) {
              formData.append('optionImages', imageFile);
            } else {
              formData.append('optionImages', emptyFile);
            }
        });

        try {
            const response = await axios.post('http://175.45.202.225:8080/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
            });
            console.log(response.data);
            console.log(imageFileList);
            for (let value of formData.values()) {
                console.log(value);
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                                <div className={styles.mobile_category}>
                                    {isMobile && <span>카테고리</span>}
                                    <section className={styles.category_wrap}>
                                        <div className={scrollPosition === 'right-border' || scrollPosition === 'middle' ? styles.prev : ''}></div>
                                        <div className={scrollPosition === 'left-border' || scrollPosition === 'middle' ? styles.next : ''}></div>
                                        <div className={styles.category_list} onScroll={handleScroll}>   
                                            <label onClick={()=>handleCategoryChange('food')} className={selectedCategory==='food'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><MdFastfood className={styles.icon} /></span>
                                                <span>음식</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('fashion')} className={selectedCategory==='fashion'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><FaShirt className={styles.icon}/></span>
                                                <span>패션</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('travel')} className={selectedCategory==='travel'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><ImAirplane className={styles.icon}/></span>
                                                <span>여행</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('job')} className={selectedCategory==='job'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><MdWorkHistory className={styles.icon}/></span>
                                                <span>취업</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('hobby')} className={selectedCategory==='hobby'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><IoGameController className={styles.icon}/></span>
                                                <span>취미</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('love')} className={selectedCategory==='love'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><MdFavorite className={styles.icon}/></span>
                                                <span>연애</span>
                                            </label>
                                            <label onClick={()=>handleCategoryChange('etc')} className={selectedCategory==='etc'? `${styles.category}`: `${styles.category_none}`}>
                                                <span><CgMoreO className={styles.icon}/></span>
                                                <span>기타</span>
                                            </label>
                                        </div>
                                    </section>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>투표 제목</td>
                            <td><input className={styles.vote_title} value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder={isMobile? "투표 제목" : "투표 제목을 입력해주세요"} maxLength={12}/><div className={styles.limit}>0 / 12</div></td>
                        </tr>
                        <tr>
                            <td>투표 항목</td>
                            <td>
                                <div className={styles.mobile_option}>
                                    {isMobile && <span>투표 항목</span>}
                                    {options.map((option, index) => (
                                        <div key={index} className={styles.option_wrap}>
                                            <div className={styles.options}>
                                                <input type="text" value={options[index].text} onChange={(e) => handleTextUpload(e, index)} placeholder={`보기 ${index + 1}`} maxLength={15}/>
                                                <div class={styles.filebox}>
                                                    <label for={`file-${index}`}><LuImagePlus className={styles.image_icon}/></label>
                                                    <input id={`file-${index}`} type="file" onChange={(e) => handleImageUpload(e, index)} accept=".png,.jpg" />
                                                </div>
                                                <button className={styles.delete_btn} onClick={() => handleRemoveOption(index)}><ImCancelCircle className={styles.delete_icon}/></button>
                                            </div>
                                            {options[index].imageURL && <div className={styles.preview}><img src={options[index].imageURL} alt="preview-img" /></div>}
                                        </div>
                                    ))}
                                    <div className={styles.add_wrap}><button onClick={handleIncrease}><GoPlus className={styles.plus_icon}/>항목 추가</button></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td>
                                <div className={styles.mobile_content}>
                                    {isMobile && <span>설명</span>}
                                    <textarea className={styles.vote_content} value={content} onChange={(e)=>handleContentChange(e.target.value)}placeholder="작성한 투표에 대해 부가적인 설명을 적어주세요" maxLength={70}/><div className={styles.limit}>0 / 100</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>종료 시간</td>
                            <td>
                                <div className={styles.mobile_date}>
                                    {isMobile && <span>종료 시간</span>}
                                    <div style={{display: "flex"}}>
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
                                                {minute === 0 ? `0${minute}분` : `${minute}분`}
                                            </option>
                                        ))}
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>복수 투표</td>
                            <td>
                                <div className={styles.mobile_duplicate}>
                                    {isMobile && <span>복수 투표</span>}
                                    <Toggle 
                                    defaultChecked={isToggleChecked}
                                    icons={false}
                                    onChange={()=>setIsToggleChecked(!isToggleChecked)}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>대상 성별</td>
                            <td>
                                <div className={styles.mobile_gender}>
                                    {isMobile && <span>대상 성별</span>}
                                    <div className={styles.gender}>
                                        <label>
                                            <input type="radio" value="" checked={selectedGender === ''} onChange={handleGenderChange}/>
                                            <span>전체</span>
                                        </label>
                                        <label>
                                            <input type="radio" value="MALE" checked={selectedGender === 'MALE'} onChange={handleGenderChange}/>
                                            <span>남성</span>
                                        </label>
                                        <label>
                                            <input type="radio" value="female" checked={selectedGender === 'female'} onChange={handleGenderChange}/>
                                            <span>여성</span>
                                        </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.submit_wrap}>
                    <button>취소</button>
                    <button onClick={handlePostUpload}>등록</button>
                </div>
            </section>
        </div>
    )
}

export default Write;