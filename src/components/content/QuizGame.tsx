import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { gameStore } from '@store/game';
import queryFunctions from '../../utils/_queryProvider';
import { Spinner, FlipTile } from '@components/ui';

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col place-content-start gap-10 bg-ink p-4 pt-10 text-paper">
        <Spinner />
        <div className="flex flex-col gap-2 self-center pt-20 text-center">
          <span className="font-display text-3xl font-bold text-paper">
            Shuffling your questions&hellip;
          </span>
          <span className="font-sans text-sm text-slate">
            Questions come from{' '}
            <a
              className="text-marquee underline"
              target="_blank"
              rel="noreferrer"
              href="https://opentdb.com/"
            >
              opentdb.com
            </a>
            .
          </span>
          <span className="font-sans text-sm text-slate">
            Taking a while? The source might be slow right now &mdash; sit
            tight.
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen w-full flex-col place-content-center gap-5 bg-ink p-4 pt-10 text-center">
        <span className="font-display text-2xl font-bold text-ember">
          Couldn&apos;t load your quiz.
        </span>
        <span className="font-sans text-sm text-slate">
          The question source might be down. Quiz data comes from{' '}
          <a className="text-marquee underline" href="https://opentdb.com/">
            opentdb.com
          </a>
          .
        </span>
        <button
          onClick={() => refetch()}
          className="w-56 self-center rounded-lg bg-marquee p-2 px-4 font-sans font-semibold text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5"
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="flex min-h-screen flex-col place-content-start gap-4 p-4 pt-10 lg:w-7/12">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-xs text-slate">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </span>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-ink-2">
            <div
              className="h-full bg-mint transition-[width]"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / quizData.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <FlipTile value={timer} digits={3} label="seconds left" />
        </div>
        <div>
          {quizData.map((questionData: Question, index: number) => (
            <div
              key={index}
              className={`${index === currentQuestionIndex ? '' : 'hidden'}`}
            >
              <div className="ticket-edge rounded-lg bg-paper p-5 pt-6 text-ink shadow-ticket">
                <span className="font-sans font-semibold">
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
              <ul className="flex flex-col gap-2 py-5">
                {questionData.shuffled_options?.map((option, optionIndex) => {
                  const isSelected =
                    selectedAnswers[currentQuestionIndex] &&
                    selectedAnswers[currentQuestionIndex].answer === option;
                  return (
                    <li
                      key={optionIndex}
                      onClick={() => handleSelectedAnswer(option)}
                      className={`cursor-pointer rounded-lg border px-4 py-3 font-sans text-ink transition-colors ${
                        isSelected
                          ? 'border-marquee bg-marquee/20'
                          : 'border-transparent bg-paper hover:border-marquee/40'
                      }`}
                    >
                      <label className="flex w-full cursor-pointer items-center justify-between gap-3">
                        <span>
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
                        </span>
                        {isSelected && (
                          <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-marquee">
                            <Image
                              width={14}
                              height={14}
                              src="/check.svg"
                              alt="Selected"
                            />
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-center font-sans text-sm text-slate">
            Screenshot your score and tag{' '}
            <span className="text-marquee">#euphydevQuizWizGo</span> &mdash;
            we want to see it.
          </span>
          <div className="flex justify-between gap-4 font-sans font-semibold">
            <button
              onClick={handleBackQuestion}
              className="w-full rounded-lg border border-slate/40 p-2 px-4 text-paper hover:border-marquee"
            >
              Back
            </button>
            {currentQuestionIndex + 1 !== quizData.length ? (
              <button
                onClick={handleNextQuestion}
                className="w-full rounded-lg bg-marquee p-2 px-4 text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-marquee p-2 px-4 text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5"
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
