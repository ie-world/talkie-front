const UserOverview = () => {
  return (
    <div className="w-full  flex mt-6 mb-6 bg-[#F4FFEE]  boreder border-[#E8FFD8] p-3 rounded-xl">
      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">출석 일수</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">2</span>
      </div>
      <div className="flex-1 flex flex-col text-center border-r border-[#ECEEF0]">
        <span className="text-[0.875rem] text-[#A1A3A5]">오늘 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          00:00:00
        </span>
      </div>
      <div className="flex-1 flex flex-col text-center ">
        <span className="text-[0.875rem] text-[#A1A3A5]">총 학습 시간</span>
        <span className="text-[1.125rem] text-[#56585A] font-semibold">
          00:02:22
        </span>
      </div>
    </div>
  );
};

export default UserOverview;
