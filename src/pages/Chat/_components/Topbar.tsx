import { useNavigate } from "react-router-dom";
import Close from "../../../assets/images/Close.svg?react";

const TopBar = () => {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/home");
  };

  return (
    <div className="w-full h-[3.25rem] flex justify-end items-center">
      <button onClick={handleCloseClick} aria-label="Close">
        <Close />
      </button>
    </div>
  );
};

export default TopBar;
