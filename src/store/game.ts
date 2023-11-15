import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { gameSettings } from '../../types';

type GameState = {
  activeModal: string;
  setActiveModal: (activeModal: string) => void;
  quizSettings: gameSettings;
  setQuizSettings: (quizSettings: gameSettings) => void;
  totalScore: number;
  setTotalScore: (totalScore: number) => void;
  numberOfQuestions: number;
  setNumberOfQuestions: (numberOfQuestions: number) => void;
};

const gameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        activeModal: '',
        setActiveModal: (activeModal: string) => set({ activeModal }),
        totalScore: 0,
        setTotalScore: (totalScore: number) => set({ totalScore }),
        numberOfQuestions: 0,
        setNumberOfQuestions: (numberOfQuestions: number) =>
          set({ numberOfQuestions }),
        quizSettings: {
          numberOfQuestions: 10,
          category: { id: 1, category: 'Any Category' },
          difficulty: {
            id: 'any',
            difficulty: 'Any Difficulty',
          },
          type: {
            id: 'any',
            type: 'Any Type',
          },
        },
        setQuizSettings: (quizSettings: gameSettings) => set({ quizSettings }),
      }),
      {
        name: 'user-store',
      },
    ),
  ),
);

export { gameStore };
