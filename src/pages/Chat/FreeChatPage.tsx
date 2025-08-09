import { useState } from "react";
import TopBar from "./_components/Topbar";
import FreeTodyBubble from "./_components/FreeTodyBubble";
import UserBubble from "./_components/UserBubble";
import axiosInstance from "../../apis/axios";

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

  // API: 토픽 목록 불러오기
  const fetchTopics = async (type: "subject" | "situation") => {
    try {
      const res = await axiosInstance.get(`/api/freetalk/topics?type=${type}`);
      return res.data.topics as Topic[];
    } catch (error) {
      console.error("토픽 목록 불러오기 실패", error);
      throw error;
    }
  };

  // API: 선택 주제 서버 전송
  const postSelectedTopics = async (
    conversationType: "subject" | "situation",
    topicIds: number[]
  ) => {
    try {
      const res = await axiosInstance.post("/api/freetalk/select-topics", {
        conversation_type: conversationType,
        topic_id: topicIds,
      });
      return res.data;
    } catch (error) {
      console.error("토픽 선택 전송 실패", error);
      throw error;
    }
  };

  // 버튼 클릭 처리
  const handleButtonClick = async (buttonText: string) => {
    // 유저 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        type: "user",
        text: buttonText,
      },
    ]);

    // 초기 선택 (상황별/주제별 대화 선택)
    if (
      buttonText === "상황별 대화 선택하기" ||
      buttonText === "주제별 대화 선택하기"
    ) {
      const type =
        buttonText === "상황별 대화 선택하기" ? "situation" : "subject";
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
            }를 선택해주세요.\n(복수 선택 가능)`,
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

    // 토픽 선택 중일 때 토글
    if (selectingTopics && conversationType) {
      const selectedTopic = topics.find((t) => t.content === buttonText);
      if (!selectedTopic) return;

      setSelectedTopicIds((prev) =>
        prev.includes(selectedTopic.id)
          ? prev.filter((id) => id !== selectedTopic.id)
          : [...prev, selectedTopic.id]
      );
      return;
    }
  };

  // 선택 완료 버튼 클릭 시
  const handleSelectComplete = async () => {
    if (!conversationType || selectedTopicIds.length === 0) {
      alert("하나 이상의 주제를 선택해주세요.");
      return;
    }

    // 유저 메시지로 선택 완료 표시
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        type: "user",
        text: `선택 완료: ${selectedTopicIds
          .map((id) => topics.find((t) => t.id === id)?.content)
          .filter(Boolean)
          .join(", ")}`,
      },
    ]);

    try {
      const data = await postSelectedTopics(conversationType, selectedTopicIds);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          type: "chatbot",
          text: data.greetingText,
          // 필요하면 greetingAudioUrl도 활용 가능
        },
      ]);

      // 초기화
      setSelectingTopics(false);
      setConversationType(null);
      setTopics([]);
      setSelectedTopicIds([]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          type: "chatbot",
          text: "주제 선택 서버 전송에 실패했습니다. 다시 시도해주세요.",
        },
      ]);
    }
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
                // 토픽 선택 중이면 토픽 버튼 + 선택 완료 버튼 보여주기
                selectingTopics && conversationType && topics.length > 0
                  ? [
                      ...topics.map((t) => ({
                        id: t.id.toString(),
                        text: t.content,
                      })),
                      { id: "complete", text: "선택 완료" },
                    ]
                  : msg.buttons
              }
              onButtonClick={(btnText) => {
                if (btnText === "선택 완료") {
                  handleSelectComplete();
                } else {
                  handleButtonClick(btnText);
                }
              }}
              // 선택된 버튼 스타일을 버튼 컴포넌트 쪽에서 못 주면
              // 여기서 따로 prop으로 전달해서 표시할 수도 있습니다.
            />
          ) : (
            <UserBubble key={msg.id} text={msg.text} />
          )
        )}
      </div>
    </div>
  );
}
