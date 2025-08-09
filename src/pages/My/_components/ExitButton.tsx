import ArrowGrey from "../../../assets/images/ArrowGrey.svg?react";

const ExitButton = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <span className="text-[#A1A3A5] text-[0.75rem]">탈퇴하기</span>
      <ArrowGrey className="w-4 h-4" />
    </div>
  );
};

export default ExitButton;
