import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SigninPage from "./pages/Signin";
import MyPage from "./pages/My";
import ChatPage from "./pages/Chat/ChatPage";
import FreeChatPage from "./pages/Chat/FreeChatPage";
import SplashPage from "./pages/SplashPage";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3초 후 스플래시 해제

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 루트 접속 시 로그인으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chat/:type" element={<ChatPage />} />
          <Route path="/freechat" element={<FreeChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
