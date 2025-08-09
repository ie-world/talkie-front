import { useState } from "react";
import KeyInput from "../../../components/Input/KeyInput";
import Eye from "../../../assets/images/Eye.svg?react";
import EyeOff from "../../../assets/images/EyeOff.svg?react";

interface PasswordInputProps {
  password: string;
  setPassword: (pw: string) => void;
}

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordValid = (() => {
    if (password.length < 8 || password.length > 15) return false;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    return count >= 2;
  })();

  return (
    <>
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
    </>
  );
};

export default PasswordInput;
