import React from "react";

interface UserBubbleProps {
  text: string;
  audioUrl?: string;
  color?: "blue" | "orange";
}

const UserBubble: React.FC<UserBubbleProps> = ({ text, audioUrl, color }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const bgColor = color === "blue" ? "#1A75FF" : "#FF7A00";

  return (
    <div className="flex flex-col items-end">
      <div
        className="max-w-[70%] rounded-br-none text-white py-3 px-4 rounded-3xl mb-2 self-end"
        style={{ backgroundColor: bgColor }}
      >
        {" "}
        <p>{text}</p>
      </div>
      {audioUrl && (
        <>
          <button
            onClick={handlePlay}
            className="bg-[#EAF2FE] text-[#1A75FF] px-3 py-1 rounded text-sm"
          >
            듣기 ▶
          </button>
          <audio ref={audioRef} src={audioUrl} />
        </>
      )}
    </div>
  );
};

export default UserBubble;
