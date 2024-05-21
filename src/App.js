import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './component/header/header';
import Footer from './component/footer/Footer';
import Tabbar from './component/tabbar/Tabbar';
import FloatingBanner from './component/floatingBanner/FloatingBanner';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import SocialSignup from './pages/signup/SocialSignup';
import Main from './pages/main/Main';
import Board from './pages/board/Board';

import Mypage from './pages/mypage/Mypage';
import Infoedit from "./component/infoedit/Infoedit";
import Mypost from './pages/mypost/Mypost';
import Mytitle from "./component/mytitle/Mytitle";
import Ranking from './pages/ranking/Ranking';

import Write from './pages/write/Write';
import View from './pages/view/View';
import Ourteam from './pages/ourteam/Ourteam';


function App() {
  const [category, setCategory] = useState('');

  return (
    <div className="App">
      <Header category={category} />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup/social" element={<SocialSignup />}></Route>
          <Route path="/signup/success" element={<SignupSuccess />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/mypage/edit" element={<Infoedit />}></Route>
          <Route path='/mypage/posting' element={<Mypost active={3}/>}></Route>
          <Route path='/mypage/vote' element={<Mypost active={4}/>}></Route>
          <Route path='/mypage/liked' element={<Mypost active={5}/>}></Route>
          <Route path="/mypage/mytitle" element={<Mytitle />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/board/:bname" element={<Board setCategory={setCategory} />}></Route>
          <Route path="/board/:bname/view/:postId" element={<View setCategory={setCategory} />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
          <Route path="/ourteam" element={<Ourteam />}></Route>
        </Routes>
      </div>
      <Footer />
      <FloatingBanner />
      <Tabbar />
    </div>
  );
}

export default App;
