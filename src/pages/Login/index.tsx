import TalkieIcon from "../../assets/images/TalkieIcon.svg?react";
import KeyInput from "../../components/Input/KeyInput";
import Eye from "../../assets/images/Eye.svg?react";
import EyeOff from "../../assets/images/EyeOff.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../apis/axios";
import Storage from "../../utils/storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    // 에러 초기화
    setIdError("");
    setPasswordError("");

    let hasError = false;

    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
      hasError = true;
    }
    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username: id,
        password: password,
      });

      const token = response.data.token;
      if (token) {
        Storage.setAccessToken(token);
        alert("로그인 성공!");
        navigate("/home");
      } else {
        alert("로그인에 실패했습니다. 토큰이 없습니다.");
      }
    } catch (error) {
      console.log("로그인 실패:", error);
    }
  };

  return (
    <div className="flex flex-col w-full py-20 px-4 max-w-md mx-auto">
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <TalkieIcon className="w-[8.875rem] h-[3.25rem]" />
        <span className="text-[#242628] text-xl font-semibold">
          토키 로그인
        </span>
      </div>

      <div className="mb-1">
        <label className="text-[1rem] font-medium text-[#56585A]">아이디</label>
        <KeyInput
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {idError && <p className="text-red-600 text-sm mt-1">{idError}</p>}
      </div>

      <label className="mb-1 text-[1rem] font-medium text-[#56585A]">
        비밀번호
      </label>
      <div className="relative mb-1">
        <KeyInput
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-4 -translate-y-1/2"
        >
          {showPassword ? (
            <Eye className="w-5 h-5 text-[#7F7F7F]" />
          ) : (
            <EyeOff className="w-5 h-5 text-[#7F7F7F]" />
          )}
        </button>
      </div>
      {passwordError && (
        <p className="text-red-600 text-sm mb-6">{passwordError}</p>
      )}

      <button
        onClick={handleLogin}
        className="w-full bg-[#1A75FF] text-white py-3 rounded-xl mb-4 mt-12 font-semibold"
      >
        로그인
      </button>

      <div className="flex gap-6 justify-center">
        <span className="text-[#242628] text-[0.875rem]">
          아직 회원이 아니신가요?
        </span>
        <button
          onClick={() => navigate("/signin")}
          className="text-[#1A75FF] text-[0.875rem]"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
