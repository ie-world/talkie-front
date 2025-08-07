import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import AiPracticeCard from "./_components/AiPracticeCard";
import StudyCard from "./_components/StudyCard";
import UserOverview from "./_components/UserOverview";

const HomePage = () => {
  return (
    <div className="flex flex-col pb-45 overflow-auto no-scrollbar">
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
        type="그림"
        progress={75}
        buttonText="시작하기"
        onClick={() => console.log("AI Practice started")}
      />
      <StudyCard type="word" />
      <StudyCard type="word" />
    </div>
  );
};

export default HomePage;
