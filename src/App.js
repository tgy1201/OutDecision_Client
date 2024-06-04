import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Header from './component/header/header';
import Footer from './component/footer/Footer';
import Tabbar from './component/tabbar/Tabbar';
import FloatingBanner from './component/floatingBanner/FloatingBanner';
import PrivateRoute from './component/PrivateRoute';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import SocialSignup from './pages/signup/SocialSignup';
import SignupSuccess from './pages/signupSuccess/SignupSuccess';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import Write from './pages/write/Write';
import Edit from './pages/edit/Edit';
import View from './pages/view/View';
import Ourteam from './pages/ourteam/Ourteam';

import Mypage from './pages/mypage/Mypage';
import Infoedit from './pages/infoedit/Infoedit';
import Mypost from './pages/mypost/Mypost';
import Mytitle from './pages/mytitle/Mytitle';
import Ranking from './pages/ranking/Ranking';
import CheckMember from './pages/resetPassword/CheckMemeber';
import ResetPassword from './pages/resetPassword/ResetPassword';

function App() {
  const [category, setCategory] = useState('');
  const [memberId, setMemberId] = useState();
  const [isLogin, setIsLogin] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/loginSuccess`, {
            withCredentials: true,
        });
        if(response.data.isSuccess) {
          setIsLogin(true)
          sessionStorage.setItem('isLogin', true);
        } else {
          setIsLogin(false)
          sessionStorage.removeItem("isLogin");
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setIsLogin(false)
        sessionStorage.removeItem("isLogin");
      }
    }
    
    handleCheckLogin();
  }, [location]);

  return (
    <div className="App">
      <Header category={category} isLogin={isLogin}/>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkMember" element={<CheckMember setMemberId={setMemberId}/>}></Route>
          <Route path="/resetPassword/:email" element={<ResetPassword memberId={memberId}/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup/social" element={<SocialSignup />}></Route>
          <Route path="/signup/success" element={<SignupSuccess />}></Route>
          <Route path="/board/:bname" element={<Board setCategory={setCategory} />}></Route>
          <Route path="/board/:bname/view/:postId" element={<View setCategory={setCategory} />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
          <Route path="/ourteam" element={<Ourteam />}></Route>
          {/*로그인 후 사용가능한 페이지목록*/}
          <Route element={<PrivateRoute />}>
            <Route path="/write" element={<Write />}></Route>
            <Route path="/edit/:postId" element={<Edit />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/mypage/edit" element={<Infoedit />}></Route>
            <Route path='/mypage/posting' element={<Mypost active={3} />}></Route>
            <Route path='/mypage/vote' element={<Mypost active={4} />}></Route>
            <Route path='/mypage/liked' element={<Mypost active={5} />}></Route>
            <Route path="/mypage/mytitle" element={<Mytitle />}></Route>
          </Route>
        </Routes>
      </div>
      <Footer />
      <FloatingBanner />
      <Tabbar />
    </div>
  );
}

export default App;
