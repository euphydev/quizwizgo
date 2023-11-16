import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { gameStore } from '@store/game';
import queryFunctions from '../../utils/_queryProvider';
import { Spinner } from '@components/ui';

interface QuizGameType {
  endpoint: string;
}

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_options?: string[];
}

interface AnswerObject {
  index: number;
  answer: string;
  correct_answer: string;
}

const QuizGame: React.FC<QuizGameType> = (props) => {
  const router = useRouter();
  const useGameStore = gameStore();
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerObject[]>([]);

  const [timer, setTimer] = useState(10);
  const [duration, setDuration] = useState(60);
  const {
    data: fetchedQuizData,
    refetch,
    isSuccess,
    isLoading,
    isError,
  } = queryFunctions.useGetQuizDataQuery(props.endpoint);

  useEffect(() => {
    const intervalID = startTimer();
    return () => clearInterval(intervalID);
  }, []);

  const startTimer = () =>
    setInterval(
      () => setTimer((prevTimer) => Math.max(0, prevTimer - 1)),
      1000,
    );

  useEffect(() => {
    useGameStore.setNumberOfQuestions(quizData.length);
    setTimer(quizData.length * 15);
    setDuration(quizData.length * 15);
  }, [quizData]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSelectedAnswer = (answer: string) => {
    const newAnswerObject: AnswerObject = {
      index: currentQuestionIndex,
      answer,
      correct_answer: quizData[currentQuestionIndex].correct_answer,
    };

    const existingIndex = selectedAnswers.findIndex(
      (ans) => ans.index === currentQuestionIndex,
    );

    if (existingIndex !== -1) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[existingIndex] = newAnswerObject;
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers((prevAnswers) => [...prevAnswers, newAnswerObject]);
    }
  };

  const handleSubmit = () => {
    const count = selectedAnswers.reduce(
      (acc, answer) => acc + (answer.correct_answer === answer.answer ? 1 : 0),
      0,
    );

    setSelectedAnswers([]);
    useGameStore.setTotalScore(count);
    router.push('/leaderboard');
  };

  const shuffleOptionsForQuestions = (questions: Question[]) => {
    return questions.map((question) => {
      const options = [...question.incorrect_answers, question.correct_answer];
      question.shuffled_options = shuffleArray(options);
      return question;
    });
  };
  const shuffleArray = (array: any) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    if (isSuccess) {
      const shuffledQuizData = shuffleOptionsForQuestions(
        fetchedQuizData.results,
      );
      setQuizData(shuffledQuizData);
    }
  }, [props.endpoint, isSuccess, fetchedQuizData]);

  const progress = ((duration - timer) / duration) * 251.2;

  if (isLoading) {
    return (
      <div className="flex flex-col w-full pt-10 min-h-screen gap-10  bg-main place-content-start text-button-text p-4">
        <Spinner />
        <div className="self-center flex flex-col gap-2 text-center pt-20">
          <span className="text-white font-bold text-3xl">Loading...</span>
          <span className="text-white font-bold text-md">
            QuizWizGo Data is sourced from{' '}
            <a
              className="underline text-blue-200"
              target="_blank"
              href="https://opentdb.com/"
            >
              opentdb.com
            </a>
          </span>
          <span className="text-light font-bold text-sm">
            If the loading persists, there might be a temporary issue with the
            data source.
          </span>
          <span className="text-white font-bold tet-md">
            Please try again later.
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col w-full text-center pt-10 min-h-screen gap-5 bg-main font-bold text-white place-content-center p-4">
        <span className=" text-2xl text-button">
          Apologies, an error occurred. This could be due to an issue with the
          API.
        </span>
        <span className="text-white font-bold text-md">
          Quiz data is sourced from{' '}
          <a className="underline text-blue-200" href="https://opentdb.com/">
            opentdb.com
          </a>
        </span>
        <button
          onClick={() => refetch()}
          className="bg-light self-center font-bold w-56 hover:bg-button rounded-md p-1 px-4 text-background"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:w-7/12 pt-10 min-h-screen gap-2 text-button-text place-content-start p-4">
        <div className="flex self-center ">
          <span className="text-sm font-bold">
            {currentQuestionIndex + 1}/{quizData.length}
          </span>
        </div>
        <div className="pt-14">
          {quizData.map((questionData: Question, index: number) => (
            <div
              key={index}
              className={`${index === currentQuestionIndex ? '' : 'hidden'}`}
            >
              <div className="flex relative items-center justify-center ">
                <div className="absolute top-[-50px] w-20 h-20 bg-secondary rounded-full">
                  <svg
                    className="absolute top-0 left-0 "
                    viewBox="0 0 100 100"
                    width="90"
                    height="90"
                  >
                    <circle
                      cx="45"
                      cy="45"
                      r="40"
                      fill="none"
                      strokeWidth="10"
                      stroke="#ABD1C6"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r="40"
                      fill="none"
                      strokeWidth="10"
                      stroke="#004643B2"
                      strokeDasharray="251.2"
                      strokeDashoffset={progress}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-blue-500">
                    <span className="font-bold text-lg text-background">
                      {timer}
                    </span>
                    <span className="text-xs text-background">seconds</span>
                  </div>
                </div>
              </div>
              <div className="container bg-secondary py-10 text-stroke shadow-bottom-right p-3 rounded-xl">
                <span className="font-bold">
                  {questionData.question
                    .replace(/&#039;/g, "'")
                    .replace(/&rsquo;/g, '’')
                    .replace(/&quot;/g, '"')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&copy;/g, '©')
                    .replace(/&euro;/g, '€')
                    .replace(/&reg;/g, '®')
                    .replace(/&hellip;/g, '…')}
                </span>
              </div>
              <ul className="py-5">
                {questionData.shuffled_options?.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    onClick={() => handleSelectedAnswer(option)}
                    className={`btn flex justify-between hover:bg-button-3 text-md bg-secondary my-2 pr-3 pl-2 rounded-xl ${
                      selectedAnswers[currentQuestionIndex] &&
                      selectedAnswers[currentQuestionIndex].answer === option
                        ? 'selected' // Apply a 'selected' class for styling
                        : ''
                    }`}
                  >
                    <label className="p-2 flex items-center w-full justify-between">
                      {option
                        .replace(/&#039;/g, "'")
                        .replace(/&rsquo;/g, '’')
                        .replace(/&quot;/g, '"')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&nbsp;/g, ' ')
                        .replace(/&copy;/g, '©')
                        .replace(/&euro;/g, '€')
                        .replace(/&reg;/g, '®')
                        .replace(/&hellip;/g, '…')}
                      {selectedAnswers[currentQuestionIndex] &&
                        selectedAnswers[currentQuestionIndex].answer ===
                          option && (
                          <Image
                            width={12}
                            height={0}
                            priority
                            sizes="(max-width: 400px) 100vw, 100"
                            className=""
                            style={{
                              backgroundColor: '#004643B2',
                              borderRadius: '50%',
                            }}
                            src="/check.svg"
                            alt="choice"
                          />
                        )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <span className="text-main font-semibold text-center justify-between">
              Your score matters! Share a screenshot, give feedback on
              QuizWizGo&apos;s soft launch! Use{' '}
              <span className="text-yellow">#euphydevQuizWizGo</span> & let
              others see your achievement.
            </span>
          </div>
          <div className="flex gap-4 p-4 justify-between font-semibold">
            <button
              onClick={handleBackQuestion}
              className="hover:bg-button-3 w-full bg-secondary text-background rounded-md p-1 px-4"
            >
              Back
            </button>
            {currentQuestionIndex + 1 !== quizData.length ? (
              <button
                onClick={handleNextQuestion}
                className="bg-light w-full hover:bg-button rounded-md p-1 px-4 text-background"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-light w-full hover:bg-button rounded-md p-1 px-4 text-background"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { QuizGame };
