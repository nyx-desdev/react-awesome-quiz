import React from "react";
import { TiTickOutline } from "react-icons/ti";

const QuizResult = ({ totalQuestions, correctCount }) => {
  return (
    <div>
      <span className="flex items-center justify-center">
        <TiTickOutline className="text-8xl text-green-400" />
      </span>
      <p className="text-center text-blue-900 font-semibold text-2xl my-7">
        You have successfully submitted the Assignment
      </p>
      <p className="text-center text-blue-900 my-4">
        Question Asked: {totalQuestions}
      </p>
      <p className="text-center text-blue-900 my-4">
        Question Correct: {correctCount}
      </p>
      <p className="text-center text-blue-900 my-4">
        Your Score: {((correctCount / totalQuestions) * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default QuizResult;
