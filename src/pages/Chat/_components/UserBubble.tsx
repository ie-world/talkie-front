import React from "react";

interface UserBubbleProps {
  text: string;
  audioUrl?: string;
}

const UserBubble: React.FC<UserBubbleProps> = ({ text, audioUrl }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  return (
    <div className="max-w-[70%] bg-blue-500 text-white p-3 rounded-lg mb-2 self-end">
      <p>{text}</p>
      {audioUrl && (
        <button
          onClick={handlePlay}
          className="mt-2 bg-blue-700 px-3 py-1 rounded text-sm"
        >
          듣기 ▶
        </button>
      )}
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
};

export default UserBubble;
