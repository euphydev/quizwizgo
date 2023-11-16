import { gameStore } from '@store/game';
import { useRouter } from 'next/router';
import { userStore } from '@store/user';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { gameSettings } from '../../types';
import Footer from '@components/content/Footer';

const defaultSettings: gameSettings = {
  numberOfQuestions: 10,
  category: {
    id: 1,
    category: 'Any Category',
  },
  difficulty: {
    id: 'any',
    difficulty: 'Any Difficulty',
  },
  type: {
    id: 'any',
    type: 'Any Type',
  },
};

const Leaderboard = () => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [message, setMessage] = useState('');
  const useGameStore = gameStore();
  const router = useRouter();
  const store = userStore();
  const game = gameStore();

  useEffect(() => {
    const totalScore = useGameStore.totalScore;
    const noOfQuestions = Number(useGameStore.numberOfQuestions);
    const threshold_25 = noOfQuestions * 0.25;
    const threshold_50 = noOfQuestions * 0.5;
    const threshold_75 = noOfQuestions * 0.75;
    const threshold_100 = noOfQuestions * 1;

    let message = '';
    if (totalScore === 0) {
      message = "No confetti for now, but here's an egg 🥚";
    } else if (totalScore <= threshold_25) {
      message = "You're getting there, but no confetti yet! 🌟";
    } else if (totalScore >= threshold_25 && totalScore <= threshold_50) {
      message = 'Halfway through! No confetti for now. 🎈';
    } else if (totalScore >= threshold_50 && totalScore <= threshold_75) {
      message = 'Almost there! Just a bit more for the confetti. 🎉';
    } else if (totalScore >= threshold_75) {
      message = "CONGRATULATIONS, You've earned a confetti! 🎊🎈🥳";
      setIsConfettiActive(true);
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000);
    }

    setMessage(message);
    console.log(
      'hey',
      totalScore,
      noOfQuestions,
      threshold_25,
      threshold_50,
      threshold_75,
    );
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 m-10 justify-center w-3/4">
        {isConfettiActive && <Confetti />}
        <span className="font-bold text-3xl  text-center self-center select-none">
          {store.userName}
          {`'`}s score:
        </span>
        <span className="font-bold text-6xl self-center select-none text-yellow">
          {useGameStore.totalScore}/{useGameStore.numberOfQuestions}
        </span>
        <div className="flex flex-col text-xs lg:flex-row lg:flex-wrap gap-2 lg:justify-center">
          <div className="w-full lg:w-[45%] bg-main rounded-lg p-3">
            <span className="">Category: </span>
            <span className="">
              {useGameStore.quizSettings.category.category}
            </span>
          </div>
          <div className="w-full lg:w-[45%] bg-main rounded-lg p-3">
            <span className="">Difficulty: </span>
            <span className="">
              {useGameStore.quizSettings.difficulty.difficulty}
            </span>
          </div>
          <div className="w-full lg:w-[45%] bg-main rounded-lg p-3">
            <span className="">No. of Qs: </span>
            <span className="">
              {useGameStore.quizSettings.numberOfQuestions}
            </span>
          </div>
          <div className="w-full lg:w-[45%] bg-main rounded-lg p-3">
            <span className="">Type: </span>
            <span className="">{useGameStore.quizSettings.type.type}</span>
          </div>
        </div>
        <span className="font-bold text-3xl self-center text-center select-none">
          {message}
        </span>
        <div className="w-1/2 self-center">
          <button
            onClick={() => {
              store.setUserName('');
              game.setActiveModal('');
              game.setQuizSettings(defaultSettings);
              game.setTotalScore(0);
              router.push('/');
            }}
            className="bg-light w-full font-bold hover:bg-button rounded-md p-1 px-4 text-background"
          >
            Try again.
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;
