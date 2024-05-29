import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
const state = sessionStorage.isLogin;

  if (state === 'true') {
    // 인증이 반드시 필요한 페이지
    console.log(sessionStorage.isLogin)
    return <Outlet />;
  } else {
    // Alert를 표시하고 메인 페이지로 이동
    alert("로그인 후 이용 가능합니다.");
    return <Navigate replace to="/login" />;
  }

}