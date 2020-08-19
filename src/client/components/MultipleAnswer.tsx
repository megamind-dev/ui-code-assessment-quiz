import React from "react";
import { AllHtmlEntities } from "html-entities";

interface IProps {
  answers: string[];
  setAnswer: (answer: string) => void;
}

export default function MultipleAnswer({ answers, setAnswer }: IProps) {
  const entities = new AllHtmlEntities();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(evt.target.value);

  return (
    <div>
      {answers.map((e, idx) => (
        <div key={e + idx}>
          <label>
            <input
              type="radio"
              value={e}
              name="answer"
              onChange={handleChange}
            />
            {entities.decode(e)}
          </label>
        </div>
      ))}
    </div>
  );
}
