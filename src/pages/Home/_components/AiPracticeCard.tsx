import ArrowWhite from "../../../assets/images/ArrowWhite.svg?react";
import Apple from "../../../assets/images/Apple.svg?react";
import PictureBubble from "../../../assets/images/PictureBubble.svg?react";
import WordBubble from "../../../assets/images/WordBubble.svg?react";
import SentenceBubble from "../../../assets/images/SentenceBubble.svg?react";
import AIProfile from "../../../assets/images/AIProfile.svg?react";
import { useNavigate } from "react-router-dom";

const typeMap: Record<
  "그림" | "단어" | "문장",
  "picture" | "word" | "sentence"
> = {
  그림: "picture",
  단어: "word",
  문장: "sentence",
};

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
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // ChatPage로 이동하면서 type 매핑
    navigate(`/chat/${typeMap[type]}`);
  };
  // type에 따른 버블, 메인 이미지 선택
  const renderBubble = () => {
    if (type === "그림") return <PictureBubble />;
    if (type === "단어") return <WordBubble />;
    if (type === "문장") return <SentenceBubble />;
    return null;
  };

  const renderMainImage = () => {
    if (type === "그림") return <Apple />;
    return <AIProfile className="w-[4.5rem] h-[4.5rem]" />;
  };

  return (
    <div className="w-full mb-6 mt-4 bg-[linear-gradient(180deg,_#E8FFD8_-31.79%,_#FFFFFF_157.72%)] rounded-lg text-center border border-[#E8FFD8] py-8 relative">
      {/* 상단 버블 */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        {renderBubble()}
      </div>

      {/* 메인 이미지 */}
      <div className="mb-3 flex flex-col items-center justify-center">
        {renderMainImage()}
      </div>

      <div className="text-[1rem] text-[#1A75FF] border border-[#1A75FF] rounded-full px-4 py-1 inline-block mb-3">
        AI가 추천하는 오늘의 연습
      </div>

      <div className="flex justify-center items-center">
        <div className="text-[1rem] font-medium text-[#56585A] flex items-center">
          {type} 말하기
          <span
            className={`ml-3 text-[0.75rem] inline-flex items-center h-[1.375rem] px-1.5 py-0.5 rounded-md font-regular ${
              progress === 0
                ? "bg-[#F6F8FA] text-[#3D3D3D]"
                : "bg-[#FEE6C6] text-[#FF9200]"
            }`}
          >
            {progress}%
          </span>
        </div>
      </div>

      <div className="px-[4.469rem] mt-3">
        <button
          onClick={handleClick}
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
