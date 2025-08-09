import React from "react";
import UserBubble from "../_components/UserBubble";

interface UserMessage {
  id: string;
  text: string;
  audioUrl?: string;
}

interface UserSectionProps {
  userMessages: UserMessage[];
}

export const UserSection: React.FC<UserSectionProps> = ({ userMessages }) => (
  <>
    {userMessages.map((msg) => (
      <UserBubble key={msg.id} text={msg.text} audioUrl={msg.audioUrl} />
    ))}
  </>
);
