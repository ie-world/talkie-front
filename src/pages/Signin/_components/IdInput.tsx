import { useEffect, useState } from "react";
import KeyInput from "../../../components/Input/KeyInput";
import axiosInstance from "../../../apis/axios";

interface IdInputProps {
  id: string;
  setId: (id: string) => void;
  isIdUsed: boolean;
  setIsIdUsed: (used: boolean) => void;
}

const IdInput = ({ id, setId, isIdUsed, setIsIdUsed }: IdInputProps) => {
  const idValid = /^[A-Za-z0-9]{4,15}$/.test(id);

  useEffect(() => {
    if (!idValid) {
      setIsIdUsed(false);
      return;
    }

    const timer = setTimeout(() => {
      axiosInstance
        .get(`/api/auth/check-username`, { params: { username: id } })
        .then((res) => setIsIdUsed(res.data.isDuplicate))
        .catch(() => setIsIdUsed(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [id, idValid, setIsIdUsed]);

  return (
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
  );
};

export default IdInput;
