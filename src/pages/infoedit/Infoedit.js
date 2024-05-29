import React, { useState, useEffect } from "react";
import styles from './infoedit.module.css';
import { useNavigate, useParams } from "react-router-dom";
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import Modal from 'react-modal';
import axios from "axios";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Infoedit() {

    const navigate = useNavigate();
    const { memberId } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        nickname: "",
        phone: ""
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get(`/mypage/${memberId}/edit`);
                if (response.data.isSuccess) {
                    const { name, email, nickname } = response.data.result;
                    setFormData({ name, email, nickname });
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching member info:", error);
                console.error("개인정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchMemberInfo();
    }, [memberId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/mypage/${memberId}`, formData);
            if (response.data.isSuccess) {
                navigate('/mypage');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating member info:", error);
            console.error("개인정보를 수정하는 데 실패했습니다.");
        }
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
                                    <td>{formData.email}</td>
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
                        <div className={styles.editwrap}>
                            <div className={styles.edit}>회원정보</div>
                            <div className={styles.required}><span>*</span> 필수</div>
                        </div>
                        <div className={styles.editform}>
                            <table className={styles.edittable}>
                                <colgroup>
                                    <col width="30%" />
                                    <col width="70%" />
                                </colgroup>
                                <tr>
                                    <td>프로필 사진</td>
                                    <td className="imagebox">
                                        <div className="image">
                                            <img src="/assets/images/profile2.png" alt="프로필" />
                                        </div>
                                        <div className="buttons">
                                            <button>등록</button>
                                            <button>삭제</button>
                                        </div>
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
                                    <td>{formData.email}</td>
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