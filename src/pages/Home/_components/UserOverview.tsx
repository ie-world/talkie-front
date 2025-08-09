import axiosInstance from "../../../apis/axios";
import { useState, useEffect } from "react";

interface StudySummary {
  attendanceDays: number;
  todayStudyMinutes: number; // API에서 받은 오늘 학습 시간 (분)
  totalStudyMinutes: number; // API에서 받은 총 학습 시간 (분)
}

const UserOverview = () => {
  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [todaySeconds, setTodaySeconds] = useState(0);

  // 오늘 학습 종료 시 서버에 오늘 학습 시간 전송하는 함수
  const sendTodayStudyTimeToServer = async (seconds: number) => {
    try {
      // 분 단위로 변환
      const minutes = Math.floor(seconds / 60);
      await axiosInstance.post("/api/study-log/today", { minutes });
      console.log("오늘 학습 시간 서버 전송 성공");
    } catch (err) {
      console.error("오늘 학습 시간 서버 전송 실패", err);
    }
  };

  const formatSecondsToHHMMSS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    axiosInstance
      .get<StudySummary>("/api/study-log/summary")
      .then((res) => {
        setSummary(res.data);
        setTodaySeconds(res.data.todayStudyMinutes * 60);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "알 수 없는 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 1초마다 todaySeconds 증가
  useEffect(() => {
    if (summary) {
      const interval = setInterval(() => {
        setTodaySeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [summary]);

  // 페이지 떠날 때 오늘 학습 시간 서버에 저장 (예시: window unload 이벤트)
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendTodayStudyTimeToServer(todaySeconds);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // 컴포넌트 언마운트시에도 한번 저장
      sendTodayStudyTimeToServer(todaySeconds);
    };
  }, [todaySeconds]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!summary) return null;

  // 총 학습 시간 = API로 받은 기존 총 학습 시간 + 지금 프론트에서 실시간 누적 중인 오늘 학습 시간
  // 단, todaySeconds는 초, totalStudyMinutes는 분 → 초로 맞춰서 계산
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
