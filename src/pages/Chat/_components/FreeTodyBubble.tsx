import { useState } from "react";
import AIProfile from "../../../assets/images/AIProfile.svg?react";
import Typewriter from "typewriter-effect";

interface FreeTodyBubbleProps {
  text: string;
  buttons?: { id: string; text: string }[];
  onButtonClick?: (buttonText: string) => void;
}

const FreeTodyBubble = ({
  text,
  buttons,
  onButtonClick,
}: FreeTodyBubbleProps) => {
  // 클릭된 버튼 id 상태
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleClick = (id: string, text: string) => {
    setClickedId(id);
    if (onButtonClick) onButtonClick(text);
  };

  return (
    <div className="w-full flex items-start mb-4">
      {/* 프로필 아이콘 */}
      <div className="mr-2.5">
        <AIProfile />
      </div>

      {/* 말풍선 */}
      <div className="flex-1">
        <div className="flex items-start mb-1">
          <span className="font-medium text-sm">토디</span>
        </div>
        <div className="bg-white w-[17.625rem] p-3 rounded-3xl rounded-tl-none border border-[#ECEEF0]">
          <div className="text-[1rem] whitespace-pre-line mb-3">
            <Typewriter
              options={{
                strings: text,
                autoStart: true,
                delay: 50,
                cursor: "",
              }}
            />
          </div>
        </div>

        {/* 버튼 (말풍선 바로 아래, 말풍선 밖) */}
        {buttons && buttons.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 w-[17.625rem]">
            {buttons.map((btn) => {
              const isClicked = clickedId === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => handleClick(btn.id, btn.text)}
                  className={`w-full h-[2.75rem] px-3 py-1 rounded-full border ${
                    isClicked
                      ? "bg-[#EAF2FE] border-[#1A75FF] text-[#1A75FF]"
                      : "bg-[#FFFFFF] border-[#D3D5D7] text-black"
                  }`}
                >
                  {btn.text}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeTodyBubble;
