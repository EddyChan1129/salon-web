"use client";

import Link from "next/link";
import { useState } from "react";
import { shapes } from "../salon";
import { FaceDrawing } from "./editorial";

const questions = [
  {
    title: "How long does your face look compared to its width?",
    answers: [
      ["About as long as it is wide", ["round", "square"]],
      ["A little longer than it is wide", ["oval", "heart", "diamond"]],
      ["Noticeably longer than it is wide", ["long"]],
    ],
  },
  {
    title: "Which part of your face looks widest?",
    answers: [
      ["Forehead", ["heart"]],
      ["Cheekbones", ["oval", "round", "diamond"]],
      ["The sides look similar in width", ["square", "long"]],
    ],
  },
  {
    title: "How would you describe your jawline?",
    answers: [
      ["Softly rounded", ["oval", "round", "long"]],
      ["Defined or angular", ["square"]],
      ["Tapered towards the chin", ["heart", "diamond"]],
    ],
  },
] satisfies { title: string; answers: [string, string[]][] }[];

export function ShapeQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const question = questions[answers.length];
  const outcome = shapes.map((shape) => ({
    ...shape,
    score: answers.filter((answer, index) => questions[index].answers[answer][1].includes(shape.id)).length,
  })).sort((a, b) => b.score - a.score);
  const matches = outcome.filter((shape) => shape.score === outcome[0].score);

  return (
    <section className="quiz-section section-pad" id="quiz">
      <div className="frame quiz-layout">
        <div className="section-heading">
          <p className="eyebrow">Face shape questionnaire</p>
          <h2>Look a little<br /><em>closer.</em></h2>
          <p>Pull your hair back and check your outline in a mirror. Choose the closest answer for each feature.</p>
        </div>
        <div className="quiz-panel">
          {question ? (
            <form onSubmit={(event) => {
              event.preventDefault();
              if (choice === null) return;
              setAnswers([...answers, choice]);
              setChoice(null);
            }}>
              <p className="fine-print" aria-live="polite">Question {answers.length + 1} of {questions.length}</p>
              <fieldset>
                <legend>{question.title}</legend>
                {question.answers.map(([label], index) => (
                  <label className="choice" key={label}>
                    <input name="shape-answer" type="radio" checked={choice === index} onChange={() => setChoice(index)} />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
              <div className="form-actions">
                {answers.length > 0 && <button type="button" className="text-link" onClick={() => {
                  setChoice(answers[answers.length - 1]);
                  setAnswers(answers.slice(0, -1));
                }}>Back</button>}
                <button type="submit" className="button button-dark" disabled={choice === null}>{answers.length === questions.length - 1 ? "See my result" : "Continue"}</button>
              </div>
            </form>
          ) : (
            <div aria-live="polite">
              <p className="fine-print">Your closest {matches.length === 1 ? "match" : "matches"}</p>
              <div className="quiz-matches">
                {matches.map((shape) => <Link href={`/discover/${shape.id}`} key={shape.id}><FaceDrawing shape={shape.id} /><span>{shape.name}</span></Link>)}
              </div>
              <p>Face shapes often overlap. Use these guides to explore the features you’d like to highlight.</p>
              <button type="button" className="text-link" onClick={() => setAnswers([])}>Start again</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
