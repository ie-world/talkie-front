import { useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

export const useSpeechRecorder = (
  onTranscribed: (text: string, audioUrl: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const recognizedTextRef = useRef<string>(""); // 최신 텍스트 저장용 ref
  const [, setRecognizedText] = useState("");

  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      recognizedTextRef.current = transcript; // ref에 저장
      setRecognizedText(transcript); // UI 상태도 갱신
    };

    recognition.onerror = (event: Event) => {
      const e = event as SpeechRecognitionErrorEvent;
      console.error("음성 인식 에러", e.error);
    };

    return recognition;
  };

  const startRecording = async () => {
    if (!recognitionRef.current) {
      const recognition = initRecognition();
      if (!recognition) return;
      recognitionRef.current = recognition;
    }

    recognizedTextRef.current = "";
    setRecognizedText("");
    setIsListening(true);

    recognitionRef.current.start();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("마이크 접근 실패:", error);
    }
  };

  const stopRecording = () => {
    setIsListening(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(blob);
        onTranscribed(recognizedTextRef.current, audioUrl); // ref 값 사용
      };
      mediaRecorderRef.current.stop();
    } else {
      onTranscribed(recognizedTextRef.current, "");
    }
  };

  return { isListening, startRecording, stopRecording };
};
