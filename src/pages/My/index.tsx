import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import SquareProfile from "../../assets/images/SquareProfile.svg?react";
import Logout from "../../assets/images/Logout.svg?react";
import UserOverview from "./_components/UserOverview";
import PolicyList from "./_components/PolicyList";
import ExitButton from "./_components/ExitButton";
import Popup from "./_components/Popup";

const MyPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  // 목데이터 로드
  useEffect(() => {
    setTimeout(() => {
      setUsername("이현서");
    }, 300);
  }, []);

  const handleConfirm = () => {
    alert("탈퇴가 완료되었습니다.");
    setShowPopup(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col pb-45 overflow-auto no-scrollbar mx-[1rem] justify-center items-center">
        <Header />
        <TabBar />
        <div className="flex flex-col justify-center items-center mb-2 w-full">
          <SquareProfile className="w-[5rem] h-[5rem] justify-center items-center" />
          {/* username 표시 */}
          <div className="flex justify-center items-center text-[1.125rem] font-semibold text-[#56585A]">
            {username || "Loading..."}
          </div>
          <div
            className="flex gap-1 bg-[#EAF2FE] border-[#ECEEF0] rounded-xl h-[2.125rem] w-[5.75rem] justify-center items-center mt-1 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="text-[#1A75FF] text-sm">로그아웃</span>
            <Logout />
          </div>
          <UserOverview />
          <PolicyList />
          <div
            className="flex w-full justify-end mt-4 cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <ExitButton />
          </div>
        </div>
      </div>

      {showPopup &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-end"
            style={{ zIndex: 100 }}
          >
            <Popup
              onClose={() => setShowPopup(false)}
              onConfirm={handleConfirm}
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default MyPage;
