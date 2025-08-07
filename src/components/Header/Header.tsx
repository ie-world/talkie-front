import { useNavigate } from "react-router-dom";
import TalkieIcon from "../../assets/images/TalkieIcon.svg?react";
import Bell from "../../assets/images/Bell.svg?react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-transparent flex items-center justify-between">
      <div>
        <TalkieIcon className="h-9" />
      </div>
      <div className="flex items-center gap-[0.75rem]">
        <button onClick={() => navigate("/alarm")}>
          <Bell className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
