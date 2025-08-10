import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./_components/Topbar";
import TodyBubble from "./_components/TodyBubble";
import UserBubble from "./_components/UserBubble";
import { RecorderControls } from "./_components/RecorderControls";
import { useSpeechRecorder } from "../../hooks/useSpeechRecorder";

type LearningType = "picture" | "word" | "sentence";

interface Message {
  id: string;
  type: "chatbot" | "user";
  learningType: LearningType;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  extraText?: string;
  color?: "blue" | "orange";
}

const mockStartData = {
  picture: {
    text: "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 그림을 보고 발음해보세요.",
    imageUrl:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
  },
  word: {
    text: "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 단어를 보고 발음해보세요.",
    extraText: "사과",
  },
  sentence: {
    text: "안녕하세요, 저는 언어학습을 도와줄 토디입니다.\n\n지금부터 나오는 문장을 보고 발음해보세요.",
    extraText: "오늘은 기분이 좋아요",
  },
};

const mockNextData = {
  picture: [
    {
      text: "정답입니다. 잘하셨어요!\n다음 그림을 보고 발음해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80",
    },
    {
      text: "빠르게 발음하셨네요! 강아지를 천천히 발음해볼까요?",
      imageUrl:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80",
    },
  ],
  word: [
    {
      text: "정답입니다! 잘하셨어요!\n다음 단어를 보고 발음해보세요.",
      extraText: "연필",
    },
    {
      text: "천천히 발음하셨네요! 연필을 한호흡에 발음해볼까요?",
      extraText: "연필",
    },
  ],
  sentence: [
    {
      text: "정답입니다. 잘하셨어요!\n다음 문장을 보고 발음해보세요.",
      extraText: "상쾌한 날씨예요",
    },
    {
      text: "아쉬워요! 상쾌한 날씨예요를 정확하게 발음해볼까요?",
      extraText: "상쾌한 날씨예요",
    },
    {
      text: "거의 다 왔어요! 상쾌한 날씨예요를 붙여서 말해볼까요?",
      extraText: "상쾌한 날씨예요",
    },
  ],
};

interface UserMessage {
  text: string;
  color: "blue" | "orange";
}

const mockUserData: Record<LearningType, UserMessage[]> = {
  picture: [
    { text: "사과", color: "blue" },
    { text: "강아지", color: "orange" },
    { text: "강아지", color: "blue" },
  ],
  word: [
    { text: "사과", color: "blue" },
    { text: "연필", color: "orange" },
    { text: "연필", color: "blue" },
  ],
  sentence: [
    { text: "오늘은 기분이 좋아요", color: "blue" },
    { text: "상쾌한 날씨예요", color: "orange" },
    { text: "상쾌한 날씨예요", color: "orange" },
    { text: "상쾌한 날씨예요", color: "blue" },
  ],
};

export default function ChatPage() {
  const params = useParams();
  const typeFromUrl = params.type;

  const isValidType = (type: string): type is LearningType =>
    type === "picture" || type === "word" || type === "sentence";

  const [learningType, setLearningType] = useState<LearningType>("picture");
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [userIndex, setUserIndex] = useState(0); // 유저 목데이터 인덱스 추가

  useEffect(() => {
    if (typeFromUrl && isValidType(typeFromUrl)) {
      setLearningType(typeFromUrl);
      setNextIndex(0);
      setUserIndex(0);
    } else {
      setLearningType("picture");
      setNextIndex(0);
      setUserIndex(0);
    }
  }, [typeFromUrl]);

  useEffect(() => {
    const startContent = mockStartData[learningType];
    setMessages([
      {
        id: crypto.randomUUID(),
        type: "chatbot",
        learningType,
        ...startContent,
      },
    ]);
  }, [learningType]);

  const { isListening, startRecording, stopRecording } = useSpeechRecorder(
    async (text, audioUrl) => {
      // 1. 유저 목데이터 인덱스에 해당하는 user 메시지 가져오기
      const userData = mockUserData[learningType][userIndex];

      if (!userData) {
        console.warn("더 이상 user 목데이터가 없습니다.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "user",
          learningType,
          text: userData.text,
          audioUrl: audioUrl,
          color: userData.color,
        },
      ]);

      const nextContent = mockNextData[learningType][nextIndex];
      if (nextContent) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "chatbot",
            learningType,
            ...nextContent,
          },
        ]);
        setNextIndex((prev) => prev + 1);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "chatbot",
            learningType,
            text: "축하합니다! 오늘의 학습을 모두 마쳤습니다!\n다음에 또 만나요!",
          },
        ]);
      }

      setUserIndex((prev) => (prev + 1) % mockUserData[learningType].length);
    }
  );

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F8FF] py-6 px-[1rem]">
      <TopBar />
      <div className="flex-grow overflow-y-auto px-2 space-y-3">
        {messages.map((msg) =>
          msg.type === "chatbot" ? (
            <TodyBubble
              type={msg.learningType}
              key={msg.id}
              text={msg.text}
              imageUrl={msg.imageUrl}
              extraText={msg.extraText}
            />
          ) : (
            <UserBubble
              key={msg.id}
              text={msg.text}
              audioUrl={msg.audioUrl}
              color={msg.color}
            />
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
