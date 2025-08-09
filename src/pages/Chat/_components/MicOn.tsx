import MicStop from "../../../assets/images/MicStop.svg?react";
import MicSend from "../../../assets/images/MicSend.svg?react";

type MicOnProps = {
  onStopClick: () => void;
  onSendClick: () => void;
};

const MicOn = ({ onStopClick, onSendClick }: MicOnProps) => {
  return (
    <div className="flex justify-center items-center mt-3">
      <button onClick={onStopClick}>
        <MicStop className="w-[3.625rem] h-[3.625rem] mr-4" />
      </button>

      <div className="flex items-center justify-center space-x-4 bg-[#1A75FF] rounded-full w-full h-[3.625rem] mr-1 relative overflow-hidden">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 bg-white rounded-full animate-mic-dot animation-delay-${i}`}
          />
        ))}
      </div>

      <button onClick={onSendClick}>
        <MicSend className="w-[4.25rem] h-[4.25rem]" />
      </button>
    </div>
  );
};

export default MicOn;
