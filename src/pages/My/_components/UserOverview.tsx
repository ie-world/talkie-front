import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface UserProfile {
  username: string;
  studyDays: number;
  totalStudyTime: number; // 초 단위
}

const UserOverview = () => {
  const location = useLocation();
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayStudyTimeSeconds, setTodayStudyTimeSeconds] = useState(0);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // 가상 데이터 로드
  useEffect(() => {
    setTimeout(() => {
      const fakeData: UserProfile = {
        username: "홍길동",
        studyDays: 15,
        totalStudyTime: 27000, // 7시간 30분
      };
      setData(fakeData);
      setTodayStudyTimeSeconds(1200); // 초기값 20분
      setLoading(false);
    }, 500);
  }, []);

  // 특정 페이지에서만 초 증가
  useEffect(() => {
    if (
      data &&
      (location.pathname === "/chat" || location.pathname === "/freechat")
    ) {
      const interval = setInterval(() => {
        setTodayStudyTimeSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data, location.pathname]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  // 총 학습 시간 = 기존 총 학습 시간 + (오늘 학습 시간 실시간 증가분 - 초기 오늘 학습 시간)
  const totalTimeWithToday =
    data.totalStudyTime + (todayStudyTimeSeconds - 1200); // 1200 = 초기 20분

  return (
    <div className="w-full flex mt-6 mb-6 bg-[#F4FFEE] border border-[#E8FFD8] p-3 rounded-xl">
      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">출석 일수</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {data.studyDays}
        </span>
      </div>
      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">오늘 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {formatTime(todayStudyTimeSeconds)}
        </span>
      </div>
      <div className="flex-1 flex flex-col text-center">
        <span className="text-[0.875rem] text-[#A1A3A5]">총 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {formatTime(totalTimeWithToday)}
        </span>
      </div>
    </div>
  );
};

export default UserOverview;
