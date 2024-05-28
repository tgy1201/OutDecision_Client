import React, { useState, useEffect } from "react";
import styles from './infoedit.module.css';
import { useNavigate } from "react-router-dom";
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import Modal from 'react-modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Infoedit() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        nickname: "",
        phone: ""
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // 여기서 memberId에 해당하는 회원 정보를 불러오는 API 호출
        // fetchMemberInfo(memberId)
        //     .then((data) => {
        //         setFormData(data);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching member info:", error);
        //     });

        // 임시로 데이터 설정
        setFormData({
            name: "신짱구",
            nickname: "짱구는 못말려",
            phone: "010-2222-2222"
        });
    }, []); // memberId를 의존성 배열에 추가해야 함

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        // 여기서 memberId에 해당하는 회원 정보를 수정하는 API 호출
        // updateMemberInfo(memberId, formData)
        //     .then((response) => {
        //         console.log(response);
        //         navigate('/mypage');
        //     })
        //     .catch((error) => {
        //         console.error("Error updating member info:", error);
        //     });

        // 임시로 수정 성공 시 바로 이동
        navigate('/mypage');
    }

    const openModal = () => {
        setModalIsOpen(true);
        disableBodyScroll();
    }

    const closeModal = () => {
        setModalIsOpen(false);
        enableBodyScroll();
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
                                    <button>등록</button>
                                    <button>삭제</button>
                                </tr>
                                <tr>
                                    <td>이름 <span>*</span></td>
                                    <td><input name="name" value={formData.name} onChange={handleInputChange} style={{ width: "80px" }}></input></td>
                                </tr>
                                <tr>
                                    <td>닉네임 <span>*</span></td>
                                    <td><input name="nickname" value={formData.nickname} onChange={handleInputChange}></input></td>
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
                                    <td><input name="phone" value={formData.phone} onChange={handleInputChange}></input></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className={styles.buttonbox}>
                        <button onClick={handleSubmit}>수정</button>
                        <button onClick={() => navigate('/mypage')}>취소</button>
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
                                        <button>등록</button>
                                        <button>삭제</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이름 <span>*</span></td>
                                    <td><input name="name" value={formData.name} onChange={handleInputChange} style={{ width: "80px" }}></input></td>
                                </tr>
                                <tr>
                                    <td>닉네임 <span>*</span></td>
                                    <td><input name="nickname" value={formData.nickname} onChange={handleInputChange}></input></td>
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
                                    <td><input name="phone" value={formData.phone} onChange={handleInputChange}></input></td>
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