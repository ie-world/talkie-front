import TalkieIcon from "../../assets/images/TalkieIcon.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyInput from "../../components/Input/KeyInput";
import Eye from "../../assets/images/Eye.svg?react";
import EyeOff from "../../assets/images/EyeOff.svg?react";
import ArrowGrey from "../../assets/images/ArrowGrey.svg?react";

const SigninPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // 이미 사용 중인 아이디 예시
  const usedIds = ["test123", "user01"];

  // 아이디 유효성 검사
  const idValid = /^[A-Za-z0-9]{4,15}$/.test(id);
  const isIdUsed = usedIds.includes(id);

  // 비밀번호 유효성 검사
  const passwordValid = (() => {
    if (password.length < 8 || password.length > 15) return false;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    return count >= 2;
  })();

  // 버튼 활성화 조건
  const canSubmit =
    idValid && !isIdUsed && passwordValid && checked1 && checked2;

  // 페이지 이동 훅
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full py-20 px-4 max-w-md mx-auto">
      {/* 로고 */}
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <TalkieIcon className="w-[8.875rem] h-[3.25rem]" />
        <span className="text-[#242628] text-xl font-semibold">
          토키 회원가입
        </span>
      </div>

      <div className="flex gap-1 justify-end">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4242]" />
        <span className="text-[#A1A3A5] text-[0.875rem]">필수 입력 항목</span>
      </div>

      {/* 아이디 입력 */}
      <div className="mb-6">
        <div className="flex gap-2 items-center mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4242]" />
          <label className="leading-none text-[1rem] font-medium text-[#56585A]">
            아이디
          </label>
        </div>
        <KeyInput
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          hasError={id !== "" && (!idValid || isIdUsed)}
        />
        {id && !idValid && (
          <p className="text-xs text-red-500 mt-1">
            영문과 숫자를 포함해 4~15자로 입력해주세요.
          </p>
        )}
        {id && idValid && isIdUsed && (
          <p className="text-xs text-red-500 mt-1">
            이미 사용 중인 아이디입니다.
          </p>
        )}
        {id && idValid && !isIdUsed && (
          <p className="text-xs text-[#1A75FF] mt-1">사용 가능합니다.</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex gap-2 items-center mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4242]" />
        <label className="leading-none text-[1rem] font-medium text-[#56585A]">
          비밀번호
        </label>
      </div>
      <div className="relative mb-2">
        <KeyInput
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          hasError={password !== "" && !passwordValid}
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
      {password && !passwordValid && (
        <p className="text-xs text-red-500 mb-6">
          영문, 숫자, 특수문자 중 2가지 이상 조합 8~15자로 입력해주세요.
        </p>
      )}
      {password && passwordValid && (
        <p className="text-xs text-[#1A75FF] mb-6">사용 가능합니다.</p>
      )}

      {/* 체크박스 2개 */}
      <div className="flex flex-col gap-4 mb-6 mt-6">
        <label className="flex items-center gap-2 text-sm text-[#56585A] select-none cursor-pointer">
          <input
            type="checkbox"
            checked={checked1}
            onChange={() => setChecked1((prev) => !prev)}
            className="w-4 h-4"
          />
          <span>(필수) 이용약관 동의</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // 체크박스 라벨 클릭 이벤트 방해 방지
              window.open(
                "https://www.notion.so/2499e4b6a8bf8061a485d9e56b71c348",
                "_blank"
              );
            }}
            className="ml-auto"
            aria-label="서비스 이용약관 링크 열기"
          >
            <ArrowGrey className="w-4 h-4 cursor-pointer hover:text-[#1A75FF]" />
          </button>
        </label>

        <label className="flex items-center gap-2 text-sm text-[#56585A] select-none cursor-pointer">
          <input
            type="checkbox"
            checked={checked2}
            onChange={() => setChecked2((prev) => !prev)}
            className="w-4 h-4"
          />
          <span>(필수) 개인정보 수집 및 이용 동의</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://www.notion.so/2499e4b6a8bf80fa8192e573f3c3633a",
                "_blank"
              );
            }}
            className="ml-auto"
            aria-label="개인정보 처리방침 링크 열기"
          >
            <ArrowGrey className="w-4 h-4 cursor-pointer hover:text-[#1A75FF]" />
          </button>
        </label>
      </div>
      {/* 회원가입 버튼 */}
      <button
        onClick={() => {
          if (canSubmit) {
            alert("회원가입 완료!");
            navigate("/login"); // 로그인 페이지로 이동
          }
        }}
        disabled={!canSubmit}
        className={`w-full py-3 rounded-xl mb-4 mt-12 font-semibold text-white ${
          canSubmit ? "bg-[#1A75FF]" : "bg-[#A1A3A5] cursor-not-allowed"
        }`}
      >
        회원가입
      </button>
    </div>
  );
};

export default SigninPage;
