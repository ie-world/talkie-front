import { useCallback } from "react";

type LearningType = "picture" | "word" | "sentence";

export const useLearningAPI = (
  firstMessageTexts: Record<LearningType, string>
) => {
  const fetchLearningStart = useCallback(
    async (type: LearningType) => {
      try {
        const res = await fetch(`/api/learning/${type}/start`);
        if (!res.ok) throw new Error("학습 시작 실패");
        const data = await res.json();
        return {
          text: firstMessageTexts[type] + "\n\n" + (data.text || ""),
          imageUrl: data.imageUrl,
        };
      } catch (e) {
        console.error(e);
        return { text: "학습 시작 중 오류가 발생했습니다." };
      }
    },
    [firstMessageTexts]
  );

  const fetchLearningNext = async (type: LearningType, userAnswer: string) => {
    try {
      const res = await fetch(`/api/learning/${type}/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: userAnswer }),
      });
      if (!res.ok) throw new Error("다음 학습 호출 실패");
      const data = await res.json();
      return { text: data.text, imageUrl: data.imageUrl };
    } catch (e) {
      console.error(e);
      return { text: "다음 학습 불러오기 실패" };
    }
  };

  return { fetchLearningStart, fetchLearningNext };
};
