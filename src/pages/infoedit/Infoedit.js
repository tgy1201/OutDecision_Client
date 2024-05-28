import React, { useState } from "react";
import styles from './infoedit.module.css';
import { useNavigate } from "react-router-dom";
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import Modal from 'react-modal';

function Infoedit() {

    const navigate = useNavigate();
    const [name, setName] = useState("홍길동");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden";
        document.getElementById('header').style.zIndex = 0; // 헤더가 뒤로 안감
        window.scrollTo(0, 0);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "unset";
        document.getElementById('header').style.zIndex = 100;
    }

    const handleSubmit = () => {
        navigate('/mypage');
    }


    return (
        <div className={styles.container}>
            <div className={styles.pc_infoedit}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={2} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.edit}>회원정보</div>

                        <div className={styles.editform}>
                            <div className={styles.required}><span>*</span> 필수</div>
                            <table className={styles.edittable}>
                                <colgroup>
                                    <col width="30%" />
                                    <col width="70%" />
                                </colgroup>
                                <tr>
                                    <td>프로필사진</td>
                                    <td className={styles.imagebox}>
                                        <div className={styles.image}>
                                            <img src="/assets/images/profile2.png" alt="프로필" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이름 <span>*</span></td>
                                    <td><input value={name} onChange={handleNameChange} style={{ width: "80px" }}></input></td>
                                </tr>
                                <tr>
                                    <td>닉네임 <span>*</span></td>
                                    <td><input value="패알못"></input></td>
                                </tr>
                                <tr>
                                    <td>이메일 <span>*</span></td>
                                    <td>aaa@naver.com</td>
                                </tr>
                                <tr>
                                    <td>비밀번호 <span>*</span></td>
                                    <td><button onClick={openModal}>비밀번호 변경</button></td>
                                </tr>
                                <tr>
                                    <td>휴대폰번호 <span>*</span></td>
                                    <td><input value="010-3333-8888"></input></td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </section>
            </div>
            <div className={styles.mobile_infoedit}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={2} />
                </section>
                <section className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.edit}>회원정보</div>

                        <div className={styles.editform}>
                            <div className={styles.required}><span>*</span> 필수</div>
                            <table className={styles.edittable}>
                                <colgroup>
                                    <col width="30%" />
                                    <col width="70%" />
                                </colgroup>
                                <tr>
                                    <td>프로필사진</td>
                                    <td className={styles.imagebox}>
                                        <div className={styles.image}>
                                            <img src="/assets/images/profile2.png" alt="프로필" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이름 <span>*</span></td>
                                    <td><input value={name} onChange={handleNameChange} style={{ width: "80px" }}></input></td>
                                </tr>
                                <tr>
                                    <td>닉네임 <span>*</span></td>
                                    <td><input value="패알못"></input></td>
                                </tr>
                                <tr>
                                    <td>이메일 <span>*</span></td>
                                    <td>aaa@naver.com</td>
                                </tr>
                                <tr>
                                    <td>비밀번호 <span>*</span></td>
                                    <td><button onClick={openModal}>비밀번호 변경</button></td>
                                </tr>
                                <tr>
                                    <td>휴대폰번호 <span>*</span></td>
                                    <td><input value="010-3333-8888"></input></td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className={styles.buttonbox}>
                        <button onClick={handleSubmit}>수정</button>
                        <button onClick={() => navigate('/mypage')}>취소</button>
                    </div>


                </section>
            </div>
            <Modal className={styles.modal} isOpen={modalIsOpen}>
                <div className={styles.modalheader}>
                    <span>비밀번호 변경</span>
                </div>
                <div className={styles.modalbody}>
                    <table className={styles.passwordtable}>
                        <colgroup>
                            <col width="40%" />
                            <col width="60%" />
                        </colgroup>
                        <tr>
                            <td>현재 비밀번호</td>
                            <td><input type="password" /></td>
                        </tr>
                        <tr>
                            <td>새 비밀번호</td>
                            <td><input></input></td>
                        </tr>
                        <tr>
                            <td>새 비밀번호 확인</td>
                            <td><input></input></td>
                        </tr>
                    </table>

                    <div className={styles.buttonbox2}>
                        <button onClick={closeModal}>변경</button>
                        <button onClick={closeModal}>취소</button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Infoedit;