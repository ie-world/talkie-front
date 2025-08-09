import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import AiPracticeCard from "./_components/AiPracticeCard";
import StudyCard from "./_components/StudyCard";
import UserOverview from "./_components/UserOverview";

const types = ["단어", "문장", "그림"] as const;

const HomePage = () => {
  // AiPracticeCard progress 상태 (예시: 75로 설정해놓음)
  // 실제 progress를 props 또는 상태로 받아올 수도 있음
  const [aiProgress] = useState(75);

  const [studyTypes, setStudyTypes] = useState<Array<(typeof types)[number]>>(
    []
  );

  useEffect(() => {
    if (aiProgress === 0) {
      const studyCandidates = types.filter((t) => t !== "단어");
      const shuffled = studyCandidates.sort(() => Math.random() - 0.5);
      setStudyTypes(shuffled.slice(0, 2));
    } else {
      const studyCandidates = types.filter((t) => t !== "단어");
      const shuffled = studyCandidates.sort(() => Math.random() - 0.5);
      setStudyTypes(shuffled.slice(0, 2));
    }
  }, [aiProgress]);

  return (
    <div className="flex flex-col pb-45 overflow-auto no-scrollbar px-[1rem]">
      <Header />
      <Footer />
      <TabBar />
      <div className="flex mt-6">
        <div className="text-1.125rem text-[#1A75FF] font-bold leading-none">
          토키
        </div>
        <div className="text-1.125rem text-[#242628] font-bold leading-none">
          와 함께,
        </div>
      </div>
      <div className="text-1.125rem text-[#242628] font-bold leading-none mt-2">
        오늘도 한 걸음, 말하기 연습 해봐요!
      </div>
      <UserOverview />
      <AiPracticeCard
        type="단어"
        progress={aiProgress}
        buttonText="시작하기"
        onClick={() => console.log("AI Practice started")}
      />
      {studyTypes.map((type) => (
        <StudyCard key={type} type={type} />
      ))}
    </div>
  );
};

export default HomePage;
