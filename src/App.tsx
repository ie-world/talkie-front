import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SigninPage from "./pages/Signin";
import MyPage from "./pages/My";
import ChatPage from "./pages/Chat/ChatPage";
import FreeChatPage from "./pages/Chat/FreeChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 루트 경로 접속 시 /login으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/freechat" element={<FreeChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
