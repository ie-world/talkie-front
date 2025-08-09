import TalkieIcon from "../../assets/images/TalkieIcon.svg?react";
import KeyInput from "../../components/Input/KeyInput";
import Eye from "../../assets/images/Eye.svg?react";
import EyeOff from "../../assets/images/EyeOff.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 에러 상태 추가
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // (예시) 실제 로그인 로직 대신 더미 아이디, 비밀번호 조건 사용
  const dummyId = "testuser";
  const dummyPassword = "1234";

  const handleLogin = () => {
    let hasError = false;

    // 아이디 검증
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
      hasError = true;
    } else if (id !== dummyId) {
      setIdError("아이디를 찾을 수 없습니다.");
      hasError = true;
    } else {
      setIdError("");
    }

    // 비밀번호 검증 (아이디가 맞을 때만 비밀번호 체크)
    if (!hasError) {
      if (password.trim() === "") {
        setPasswordError("비밀번호를 입력해주세요.");
        hasError = true;
      } else if (password !== dummyPassword) {
        setPasswordError("비밀번호를 다시 확인해주세요.");
        hasError = true;
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }

    // 오류 없으면 로그인 처리 (여기서는 단순히 alert)
    if (!hasError) {
      alert("로그인 성공!");
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col w-full py-20 px-4 max-w-md mx-auto">
      {/* 로고 */}
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <TalkieIcon className="w-[8.875rem] h-[3.25rem]" />
        <span className="text-[#242628] text-xl font-semibold">
          토키 로그인
        </span>
      </div>

      {/* 아이디 입력 */}
      <div className="mb-1">
        <label className="text-[1rem] font-medium text-[#56585A]">아이디</label>
        <KeyInput
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {idError && <p className="text-red-600 text-sm mt-1">{idError}</p>}
      </div>

      {/* 비밀번호 입력 */}
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

      {/* 로그인 버튼 */}
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
