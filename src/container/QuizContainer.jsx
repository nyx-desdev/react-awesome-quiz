import React, { useState, useEffect } from "react";
import Quiz from "../components/Quiz/Quiz";
import QuizResult from "../components/Quiz/QuizResult";
import QuizData from "../QuizData";
import ReviewBoard from "../components/Quiz/ReviewBoard";

const QuizContainer = () => {
  const [quizDataQuestions, setQuizDataQuestions] = useState(
    QuizData.questions
  );
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeAlloted, setTimeAlloted] = useState(QuizData.timeAlloted);

  useEffect(() => {
    const quizTime = Date.now() + QuizData.timeAlloted;
    const quizTimeId = setInterval(() => {
      const quizTimeLeft = quizTime - Date.now();
      if (quizTimeLeft <= 0) {
        clearInterval(quizTimeId);
        setTimeAlloted(0);
        onQuizSubmit();
        console.log("done");
      } else {
        setTimeAlloted(quizTimeLeft);
      }
    }, 1000);
    return () => {
      clearInterval(quizTimeId);
    };
  }, []);

  const minutes = Math.floor(timeAlloted / 1000 / 60);
  const seconds = Math.floor((timeAlloted / 1000) % 60);

  const goPrevious = () => {
    console.log("going previous");
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const goNext = () => {
    console.log("going next");
    if (currentQuestion < quizDataQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const onSelectAnswer = (option) => {
    let updateQuizData = [...quizDataQuestions];
    updateQuizData[currentQuestion].userResponse = option;
    setQuizDataQuestions(updateQuizData);
  };

  const calculateScore = () => {
    let updateQuizData = [...quizDataQuestions];
    let count = 0;
    for (let i = 0; i < updateQuizData.length; i++) {
      if (updateQuizData[i].correctAnswer === updateQuizData[i].userResponse) {
        count++;
      }
    }
    setCorrectCount(count);
  };

  const onQuizSubmit = () => {
    console.log("quiz submitted");
    calculateScore();
    setIsQuizSubmitted(true);
  };
  return (
    <>
      <h1 className="text-center font-bold text-4xl p-10 text-blue-900">
        Welcome to the Quiz
      </h1>

      {!isQuizSubmitted ? (
        <div className="flex flex-col w-full justify-center md:flex-row p-5">
          <div className="bg-white p-5 rounded-lg md:container w-full md:w-8/12 md:h-96 shadow-lg md:m-5">
            <Quiz
              timeAlloted={timeAlloted}
              quizDataQuestions={quizDataQuestions}
              question={quizDataQuestions[currentQuestion].question}
              totalQuestions={quizDataQuestions.length}
              options={quizDataQuestions[currentQuestion].answers}
              currentQuestion={currentQuestion}
              onSelectAnswer={onSelectAnswer}
              goPrevious={goPrevious}
              goNext={goNext}
              onQuizSubmit={onQuizSubmit}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
          <div className="bg-white p-5 rounded-lg md:container w-full md:w-60 h-96 shadow-lg mt-5 md:m-5">
            <ReviewBoard quizDataQuestions={quizDataQuestions} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center md:flex-row p-5">
          <div className="bg-white p-5 rounded-lg md:container w-full md:w-8/12 h-96 shadow-lg">
            <QuizResult
              totalQuestions={quizDataQuestions.length}
              correctCount={correctCount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizContainer;
