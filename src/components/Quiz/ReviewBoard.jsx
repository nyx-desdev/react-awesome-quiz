import React from "react";

const ReviewBoard = ({ quizDataQuestions, changeQuestion }) => {
  return (
    <>
      <h1 className="text-center font-semibold text-2xl mb-10 text-blue-900">
        Review Board
      </h1>
      {quizDataQuestions.map((answer, index) => (
        <div key={index}>
          {answer.userResponse !== null && (
            <p onClick={() => changeQuestion(answer.id)}>
              {index + 1}. {answer.answers[answer.userResponse]}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default ReviewBoard;
