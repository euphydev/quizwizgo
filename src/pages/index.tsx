import {
  Introduction,
  QuizGame,
  SelectAQuizComponent,
} from '@components/content';
import { gameStore } from '@store/game';
import { userStore } from '@store/user';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { gameSettings } from '../../types';
import Footer from '@components/content/Footer';
import Head from 'next/head';
import { useMediaQuery } from '../utils/utils';

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

export default function Home() {
  const game = gameStore();
  const store = userStore();
  const [activeModal, setActiveModal] = useState('introduction');
  const [endpoint, setEndpoint] = useState('');
  const isBreakpoint = useMediaQuery(1024);

  const handleStartQuiz = (activeModal: string) => {
    setActiveModal(activeModal);
  };

  const handleLoadQuizData = async (value: any) => {
    console.log('value', value);

    setEndpoint(value);
  };

  useEffect(() => {
    store.setUserName('');
    game.setActiveModal('');
    game.setQuizSettings(defaultSettings);
    game.setTotalScore(0);
  }, []);

  return (
    <div transition-style="in:circle:hesitate bg-gray-300">
      <Head>
        <title>QuizWizGo | euphydev</title>
      </Head>
      {activeModal === 'introduction' && (
        <>
          <div className="bg-main h-screen w-screen lg:flex lg:justify-center">
            <Introduction activeModal={handleStartQuiz} />
          </div>
          <Footer />
        </>
      )}
      {activeModal === 'quiz-settings' && (
        <>
          <div className="bg-main h-screen w-screen lg:flex lg:justify-center">
            <SelectAQuizComponent
              activeModal={handleStartQuiz}
              endPoint={handleLoadQuizData}
            />
          </div>
          {!isBreakpoint && <Footer />}
        </>
      )}
      {activeModal === 'quiz-game-ready' && endpoint && (
        <div className="bg-gray-300 h-screen w-screen lg:flex lg:justify-center">
          <QuizGame endpoint={endpoint} />
        </div>
      )}
    </div>
  );
}
