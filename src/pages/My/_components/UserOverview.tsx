import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axios";

interface UserProfile {
  username: string;
  studyDays: number;
  totalStudyTime: number; // 초 단위
}

const UserOverview = () => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 오늘 학습 시간 계산 예시 (임시 0초)
  const todayStudyTimeSeconds = 0;

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get<UserProfile>(
          "/api/user/profile"
        );
        setData(response.data);
      } catch (error) {
        console.error("프로필 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>데이터가 없습니다.</div>;

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
          {formatTime(data.totalStudyTime)}
        </span>
      </div>
    </div>
  );
};

export default UserOverview;
