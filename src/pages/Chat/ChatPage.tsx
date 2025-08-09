import { useRef, useState } from "react";
import TodyBubble from "./_components/TodyBubble";
import MicOff from "./_components/MicOff";
import MicOn from "./_components/MicOn";

import TopBar from "./_components/Topbar";
import UserBubble from "./_components/UserBubble";

const ChatPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [userText, setUserText] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  // 음성 → 텍스트 변환 함수 (예: Google Speech-to-Text API 사용한다고 가정)
  // 여기서는 fetch 호출로 예시
  const convertSpeechToText = async (blob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", blob, "voiceMessage.webm");

    try {
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("음성 변환 실패");
      const data = await response.json();
      return data.text || "";
    } catch (error) {
      console.error("음성 변환 에러:", error);
      return "";
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);

        // 변환해서 텍스트 상태에 저장
        const text = await convertSpeechToText(blob);
        setUserText(text);

        // 재생을 위한 URL 생성
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error("마이크 접근 실패:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsListening(false);
  };

  const handleMicClick = () => {
    startRecording();
  };

  const handleStopClick = () => {
    stopRecording();
  };

  const handleSendClick = () => {
    stopRecording();
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F8FF] py-6 px-[1rem]">
      <TopBar />
      <TodyBubble />

      {/* 사용자 말풍선 */}
      {userText && (
        <UserBubble text={userText} audioUrl={audioUrl || undefined} />
      )}

      {/* 녹음된 음성 재생 확인용 */}
      {audioUrl && (
        <div className="mt-4 text-center">
          <audio controls src={audioUrl} />
        </div>
      )}

      <div className="text-center mt-auto">
        {!isListening ? (
          <button onClick={handleMicClick}>
            <MicOff />
          </button>
        ) : (
          <MicOn onStopClick={handleStopClick} onSendClick={handleSendClick} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
