import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface StudySummary {
  attendanceDays: number;
  todayStudyMinutes: number; // 오늘 학습 시간 (분)
  totalStudyMinutes: number; // 총 학습 시간 (분)
}

const UserOverview = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [todaySeconds, setTodaySeconds] = useState(0);

  const formatSecondsToHHMMSS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 가상 데이터 로드
  useEffect(() => {
    setTimeout(() => {
      try {
        const fakeData: StudySummary = {
          attendanceDays: 15,
          todayStudyMinutes: 20, // 20분
          totalStudyMinutes: 450, // 7시간 30분
        };
        setSummary(fakeData);
        setTodaySeconds(fakeData.todayStudyMinutes * 60);
        setLoading(false);
      } catch (err) {
        console.log("가상 데이터 로드 실패:", err);
        setError("가상 데이터 로드 실패");
        setLoading(false);
      }
    }, 500);
  }, []);

  // 1초마다 todaySeconds 증가 (특정 페이지에서만)
  useEffect(() => {
    if (
      summary &&
      (location.pathname === "/chat" || location.pathname === "/freechat")
    ) {
      const interval = setInterval(() => {
        setTodaySeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [summary, location.pathname]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!summary) return null;

  // 총 학습 시간 계산
  const totalSeconds =
    summary.totalStudyMinutes * 60 +
    todaySeconds -
    summary.todayStudyMinutes * 60;

  return (
    <div className="w-full h-[3.25rem] flex mt-6 mb-6">
      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">출석 일수</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {summary.attendanceDays}
        </span>
      </div>

      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">오늘 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {formatSecondsToHHMMSS(todaySeconds)}
        </span>
      </div>

      <div className="flex-1 flex flex-col text-center">
        <span className="text-[0.875rem] text-[#A1A3A5]">총 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          {formatSecondsToHHMMSS(totalSeconds)}
        </span>
      </div>
    </div>
  );
};

export default UserOverview;
