import Mic from "../../../assets/images/Mic.svg?react";
import MicBubble from "../../../assets/images/MicBubble.svg?react";

const MicOff = () => {
  return (
    <div className="text-center mt-auto">
      <p className="text-sm text-[#1D4ED8] font-semibold mb-1 animate-bounce">
        <MicBubble />
      </p>
      <button>
        <Mic className={`w-[4rem] h-[4rem] transition-opacity duration-300 `} />
      </button>
    </div>
  );
};

export default MicOff;
