import React from "react";
import { BsFillAlarmFill } from "react-icons/bs";

const Quiz = ({
  quizDataQuestions,
  question,
  currentQuestion,
  options,
  onSelectAnswer,
  goPrevious,
  goNext,
  onQuizSubmit,
  totalQuestions,
  minutes,
  seconds,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-center font-semibold text-2xl text-blue-900">
          Attempt Questions Here
        </h1>
        <p className="flex items-center">
          <BsFillAlarmFill className="mr-2 h-5 text-blue-900" />{" "}
          <span>
            {minutes} min : {seconds} sec
          </span>
        </p>
      </div>

      <p className="mt-7">
        Q.{currentQuestion + 1} {question}
      </p>
      <div className="my-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onSelectAnswer(index)}
            className="mb-1 flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
          >
            <input
              type="radio"
              name={`q-${currentQuestion}`}
              value={option}
              checked={
                quizDataQuestions[currentQuestion].answers[
                  quizDataQuestions[currentQuestion].userResponse
                ] === option
              }
              className="mr-2"
              // onChange={() => onSelectAnswer(index)}
            />
            <p className="">{option}</p>
          </div>
        ))}
      </div>
      <div className="flex  text-white">
        <button
          disabled={currentQuestion < 1}
          className={`${
            currentQuestion < 1 ? "opacity-40 cursor-not-allowed" : ""
          } bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          onClick={() => goPrevious()}
        >
          Go Previous
        </button>

        {totalQuestions - 1 === currentQuestion ? (
          <button
            disabled={quizDataQuestions[currentQuestion].userResponse === null}
            className={`${
              quizDataQuestions[currentQuestion].userResponse === null
                ? "opacity-40 cursor-not-allowed"
                : ""
            } bg-blue-700 ml-auto hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            onClick={() => onQuizSubmit()}
          >
            Submit
          </button>
        ) : (
          <button
            disabled={quizDataQuestions[currentQuestion].userResponse === null}
            className={`${
              quizDataQuestions[currentQuestion].userResponse === null
                ? "opacity-40 cursor-not-allowed"
                : ""
            } bg-blue-700 ml-auto hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            onClick={() => goNext()}
          >
            Go Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
