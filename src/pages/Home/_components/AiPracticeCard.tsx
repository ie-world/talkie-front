import ArrowWhite from "../../../assets/images/ArrowWhite.svg?react";
import Apple from "../../../assets/images/Apple.svg?react";

interface AiPracticeCardProps {
  type: "그림" | "단어" | "문장";
  progress: number;
  buttonText: "시작하기" | "진행하기";
  onClick: () => void;
}

const AiPracticeCard: React.FC<AiPracticeCardProps> = ({
  type,
  progress,
  buttonText,
  onClick,
}) => {
  return (
    <div className="w-full mb-6 bg-[linear-gradient(180deg,_#E8FFD8_-31.79%,_#FFFFFF_157.72%)] rounded-lg text-center border border-[#E8FFD8] py-8">
      <div className="mb-3 flex items-center justify-center">
        <Apple />
      </div>

      <div className="text-[1rem] text-[#1A75FF] border border-[#1A75FF] rounded-full px-4 py-1 inline-block mb-3">
        AI가 추천하는 오늘의 연습
      </div>

      <div className="flex justify-center items-center">
        <div className="text-[1rem] font-medium text-[#56585A] flex items-center">
          {type} 말하기
          <span className="ml-3 inline-flex items-center h-[1.375rem] bg-[#F6F8FA] text-[0.75rem] text-[#3D3D3D] px-1.5 py-0.5 rounded-md font-regular">
            {progress}%
          </span>
        </div>
      </div>

      <div className="px-[4.469rem] mt-3">
        <button
          onClick={onClick}
          className="flex justify-center items-center w-full bg-[#1A75FF] text-white font-light py-2 px-4 rounded-xl"
        >
          {buttonText}
          <ArrowWhite className="ml-3" />
        </button>
      </div>
    </div>
  );
};

export default AiPracticeCard;
