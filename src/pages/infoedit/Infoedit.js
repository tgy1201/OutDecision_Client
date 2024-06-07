import React, { useState, useEffect } from "react";
import styles from './infoedit.module.css';
import { useNavigate } from "react-router-dom";
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import axios from "axios";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Infoedit() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        memberId: "",
        name: "",
        email: "",
        nickname: "",
        socialType: "",
        userImg: ""
    });
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/mypage/edit`, {
                    withCredentials: true
                });
                if (response.data.isSuccess) {
                    const { memberId, name, email, nickname, socialType, userImg } = response.data.result;
                    setFormData({ memberId, name, email, nickname, socialType, userImg });
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching member info:", error);
                console.error("개인정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchMemberInfo();
    }, []);

    const handleImageUpload = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("No file selected");
            return;
        }

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("userImg", file);

        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_IP}/mypage/edit/profile`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.data.isSuccess) {
                // 이미지 경로 업데이트
                setFormData(prevData => ({
                    ...prevData,
                    userImg: response.data.result
                }));
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    }

    const handleDeleteProfile = async () => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_IP}/mypage/delete/profile`, {
                newImg: "profile.png"
            }, {
                withCredentials: true
            });
            if (response.data.isSuccess) {
                setFormData(prevData => ({
                    ...prevData,
                    userImg: "/assets/images/profile.png"
                }));
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_IP}/mypage/edit`, formData, {
                withCredentials: true
            });
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

    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setPasswordError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_IP}/mypage/edit/password`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmNewPassword: passwordData.confirmNewPassword
            }, {
                withCredentials: true
            });
            if (response.data.isSuccess) {
                closePasswordModal();
                setPasswordError("");
            } else {
                setPasswordError(response.data.message);
                console.error(response.data.message);
            }
        } catch (error) {
            setPasswordError("비밀번호를 변경하는 데 실패했습니다.");
            console.error("Error updating password:", error);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/user/revoke`, {
                withCredentials: true
            });

            if (response.data.isSuccess) {
                alert('회원탈퇴가 완료되었습니다.');
                // 로그아웃 처리 등
                navigate('/');
            } else {
                alert(`회원탈퇴 실패: ${response.data.message}`);
            }
        } catch (error) {
            console.error('회원탈퇴 에러:', error);
            alert('회원탈퇴 중 오류가 발생했습니다.');
        } finally {
            closeDeleteModal();  // 모달을 닫기
        }
    };

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
        disableBodyScroll(document);
    }

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
        enableBodyScroll(document);
    }

    const openPasswordModal = () => {
        setPasswordModalIsOpen(true);
        disableBodyScroll(document);
    }

    const closePasswordModal = () => {
        setPasswordModalIsOpen(false);
        enableBodyScroll(document);
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_infoedit}>
                <section className={styles.sidebar_wrap}>
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
                                    <td>프로필사진</td>
                                    <td className={styles.imagebox}>
                                        <div className={styles.image}>
                                            <img src={formData.userImg} alt="프로필" />
                                        </div>
                                        <div className={styles.filecontainer}>
                                            <div className={styles.filebox}>
                                                <label htmlFor="file">변경</label>
                                                <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                                            </div>
                                            {formData.userImg !== '/assets/images/profile.png' && (
                                                <div className={styles.filebox2}>
                                                    <button onClick={handleDeleteProfile}>삭제</button>
                                                </div>
                                            )}
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
                                    <td><button onClick={openPasswordModal}>비밀번호 변경</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className={styles.buttonbox}>
                        <button onClick={handleSubmit}>수정</button>
                        <button onClick={() => navigate('/mypage')}>취소</button>
                    </div>

                    <div className={styles.deletebox}>
                        <button onClick={openDeleteModal}>회원탈퇴</button>
                    </div>
                </section>
                {passwordModalIsOpen && (
                    <div>
                        <div className={styles.pwdmodal}>
                            <div className={styles.modalheader}>
                                <span>비밀번호 변경</span>
                            </div>
                            <div className={styles.modalbody}>
                                <table className={styles.passwordtable}>
                                    <colgroup>
                                        <col width="40%" />
                                        <col width="60%" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>현재 비밀번호</td>
                                            <td><input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>새 비밀번호</td>
                                            <td><input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>새 비밀번호 확인</td>
                                            <td><input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {passwordError && <div className={styles.error}>{passwordError}</div>}

                                <div className={styles.buttonbox2}>
                                    <button onClick={handlePasswordSubmit}>변경</button>
                                    <button onClick={closePasswordModal}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {deleteModalIsOpen && (
                    <div>
                        <div className={styles.deletemodal}>
                            <p>정말 탈퇴하시겠습니까?</p>
                            <button onClick={handleDeleteAccount}>네</button>
                            <button onClick={closeDeleteModal}>아니오</button>
                        </div>
                    </div>
                )}
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
                                <tr>
                                    <td>프로필 사진</td>
                                    <td className={styles.imagebox}>
                                        <div className={styles.image}>
                                            <img src={formData.userImg} alt="프로필" />
                                        </div>
                                        <div className={styles.filecontainer}>
                                            <div className={styles.filebox}>
                                                <label htmlFor="file">변경</label>
                                                <input id="file" type="file" onChange={(e) => handleImageUpload(e)} accept=".png,.jpg" />
                                            </div>
                                            {formData.userImg !== '/assets/images/profile.png' && (
                                                <div className={styles.filebox2}>
                                                    <button onClick={handleDeleteProfile}>삭제</button>
                                                </div>
                                            )}
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
                                    <td>이메일</td>
                                    <td>{formData.email}</td>
                                </tr>
                                <tr>
                                    <td>비밀번호 <span>*</span></td>
                                    <td><button onClick={openPasswordModal}>비밀번호 변경</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={styles.buttonbox}>
                        <button onClick={handleSubmit}>수정</button>
                        <button onClick={() => navigate('/mypage')}>취소</button>
                    </div>
                    <div className={styles.deletebox}>
                        <button onClick={openDeleteModal}>회원탈퇴</button>
                    </div>
                </section>
                {passwordModalIsOpen && (
                    <div>
                        <div className={styles.pwdmodal}>
                            <div className={styles.modalheader}>
                                <span>비밀번호 변경</span>
                            </div>
                            <div className={styles.modalbody}>
                                <table className={styles.passwordtable}>
                                    <colgroup>
                                        <col width="40%" />
                                        <col width="60%" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>현재 비밀번호</td>
                                            <td><input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>새 비밀번호</td>
                                            <td><input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>새 비밀번호 확인</td>
                                            <td><input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {passwordError && <div className={styles.error}>{passwordError}</div>}

                                <div className={styles.buttonbox2}>
                                    <button onClick={handlePasswordSubmit}>변경</button>
                                    <button onClick={closePasswordModal}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {deleteModalIsOpen && (
                    <div>
                        <div className={styles.deletemodal}>
                            <p>정말 탈퇴하시겠습니까?</p>
                            <button onClick={handleDeleteAccount}>네</button>
                            <button onClick={closeDeleteModal}>아니오</button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default Infoedit;