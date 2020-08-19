import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/gameTypes";
import TextAnswer from "./TextAnswer";
import MultipleAnswer from "./MultipleAnswer";
import { AllHtmlEntities } from "html-entities";

interface IProps {
  question: QuestionType;
  currentQuestion: number;
  onNext: (answer: string) => void;
}

export default function QAPanel({ question, currentQuestion, onNext }: IProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const entities = new AllHtmlEntities();

  useEffect(() => {
    if (answer) setError("");
  }, [answer]);

  return (
    <div>
      <h3>Question {currentQuestion + 1}</h3>
      <h3>{entities.decode(question.question)}</h3>
      {question.type === "text" ? (
        <TextAnswer answer={answer} setAnswer={setAnswer} />
      ) : (
        question.answers && (
          <MultipleAnswer answers={question.answers} setAnswer={setAnswer} />
        )
      )}
      <button
        className="primary-button"
        onClick={() => {
          if (!answer) {
            setError("Please select an answer.");
            return;
          }
          onNext(answer);
          setError("");
          setAnswer("");
        }}
      >
        Next
      </button>
      <div className="error">{error}</div>
    </div>
  );
}
