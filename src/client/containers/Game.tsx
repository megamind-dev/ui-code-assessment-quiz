import React, { useState, useEffect } from "react";
import { QuestionType } from "../types/gameTypes";
import QAPanel from "../components/QAPanel";
import QAHome from "../components/QAHome";
import QASummary from "../components/QASummary";

const URL = "http://localhost:4000/api/questions";
const NOOFQUESTIONS = 10;

export default function Game() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {}, []);

  const handleStart = () => {
    setLoading(true);
    setError("");

    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.response_code != 0) throw new Error("server error");

        // choose random questions
        let ids: number[] = [],
          i = 0,
          len = res.results.length;
        while (i < NOOFQUESTIONS) {
          const idx = Math.floor(Math.random() * len);
          if (ids.includes(idx)) continue;
          ids.push(idx);
          i++;
        }

        setQuestions(
          ids.map((e) => {
            // shuffle the correct and incorrect answers
            const quiz: QuestionType = res["results"][e];
            if (quiz.incorrect_answers) {
              const allAnswers = [...quiz.incorrect_answers];
              const idx = Math.floor(Math.random() * allAnswers.length);
              allAnswers.splice(idx, 0, quiz.correct_answer);
              quiz.answers = allAnswers;
            }
            return quiz;
          })
        );
        setCurrentQuestion(0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleNext = (answer: string): void => {
    setCurrentQuestion(currentQuestion + 1);
    setAnswers([...answers, answer]);
    answer = "";
  };

  const calcCorrectAnswers = (): number => {
    let count = 0;
    for (let i = 0; i < NOOFQUESTIONS; i++) {
      if (questions[i].correct_answer === answers[i]) count++;
    }
    return count;
  };

  const handleRestart = (): void => {
    setCurrentQuestion(-1);
    setQuestions([]);
    setAnswers([]);
    handleStart();
  };

  return (
    <div className="width600">
      {currentQuestion < 0 ? (
        <div>
          <QAHome onStart={handleStart} />
          <div className="status">
            {loading ? "Loading..." : error ? error : null}
          </div>
        </div>
      ) : currentQuestion < NOOFQUESTIONS ? (
        <QAPanel
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          onNext={handleNext}
        />
      ) : (
        <QASummary
          correct={calcCorrectAnswers()}
          total={NOOFQUESTIONS}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
