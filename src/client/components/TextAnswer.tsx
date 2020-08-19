import React from "react";

interface IProps {
  answer: string;
  setAnswer: (answer: string) => void;
}

export default function TextAnswer({ answer, setAnswer }: IProps) {
  return (
    <div>
      <input
        type="text"
        value={answer}
        onChange={(evt) => setAnswer(evt.target.value)}
      />
    </div>
  );
}
