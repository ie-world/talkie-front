import AIProfile from "../../../assets/images/AIProfile.svg?react";

const TodyBubble = () => {
  return (
    <div>
      <div className="w-full flex items-start mb-4">
        {/* 프로필 아이콘 */}
        <div className="mr-2">
          <AIProfile className="w-8 h-8" />
        </div>

        {/* 말풍선 */}
        <div className="flex-1">
          <div className="flex items-start mb-1">
            <span className="font-medium text-sm">토디</span>
          </div>
          <div className="bg-white w-[17.625rem] p-3 rounded-lg rounded-tl-none border border-[#ECEEF0]">
            <div className="text-[1rem] whitespace-pre-line">
              안녕하세요, 저는 OO님의 언어학습을 도와줄 토디입니다.{"\n"}
              지금부터 나오는 그림을 보고 발음해보세요.
            </div>
            <div className="w-[250px] h-[250px] mt-3 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center bg-white overflow-hidden">
              {/* 이미지 없을 때 기본 텍스트 */}
              <span className="text-gray-400">[그림 삽입 영역]</span>

              {/* 나중에 이미지가 있을 경우 아래처럼 렌더 */}
              {/* <img
    src="https://example.com/image.jpg"
    alt="그림"
    className="w-full h-full object-cover"
  /> */}
            </div>
          </div>

          {/* 듣기 버튼 */}
          <div className="flex items-center gap-1 mt-1">
            <button className="bg-[#EAF2FE] text-[#005EEB] text-[0.75rem] px-1.5 py-0.5 rounded-md">
              힌트
            </button>
            <div className="text-[#005EEB] text-[0.75rem]">
              그림을 선택하면 소리가 재생돼요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodyBubble;
