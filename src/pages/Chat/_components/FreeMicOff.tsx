import Mic from "../../../assets/images/Mic.svg?react";
import MicBubble from "../../../assets/images/MicBubble.svg?react";

const FreeMicOff = () => {
  return (
    <div className="absolute bottom-0 right-0 w-full px-4 pb-4 flex items-start justify-between">
      {/* 왼쪽: 버블 + 마이크 세로 정렬 */}
      <div className="flex flex-col items-center">
        <p className="text-sm text-[#1D4ED8] font-semibold mb-1 animate-bounce">
          <MicBubble />
        </p>
        <button>
          <Mic className="w-[4rem] h-[4rem] transition-opacity duration-300" />
        </button>
      </div>

      {/* 오른쪽 아래: 대화 변경하기 버튼, 부모 컨테이너 내에서 아래 정렬 */}
      <div className="flex flex-col justify-end">
        <div className="bg-white rounded-full border border-[#D3D5D7] px-4 py-2 cursor-pointer">
          대화 변경하기
        </div>
      </div>
    </div>
  );
};

export default FreeMicOff;
