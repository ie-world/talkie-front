import { useEffect, useMemo, useState } from "react";
import TopBar from "./_components/Topbar";
import TodyBubble from "./_components/TodyBubble"; // 챗봇 버블 컴포넌트
import UserBubble from "./_components/UserBubble"; // 유저 버블 컴포넌트
import { RecorderControls } from "./_components/RecorderControls";
import { useLearningAPI } from "../../hooks/useLearningAPI";
import { useSpeechRecorder } from "../../hooks/useSpeechRecorder";

type LearningType = "picture" | "word" | "sentence";

interface Message {
  id: string;
  type: "chatbot" | "user";
  text: string;
  imageUrl?: string;
  audioUrl?: string;
}

export default function ChatPage() {
  const [learningType] = useState<LearningType>("picture");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "chatbot",
      text: "로딩 중...",
    },
  ]);

  const firstMessageTexts = useMemo(
    () => ({
      picture:
        "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 그림을 보고 발음해보세요.",
      word: "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 단어를 보고 발음해보세요.",
      sentence:
        "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 문장을 보고 발음해보세요.",
    }),
    []
  );

  const { fetchLearningStart, fetchLearningNext } =
    useLearningAPI(firstMessageTexts);

  const { isListening, startRecording, stopRecording } = useSpeechRecorder(
    async (text, url) => {
      // 유저 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          type: "user",
          text,
          audioUrl: url,
        },
      ]);

      // 챗봇 다음 메시지 받아서 추가
      const nextContent = await fetchLearningNext(learningType, text);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          type: "chatbot",
          ...nextContent,
        },
      ]);
    }
  );

  useEffect(() => {
    async function fetchStart() {
      const startContent = await fetchLearningStart(learningType);
      setMessages([
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          type: "chatbot",
          ...startContent,
        },
      ]);
    }
    fetchStart();
  }, [learningType, fetchLearningStart]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F8FF] py-6 px-[1rem]">
      <TopBar />
      <div className="flex-grow overflow-y-auto px-2 space-y-3">
        {messages.map((msg) =>
          msg.type === "chatbot" ? (
            <TodyBubble
              type={learningType}
              key={msg.id}
              text={msg.text}
              imageUrl={msg.imageUrl}
            />
          ) : (
            <UserBubble key={msg.id} text={msg.text} audioUrl={msg.audioUrl} />
          )
        )}
      </div>
      <RecorderControls
        isListening={isListening}
        onStart={startRecording}
        onStop={stopRecording}
      />
    </div>
  );
}
