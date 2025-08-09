import { useRef, useState } from "react";

export const useSpeechRecorder = (
  onTranscribed: (text: string, audioUrl: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

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
        const text = await convertSpeechToText(blob);
        const url = URL.createObjectURL(blob);
        onTranscribed(text, url);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error("마이크 접근 실패:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsListening(false);
  };

  return { isListening, startRecording, stopRecording };
};
