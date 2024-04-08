import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/header/header';
import Main from './pages/main/Main';
import Tabbar from './component/tabbar/Tabbar';
import Login from './pages/login/Login';
import Footer from './component/footer/Footer';
import Board from './pages/board/Board';
import { useState } from 'react';
import Signup from './pages/signup/Signup';
import Mypage from './pages/mypage/Mypage';
import Ranking from './pages/ranking/Ranking';
import SocialSignup from './pages/signup/SocialSignup';
import SignupSuccess from './pages/signupSuccess/SignupSuccess';
import FloatingBanner from './component/floatingBanner/FloatingBanner';

function App() {
  const [category, setCategory] = useState('');

  return (
    <div className="App">
      <Header category={category}/>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup/social" element={<SocialSignup />}></Route>
          <Route path="/signup/success" element={<SignupSuccess />}></Route>
          <Route path='/mypage' element={<Mypage />}></Route>
          <Route path="/board/:bname" element={<Board setCategory={setCategory}/>}></Route>
          <Route path="/board/:bname/:type" element={<Board setCategory={setCategory}/>}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
        </Routes>
      </div>
      <Footer />
      <FloatingBanner />
      <Tabbar />
    </div>
  );
}

export default App;
