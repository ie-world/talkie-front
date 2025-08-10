import TalkieIcon from "../../assets/images/TalkieIcon.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IdInput from "./_components/IdInput";
import PasswordInput from "./_components/PasswordInput";
import AgreementCheckboxes from "./_components/AgreementCheckboxes";

const SigninPage = () => {
  const [id, setId] = useState("");
  const [isIdUsed, setIsIdUsed] = useState(false);
  const [password, setPassword] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const idValid = /^[A-Za-z0-9]{4,15}$/.test(id);

  const passwordValid = (() => {
    if (password.length < 8 || password.length > 15) return false;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    return count >= 2;
  })();

  const canSubmit =
    idValid && !isIdUsed && passwordValid && checked1 && checked2;

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!canSubmit) return;
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-full py-20 px-4 max-w-md mx-auto">
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

      <IdInput
        id={id}
        setId={setId}
        isIdUsed={isIdUsed}
        setIsIdUsed={setIsIdUsed}
      />
      <PasswordInput password={password} setPassword={setPassword} />
      <AgreementCheckboxes
        checked1={checked1}
        setChecked1={setChecked1}
        checked2={checked2}
        setChecked2={setChecked2}
      />

      <button
        onClick={handleSignup}
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
