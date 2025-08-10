import React from "react";
import { useState } from "react";
import AIProfile from "../../../assets/images/AIProfile.svg?react";
import Typewriter from "typewriter-effect";

const typeLabel: Record<TodyBubbleProps["type"], string> = {
  picture: "그림",
  word: "단어",
  sentence: "문장",
};

interface TodyBubbleProps {
  text: string;
  imageUrl?: string;
  type: "picture" | "word" | "sentence";
  extraText?: string;
}

const TodyBubble = ({ text, imageUrl, type, extraText }: TodyBubbleProps) => {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div>
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
          <div className="bg-white w-[17.625rem] p-3 rounded-lg rounded-tl-none border border-[#ECEEF0]">
            <div className="text-[1rem] whitespace-pre-line mb-3">
              <Typewriter
                options={{
                  autoStart: true,
                  delay: 50,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  setTypingDone(false);
                  typewriter
                    .typeString(text)
                    .callFunction(() => setTypingDone(true))
                    .start();
                }}
              />
            </div>

            {typingDone && type === "picture" && imageUrl && (
              <div className="w-[250px] h-[250px]  border border-gray-300 rounded-lg flex justify-center items-center bg-white overflow-hidden">
                <img
                  src={imageUrl}
                  alt="학습 그림"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {typingDone &&
              (type === "word" || type === "sentence") &&
              extraText && (
                <div className="w-[15.625rem] h-[15.625rem] text-center flex justify-center items-center text-[1.5rem] font-semibold p-4 border border-[#E8FFD8] rounded-xl bg-[#F4FFEE]">
                  {extraText}
                </div>
              )}
          </div>

          <div className="flex items-center gap-1 mt-1">
            <button className="bg-[#EAF2FE] text-[#005EEB] text-[0.75rem] px-1.5 py-0.5 rounded-md">
              힌트
            </button>
            <div className="text-[#005EEB] text-[0.75rem]">
              {typeLabel[type]}을(를) 선택하면 소리가 재생돼요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodyBubble;
