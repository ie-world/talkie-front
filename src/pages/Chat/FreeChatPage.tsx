import { useState } from "react";
import TopBar from "./_components/Topbar";
import FreeTodyBubble from "./_components/FreeTodyBubble";
import UserBubble from "./_components/UserBubble";
import { RecorderControls } from "./_components/RecorderControls";

interface Message {
  id: string;
  type: "chatbot" | "user";
  text: string;
  buttons?: { id: string; text: string }[];
}

interface Topic {
  id: number;
  content: string;
}

// 목데이터 정의
const MOCK_TOPICS = {
  subject: [
    { id: 1, content: "음식" },
    { id: 2, content: "운동" },
    { id: 3, content: "음악" },
    { id: 4, content: "여행" },
    { id: 5, content: "날씨" },
    { id: 6, content: "동물" },
    { id: 7, content: "영화/드라마" },
    { id: 8, content: "책" },
  ],
  situation: [
    { id: 10, content: "음식 주문하기" },
    { id: 11, content: "회의하기" },
    { id: 12, content: "대중교통 이용하기" },
    { id: 13, content: "물건사기" },
    { id: 14, content: "병원 예약 및 증상 말하기" },
  ],
};

// 토픽별 인사말
const GREETING_BY_TOPIC: Record<number, string> = {
  1: "어떤 음식을 좋아하세요?",
  2: "운동 이야기를 시작해요!",
  3: "좋아하는 음악에 대해 얘기해요!",
  4: "여행 이야기를 시작해요!",
  5: "날씨에 대해 얘기해요!",
  6: "동물에 대해 얘기해요!",
  7: "좋아하는 영화나 드라마에 대해 얘기해요!",
  8: "좋아하는 책에 대해 얘기해요!",
  10: "환영합니다, 고객님!\n어떤 음식을 주문하시겠어요?",
  11: "회의 상황을 연습해요!",
  12: "대중교통 이용하기 연습해요!",
  13: "물건 사기 상황을 연습해요!",
  14: "병원 예약 및 증상 말하기를 연습해요!",
};

// fetchTopics: 목데이터 반환
const fetchTopics = async (type: "subject" | "situation") => {
  return new Promise<Topic[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TOPICS[type]);
    }, 200);
  });
};

export default function FreeChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "chatbot",
      text: "안녕하세요, 저는 언어학습을 도와줄 토디입니다. 지금부터 저와 즐거운 대화를 시작해봐요!\n\n어떤 대화를 원하시나요?",
      buttons: [
        { id: "situation", text: "상황별 대화 선택하기" },
        { id: "subject", text: "주제별 대화 선택하기" },
      ],
    },
  ]);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [conversationType, setConversationType] = useState<
    "subject" | "situation" | null
  >(null);
  const [selectingTopics, setSelectingTopics] = useState(false);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [isListening, setIsListening] = useState(false);

  const handleButtonClick = async (buttonId: string, buttonText: string) => {
    // 유저 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        type: "user",
        text: buttonText,
      },
    ]);

    // 첫 단계: 주제/상황 선택
    if (buttonId === "situation" || buttonId === "subject") {
      const type = buttonId === "situation" ? "situation" : "subject";
      setConversationType(type);
      setSelectingTopics(true);
      setSelectedTopicIds([]);
      setTopics([]);

      try {
        const loadedTopics = await fetchTopics(type);
        setTopics(loadedTopics);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            type: "chatbot",
            text: `대화하고 싶은 ${
              type === "subject" ? "주제" : "상황"
            }를 선택해주세요.`,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            type: "chatbot",
            text: "토픽 목록을 불러오는 데 실패했습니다. 다시 시도해주세요.",
          },
        ]);
      }
      return;
    }

    // 두 번째 단계: 토픽 선택 (선택 즉시 완료)
    if (selectingTopics && conversationType) {
      const topicIdNum = Number(buttonId);
      if (!isNaN(topicIdNum)) {
        // 선택된 주제 즉시 선택완료 처리
        setSelectedTopicIds([topicIdNum]);

        handleSelectComplete([topicIdNum]);
      }
    }
  };

  // 선택완료 로직에서 선택된 ID를 인자로 받도록 변경
  const handleSelectComplete = (selectedIds?: number[]) => {
    const finalSelectedIds = selectedIds ?? selectedTopicIds;
    if (!conversationType || finalSelectedIds.length === 0) {
      alert("하나 이상의 주제를 선택해주세요.");
      return;
    }

    // 챗봇 인사말 메시지 생성
    const greetingTexts = finalSelectedIds
      .map((id) => GREETING_BY_TOPIC[id])
      .filter(Boolean)
      .join("\n");

    const chatbotMsgs: Message[] = [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        type: "chatbot",
        text: greetingTexts || "선택하신 주제로 대화를 시작합니다!",
      },
    ];

    // 예시: id가 1인 경우 추가 메시지
    if (finalSelectedIds.includes(1)) {
      chatbotMsgs.push({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        type: "chatbot",
        text: "환영합니다, 고객님!\n어떤 음식을 주문하시겠어요?",
      });
    }

    setMessages((prev) => [...prev, ...chatbotMsgs]);

    setSelectingTopics(false);
    setConversationType(null);
    setTopics([]);
    setSelectedTopicIds([]);
  };

  const handleStart = () => {
    setIsListening(true);
    // 녹음 시작 로직 추가 가능
  };

  const handleStop = () => {
    setIsListening(false);
    // 녹음 종료 로직 추가 가능
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F8FF] py-6 px-[1rem]">
      <TopBar />
      <div className="flex-grow overflow-y-auto px-2 space-y-3">
        {messages.map((msg) =>
          msg.type === "chatbot" ? (
            <FreeTodyBubble
              key={msg.id}
              text={msg.text}
              buttons={
                msg.buttons && msg.buttons.length > 0
                  ? msg.buttons
                  : selectingTopics &&
                    conversationType &&
                    topics.length > 0 &&
                    msg.text.includes("선택해주세요")
                  ? topics.map((t) => ({
                      id: t.id.toString(),
                      text: t.content,
                    }))
                  : messages[0].id === msg.id
                  ? messages[0].buttons
                  : []
              }
              onButtonClick={(btnId, btnText) => {
                if (btnId === "complete") {
                  handleSelectComplete();
                } else {
                  handleButtonClick(btnId, btnText);
                }
              }}
            />
          ) : (
            <UserBubble key={msg.id} text={msg.text} color="blue" />
          )
        )}
      </div>
      <RecorderControls
        isListening={isListening}
        onStart={handleStart}
        onStop={handleStop}
      />
    </div>
  );
}
