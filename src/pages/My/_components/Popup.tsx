import AIFace from "../../../assets/images/AIFace.svg?react";

interface FilterPopupProps {
  onClose: () => void;
  onConfirm: () => void; // 탈퇴 동의 시 호출되는 함수
}

export default function Popup({ onClose, onConfirm }: FilterPopupProps) {
  return (
    <div className="w-full bg-white rounded-t-[1rem] px-4 pt-6 pb-10 relative flex flex-col justify-center items-center">
      {/* 헤더 */}
      <AIFace className="w-19 h-auto mb-4" />
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[1.125rem] font-bold text-[#242628]">
          정말 탈퇴하시겠어요?
        </h2>
      </div>

      {/* 설명 텍스트 (필요 시 추가 가능) */}
      <p className="text-[#A1A3A5] text-[1rem] mb-[7rem] text-center">
        [예] 선택 시, 모든 학습 기록이 삭제됩니다.
      </p>

      {/* 하단 버튼 */}
      <div className="absolute bottom-[2.25rem] left-0 w-full px-[1.5rem] flex flex-col ">
        <button
          onClick={onConfirm}
          className="flex-1 h-[3.5rem] bg-[#1A75FF] text-white rounded-xl py-2.5"
        >
          예
        </button>
        <button
          onClick={onClose}
          className="flex-1 h-[3.5rem] bg-white text-[#56585A] rounded-xl py-2.5"
        >
          아니오
        </button>
      </div>
    </div>
  );
}
