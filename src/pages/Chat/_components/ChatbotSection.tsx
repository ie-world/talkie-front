import TodyBubble from "./TodyBubble";

type LearningType = "picture" | "word" | "sentence";

interface ChatbotContentType {
  id: string;
  text: string;
  imageUrl?: string;
}

interface ChatbotSectionProps {
  contents: ChatbotContentType[];
  type: LearningType;
}

export function ChatbotSection({ contents, type }: ChatbotSectionProps) {
  return (
    <div className="chatbot-section flex flex-col gap-2 overflow-y-auto">
      {contents.map(({ id, text, imageUrl }) => (
        <TodyBubble key={id} text={text} imageUrl={imageUrl} type={type} />
      ))}
    </div>
  );
}
