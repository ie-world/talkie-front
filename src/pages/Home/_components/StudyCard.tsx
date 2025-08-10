import ArrowBlue from "../../../assets/images/ArrowBlue.svg?react";

type StudyType = "그림" | "단어" | "문장";

interface StudyCardProps {
  type: StudyType;
  onClick?: () => void; // 클릭 이벤트 prop 추가
}

const STUDY_CONTENT = {
  그림: {
    title: "그림 말하기",
    description: "그림을 보고 소리내어 발음해보세요",
    count: "10가지 그림",
  },
  단어: {
    title: "단어 말하기",
    description: "기초 단어부터 정확하게 발음해보세요",
    count: "10가지 단어",
  },
  문장: {
    title: "문장 말하기",
    description: "일상 속 문장을 자신감 있게 발음해보세요",
    count: "10가지 문장",
  },
};

const StudyCard: React.FC<StudyCardProps> = ({ type, onClick }) => {
  const content = STUDY_CONTENT[type];

  return (
    <div className="w-full mb-2 px-4 py-3 bg-[#F7FBFF] border border-[#ECEEF0] flex flex-col gap-1 rounded-xl">
      <div className="font-semibold text-[1rem] text-[#56585A]">
        {content.title}
      </div>
      <div className="text-[0.875rem] text-[#A1A3A5]">
        {content.description}
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-[#EAF2FE] px-1.5 py-0.5 text-[0.75rem] rounded-md text-[#1A75FF]">
          {content.count}
        </div>
        <button
          onClick={onClick}
          className="flex justify-center items-center text-[#1A75FF] text-[0.875rem] font-regular gap-1"
          type="button"
        >
          <div>학습하기</div>
          <ArrowBlue />
        </button>
      </div>
    </div>
  );
};

export default StudyCard;
