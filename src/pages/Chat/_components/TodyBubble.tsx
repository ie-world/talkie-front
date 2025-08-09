import AIProfile from "../../../assets/images/AIProfile.svg?react";
import Typewriter from "typewriter-effect";

interface TodyBubbleProps {
  text: string;
  imageUrl?: string;
  type: "picture" | "word" | "sentence";
}

const typeLabel: Record<TodyBubbleProps["type"], string> = {
  picture: "그림",
  word: "단어",
  sentence: "문장",
};

const TodyBubble = ({ text, imageUrl, type }: TodyBubbleProps) => {
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
                  strings: text,
                  autoStart: true,
                  delay: 50, // 타이핑 속도
                  cursor: "", // 커서 제거하고 싶으면 빈 문자열
                }}
              />
            </div>

            {/* type별 렌더링 */}
            {type === "picture" && (
              <div className="w-[250px] h-[250px] border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center bg-white overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="학습 그림"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">[그림 삽입 영역]</span>
                )}
              </div>
            )}

            {type === "word" && (
              <div className="text-center text-lg font-semibold p-4 border rounded-md bg-[#F0F5FF]">
                {text}
              </div>
            )}

            {type === "sentence" && (
              <div className="text-[0.9rem] italic p-2 border-l-4 border-[#005EEB] bg-[#EAF2FE]">
                {text}
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
