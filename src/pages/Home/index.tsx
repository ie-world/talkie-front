import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import AiPracticeCard from "./_components/AiPracticeCard";
import StudyCard from "./_components/StudyCard";
import UserOverview from "./_components/UserOverview";

type Stage = "word" | "sentence" | "image";

// 타입만 별도로 선언
type TypeText = "단어" | "문장" | "그림";

const stageToTypeMap: Record<Stage, TypeText> = {
  word: "단어",
  sentence: "문장",
  image: "그림",
};

type RecommendedData = {
  stage: Stage;
  progressRatio: number;
};

const HomePage = () => {
  const [recommended, setRecommended] = useState<RecommendedData | null>(null);
  const [alternatives, setAlternatives] = useState<Stage[]>([]);

  useEffect(() => {
    fetch("/api/learn/recommend")
      .then((res) => res.json())
      .then((data) => {
        setRecommended({
          stage: data.recommended.stage,
          progressRatio: data.recommended.progressRatio,
        });
        const altStages = data.alternatives.map(
          (alt: { stage: Stage }) => alt.stage
        );
        setAlternatives(altStages);
      })
      .catch((err) => {
        console.error("Failed to fetch recommendation:", err);
      });
  }, []);

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

      {recommended && (
        <AiPracticeCard
          type={stageToTypeMap[recommended.stage]}
          progress={Math.round((recommended.progressRatio ?? 0) * 100)}
          buttonText="시작하기"
          onClick={() => console.log("AI Practice started")}
        />
      )}

      {alternatives.map((stage) => (
        <StudyCard key={stage} type={stageToTypeMap[stage]} />
      ))}
    </div>
  );
};

export default HomePage;
