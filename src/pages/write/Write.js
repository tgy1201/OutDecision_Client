import React, { useEffect, useState } from "react";
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
import { MdOutlineCancel } from "react-icons/md";

import { MdFastfood } from "react-icons/md"; // 음식
import { FaShirt } from "react-icons/fa6"; //패션
import { ImAirplane } from "react-icons/im"; // 여행
import { MdWorkHistory } from "react-icons/md"; //취업
import { IoGameController } from "react-icons/io5"; //취미
import { MdFavorite } from "react-icons/md"; // 연애
import { CgMoreO } from "react-icons/cg"; //etc
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Write ({edit, postId}) {
    const navigate = useNavigate();
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

    const [options, setOptions] = useState([{ text: "", imageURL: "", image: null, originURL: "" },{ text: "", imageURL: "", image: null, originURL: "" }]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isToggleChecked, setIsToggleChecked] = useState(false);
    const [selectedGender, setSelectedGender] = useState('all');

    const [scrollPosition, setScrollPosition] = useState('left-border');

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/post/${postId}`, {
                params: {
                  postId: postId,
                },
                withCredentials: true,
            });

            setSelectedCategory(response.data.result.category);
            setTitle(response.data.result.title);
            const options = response.data.result.optionsList.map((option)=> ({
                text: option.body,
                imageURL: option.imgUrl,
                image: null, //이미지파일 받아야됨
                originURL: option.imgUrl
            }))
            setOptions(options);
            setContent(response.data.result.content);
            setIsToggleChecked(response.data.result.pluralVoting);
            setSelectedGender(response.data.result.gender);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };

        if(edit) {
            fetchPost();
        }
    }, [postId, edit]);

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
            setOptions(existingOptions => [...existingOptions, { text: "", imageURL: "", image: null, originURL: "" }]);
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

    const handleClearImage = (optionIdx) => {
        const updatedOptions = [...options];
        updatedOptions[optionIdx].imageURL = "";
        updatedOptions[optionIdx].image = null;
        setOptions(updatedOptions);
    };
    
    const handleGoBack = () => {
        navigate('/board/all');
    }

    const handleValidInput = (title, selectedCategory, options, startDate, selectedHours, selectedMinutes) => {
         const formattedDateSeconds = selectedHours * 3600 + selectedMinutes * 60;
         const currentDateSeconds = now.getHours() * 3600 + now.getMinutes() * 60;

        if (!selectedCategory) {
            alert('카테고리를 선택해주세요');
            return false;
        }
        if (!title) {
            alert('투표 제목을 입력해주세요');
            return false;
        }
        if (!options.every(option => option.text)) {
            alert('투표옵션을 입력해주세요');
            return false;
        }
        if (startDate < now && formattedDateSeconds < currentDateSeconds) {
            alert('현재 시간 이후로 설정 가능합니다');
            return false;
        }
        return true;
    }

    const handlePostUpload = async (e) => {
        e.preventDefault();

        const isValid = handleValidInput(title, selectedCategory, options, startDate, selectedHours, selectedMinutes);

        if (!isValid) return;

        const textList = options.map((option) => option.text);
        const imageFileList = options.map((option) => option.image);
        const originImageList = options.map((option) => {
            if (option.originURL === option.imageURL) {
                return option.originURL;
            } else {
                return '';
            }
        });

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

        const blob3 = new Blob([JSON.stringify(originImageList)], { type: 'application/json' });
        formData.append('originImages', blob3);    

        try {
            const url = edit ? `${process.env.REACT_APP_SERVER_IP}/post/${postId}` : `${process.env.REACT_APP_SERVER_IP}/post`;
            const method = edit ? 'PATCH' : 'POST';
            
            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
              });
            console.log(response.data.result);
            navigate('/board/all');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.vote_header}>
                <p>{edit? '게시글 수정' : '게시글 작성'}</p>    
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
                                            <label onClick={()=>handleCategoryChange('work')} className={selectedCategory==='work'? `${styles.category}`: `${styles.category_none}`}>
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
                                            <label onClick={()=>handleCategoryChange('other')} className={selectedCategory==='other'? `${styles.category}`: `${styles.category_none}`}>
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
                            <td><input className={styles.vote_title} value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder={isMobile? "투표 제목" : "투표 제목을 입력해주세요"} maxLength={18}/><div className={styles.limit}>{title.length} / 18</div></td>
                        </tr>
                        <tr>
                            <td>투표 항목</td>
                            <td>
                                <div className={styles.mobile_option}>
                                    {isMobile && <span>투표 항목</span>}
                                    {options.map((option, index) => (
                                        <div key={index} className={styles.option_wrap}>
                                            <div className={styles.options}>
                                                <input type="text" value={options[index].text} onChange={(e) => handleTextUpload(e, index)} placeholder={`보기 ${index + 1}`} maxLength={20}/>
                                                <div className={styles.filebox}>
                                                    <label htmlFor={`file-${index}`}><LuImagePlus className={styles.image_icon}/></label>
                                                    <input id={`file-${index}`} type="file" onChange={(e) => handleImageUpload(e, index)} accept=".png,.jpg" />
                                                </div>
                                                <button className={styles.delete_btn} onClick={() => handleRemoveOption(index)}><ImCancelCircle className={styles.delete_icon}/></button>
                                            </div>
                                            {options[index].imageURL && <div className={styles.preview}><img src={options[index].imageURL} alt="preview-img" /><MdOutlineCancel className={styles.delete_img_icon} onClick={()=> handleClearImage(index)}/></div>}
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
                                    <textarea className={styles.vote_content} value={content} onChange={(e)=>handleContentChange(e.target.value)}placeholder="작성한 투표에 대해 부가적인 설명을 적어주세요" maxLength={70}/><div className={styles.limit}>{content.length} / 70</div>
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
                                            <input type="radio" value="all" checked={selectedGender === 'all'} onChange={handleGenderChange}/>
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
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.submit_wrap}>
                    <button onClick={handleGoBack}>취소</button>
                    <button onClick={handlePostUpload}>등록</button>
                </div>
            </section>
        </div>
    )
}

export default Write;