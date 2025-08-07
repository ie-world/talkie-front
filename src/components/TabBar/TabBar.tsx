import { useLocation, useNavigate } from "react-router-dom";

import ChatbotButton from "../../assets/images/ChatbotButton.svg?react";
import Home from "../../assets/images/Home.svg?react";
import HomeSelected from "../../assets/images/HomeSelected.svg?react";
import My from "../../assets/images/My.svg?react";
import MySelected from "../../assets/images/MySelected.svg?react";

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isMy = location.pathname === "/mypage";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 shadow-xl">
      {/* 굴곡진 배경 */}
      <div className="absolute inset-0 -z-10">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-lg"
        >
          <path
            d="
              M0,0 
              H50 
              A14,14 0 0 1 50,28 
              A14,14 0 0 1 50,0 
              H100 
              V100 
              H0 
              Z
            "
            fill="white"
          />
        </svg>
      </div>

      <div className="relative w-full h-full flex justify-between items-end px-9 pb-4">
        {/* 홈 탭 */}
        <TabButton
          icon={Home}
          selectedIcon={HomeSelected}
          active={isHome}
          onClick={() => navigate("/")}
        />

        {/* 마이 탭 */}
        <TabButton
          icon={My}
          selectedIcon={MySelected}
          active={isMy}
          onClick={() => navigate("/mypage")}
        />
      </div>

      {/* 중앙 챗봇 플로팅 아이콘 */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-20 ">
        <div className="flex items-center justify-center">
          <ChatbotButton className="w-[5.5rem] h-[5.5rem]" />
        </div>
      </div>
    </div>
  );
}

type TabButtonProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  selectedIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onClick: () => void;
};

function TabButton({
  icon: Icon,
  selectedIcon: SelectedIcon,
  active,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center h-[3.875rem]"
    >
      {active ? (
        <SelectedIcon className="h-[3.875rem]" />
      ) : (
        <Icon className="h-[3.875rem]" />
      )}
    </button>
  );
}
