import React from "react";

interface IProps {
  correct: number;
  total: number;
  onRestart: () => void;
}

export default function QASummary({ correct, total, onRestart }: IProps) {
  return (
    <div>
      <h3>Summary</h3>
      <SummaryItem label="Correct" value={correct + ""} />
      <SummaryItem label="Wrong" value={total - correct + ""} />
      <SummaryItem label="Questions answered" value={total + ""} />
      <SummaryItem
        label="Final Score"
        value={Math.floor((correct * 100) / total) + "%"}
      />
      <button className="primary-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div style={{ marginTop: "5px" }}>
      <label>
        {label}:<span style={{ fontWeight: "bold" }}>{value}</span>
      </label>
    </div>
  );
}
