import { gameStore } from '@store/game';
import { useRouter } from 'next/router';
import { userStore } from '@store/user';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { gameSettings } from '../../types';
import Footer from '@components/content/Footer';
import { FlipTile } from '@components/ui';

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
  const [quizSettings, setQuizSettings] = useState<gameSettings>();
  const [quizResults, setQuizResults] = useState<{
    totalScore: number;
    noOfQuestions: number;
  }>({
    totalScore: 0,
    noOfQuestions: 0,
  });
  const useGameStore = gameStore();
  const router = useRouter();
  const store = userStore();
  const game = gameStore();

  useEffect(() => {
    if (store.userName === '') {
      router.push('/');
    }

    setQuizResults({
      totalScore: useGameStore.totalScore,
      noOfQuestions: useGameStore.numberOfQuestions,
    });
    setQuizSettings(useGameStore.quizSettings);

    const totalScore = useGameStore.totalScore;
    const noOfQuestions = Number(useGameStore.numberOfQuestions);
    const threshold_25 = noOfQuestions * 0.25;
    const threshold_50 = noOfQuestions * 0.5;
    const threshold_75 = noOfQuestions * 0.75;

    let message = '';
    if (totalScore === 0) {
      message = "No confetti this round. Here's an egg instead. 🥚";
    } else if (totalScore <= threshold_25) {
      message = 'Warming up. Give it another go.';
    } else if (totalScore >= threshold_25 && totalScore <= threshold_50) {
      message = 'Halfway there.';
    } else if (totalScore >= threshold_50 && totalScore <= threshold_75) {
      message = 'So close to confetti.';
    } else if (totalScore >= threshold_75) {
      message = 'Confetti earned. Nice work. 🎉';
      setIsConfettiActive(true);
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000);
    }

    setMessage(message);
  }, []);

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-6 text-center">
        {isConfettiActive && <Confetti />}
        <span className="font-sans text-lg text-slate">
          {store.userName}&apos;s score
        </span>
        <div className="flex items-end gap-2">
          <FlipTile
            value={quizResults.totalScore}
            digits={2}
            accent="mint"
          />
          <span className="pb-3 font-display text-3xl text-slate">/</span>
          <span className="pb-1 font-display text-4xl font-bold text-paper">
            {quizResults.noOfQuestions}
          </span>
        </div>
        {quizSettings && (
          <div className="flex w-full flex-col gap-2 text-left text-xs sm:flex-row sm:flex-wrap sm:justify-center">
            <div className="ticket-edge w-full rounded-lg bg-paper p-3 text-ink shadow-ticket sm:w-[45%]">
              <span className="text-slate">Category </span>
              <span>{quizSettings.category.category}</span>
            </div>
            <div className="ticket-edge w-full rounded-lg bg-paper p-3 text-ink shadow-ticket sm:w-[45%]">
              <span className="text-slate">Difficulty </span>
              <span>{quizSettings.difficulty.difficulty}</span>
            </div>
            <div className="ticket-edge w-full rounded-lg bg-paper p-3 text-ink shadow-ticket sm:w-[45%]">
              <span className="text-slate">Questions </span>
              <span>{quizSettings.numberOfQuestions}</span>
            </div>
            <div className="ticket-edge w-full rounded-lg bg-paper p-3 text-ink shadow-ticket sm:w-[45%]">
              <span className="text-slate">Type </span>
              <span>{quizSettings.type.type}</span>
            </div>
          </div>
        )}
        <span className="font-display text-2xl font-bold text-paper">
          {message}
        </span>
        <button
          onClick={() => {
            store.setUserName('');
            game.setActiveModal('');
            game.setQuizSettings(defaultSettings);
            game.setTotalScore(0);
            router.push('/');
          }}
          className="w-full max-w-xs rounded-lg bg-marquee p-3 font-sans font-semibold text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5"
        >
          Try again
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;
