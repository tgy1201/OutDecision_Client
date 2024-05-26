import React, { useEffect, useState } from "react";
import styles from './mypage.module.css';
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import PostList from "../../component/postList/PostList";

function Mypage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const posts = searchParams.get('posts'); //작성한글(written), 투표한글(voted), 좋아요한글(liked)

    const [postList, setPostList] = useState();
    const [activeMenu, setActiveMenu] = useState('post');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [profileImage, setProfileImage] = useState('/assets/user.png');

    useEffect(()=> {
        const handlefetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/mypage`, {
                    params: {
                        posts: posts ? posts : 'written',
                    },
                    withCredentials: true,
                });
                console.log(response.data.result);
                setPostList(response.data.result.postList);
            } catch (error) {
            console.error(error);
            }
        };

        handlefetchPosts();
    }, [posts])

    /*
    const [hoveredRow, setHoveredRow] = useState(null)

    const handleMouseOver = (index) => {
        setHoveredRow(index);
    }

    const handleMouseOut = () => {
        setHoveredRow(null);
    }
    */

    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden";
        document.getElementById('header').style.zIndex = 0;
        window.scrollTo(0, 0);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "unset";
        document.getElementById('header').style.zIndex = 100;
    }

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

    const handleMenu = (menu) => {
        setActiveMenu(menu);
        searchParams.set('posts', menu);
        navigate(`?${searchParams.toString()}`);
    }

    const handleMorePost = () => {
        if(posts === 'voted') {
            navigate('/mypage/vote');
        } else if(posts === 'liked') {
            navigate('/mypage/liked');
        } else {
            navigate('/mypage/posting');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_mypage}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={1} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.mypage}>마이페이지</div>
                        <div className={styles.profile}>
                            <div className={styles.imagebox}>
                                <div className={styles.image}>
                                    <img src="/assets/images/profile2.png" alt="프로필" />
                                </div>
                                <div className={styles.namebox}>
                                    <div>로맨티스트</div>
                                    <span>정감자 님</span><img src="/assets/images/setting.png" alt="설정" onClick={openModal} />
                                </div>
                            </div>
                            <div className={styles.userinfo}>보유칭호 <span>3개</span></div>
                            <div className={styles.userinfo}>포인트 <span>7000점 (랭킹 : 3위)</span></div>
                            <div className={styles.userinfo}>끌어올리기 <span>14회</span></div>
                        </div>
                        <div className={styles.posting}>
                            <div className={styles.menu}>
                                <span onClick={() => handleMenu('written')} className={activeMenu === 'written' ? styles.active : styles.inactive}>작성한 글</span>
                                <span onClick={() => handleMenu('voted')} className={activeMenu === 'voted' ? styles.active : styles.inactive}>투표한 글</span>
                                <span onClick={() => handleMenu('liked')} className={activeMenu === 'liked' ? styles.active : styles.inactive}>좋아요한 글</span>
                            </div>
                            <table className={styles.post_container}>
                                <tbody>
                                {postList && postList.map((post, idx)=>
                                (
                                <tr className={styles.post_wrap} key={idx}>
                                    <td><PostList post={post}/></td>
                                </tr>
                                ))}
                                </tbody> 
                            </table>
                            <div className={styles.plus} onClick={handleMorePost}>더보기</div>
                        </div>
                    </div>
                    <Modal className={styles.modal} isOpen={modalIsOpen}>
                        <div className={styles.modalheader}>
                            <span>프로필 설정</span>
                        </div>
                        <div className={styles.modalbody}>
                            <div className={styles.profiletable}>
                                <div className={styles.profileImage}>
                                    <img src={profileImage} alt="프로필" />
                                </div>
                                <div className={styles.editprofile}>
                                    <div class={styles.filebox}>
                                        <label for="file">프로필 편집</label>
                                        <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                                    </div>
                                    <button onClick={() => setProfileImage('/assets/user.png')}>기본 프로필 설정</button>
                                </div>
                            </div>
                            <table className={styles.profiletable2}>
                                <colgroup>
                                    <col width="30%" />
                                    <col width="70%" />
                                </colgroup>
                                <tr>
                                    <td>닉네임</td>
                                    <td><input className={styles.nickname} value="패알못"></input></td>
                                </tr>
                                <tr>
                                    <td>칭호</td>
                                    <td><div className={styles.titlebox}>
                                        칭호 사용 <input className={styles.checkbox} type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                                        {isChecked && (
                                            <select className={styles.titleoption}>
                                                <option>새싹</option>
                                                <option>패셔니스타</option>
                                            </select>
                                        )}
                                    </div>
                                    </td>
                                </tr>
                            </table>

                            <div className={styles.buttonbox2}>
                                <button onClick={closeModal}>변경</button>
                                <button onClick={closeModal}>취소</button>
                            </div>
                        </div>
                    </Modal>
                </section>
            </div>
            <div className={styles.mobile_mypage}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={1} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.profile}>
                            <div className={styles.imagebox}>
                                <div className={styles.image}>
                                    <img src="/assets/images/profile2.png" alt="프로필" />
                                </div>
                                <div className={styles.namebox}>
                                    <div>
                                        <div className={styles.nickname}>로맨티스트</div>
                                        <button className={styles.changetitle}>변경</button>
                                    </div>
                                    <span>정감자 </span>님
                                </div>
                            </div>
                            <div className={styles.userinfo}>보유칭호 <span>3개</span></div>
                            <div className={styles.userinfo}>포인트 <span>7480점 (랭킹 : 5위)</span></div>
                        </div>
                        <div className={styles.posting}>
                            <div className={styles.menu}>
                                <span onClick={() => handleMenu('written')} className={activeMenu === 'written' ? styles.active : styles.inactive}>작성한 글</span>
                                <span onClick={() => handleMenu('voted')} className={activeMenu === 'voted' ? styles.active : styles.inactive}>투표한 글</span>
                                <span onClick={() => handleMenu('liked')} className={activeMenu === 'liked' ? styles.active : styles.inactive}>좋아요한 글</span>
                            </div>
                            <table className={styles.post_container}>
                                <tbody>
                                {postList && postList.map((post, idx)=>
                                (
                                <tr className={styles.post_wrap} key={idx}>
                                    <td><PostList post={post}/></td>
                                </tr>
                                ))}
                                </tbody> 
                            </table>
                            <div className={styles.plus} onClick={handleMorePost}>더보기</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Mypage;