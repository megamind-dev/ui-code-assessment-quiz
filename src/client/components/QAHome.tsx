import React from "react";

interface IProps {
  onStart: () => void;
}

export default function QAHome({ onStart }: IProps) {
  return (
    <div className="container">
      <h2>Quiz Game</h2>
      <h4>You will face 10 questions. Can you score 100%?</h4>
      <button className="primary-button" onClick={() => onStart()}>
        Start
      </button>
    </div>
  );
}
