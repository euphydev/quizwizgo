import { gameStore } from '@store/game';
import { useRouter } from 'next/router';
import { userStore } from '@store/user';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { gameSettings } from '../../types';

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

    const threshold_25 = totalScore * 0.25;
    const threshold_50 = totalScore * 0.5;
    const threshold_75 = totalScore * 0.75;

    if (totalScore <= threshold_25) {
      setMessage("You're getting there, but no confetti yet!");
    } else if (totalScore > threshold_25 && totalScore <= threshold_50) {
      setMessage('Halfway through! No confetti for now.');
    } else if (totalScore > threshold_50 && totalScore <= threshold_75) {
      setMessage('Almost there! Just a bit more for the confetti.');
    } else {
      setMessage("CONGRATULATIONS, You've earned a confetti!");
      setIsConfettiActive(true);
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000);
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 m-10 justify-center">
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
  );
};

export default Leaderboard;
