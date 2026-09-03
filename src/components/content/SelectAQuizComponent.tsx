import { gameStore } from '@store/game';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import { ChipGroup } from '@components/ui';

const category = [
  { id: 1, category: 'Any Category' },
  { id: 9, category: 'General Knowledge' },
  { id: 17, category: 'Science & Nature' },
  { id: 27, category: 'Animals' },
  { id: 20, category: 'Mythodology' },
  { id: 26, category: 'Celebrities' },
  { id: 21, category: 'Sports' },
];
const difficulty = [
  { id: 'any', difficulty: 'Any Difficulty' },
  { id: 'easy', difficulty: 'Easy' },
  { id: 'medium', difficulty: 'Medium' },
  { id: 'hard', difficulty: 'Hard' },
];
const type = [
  { id: 'any', type: 'Any Type' },
  { id: 'multiple', type: 'Multiple Choice' },
  { id: 'boolean', type: 'True or False' },
];

interface CatType {
  id: number;
  category: string;
}
interface DiffType {
  id: string;
  difficulty: string;
}
interface TypeType {
  id: string;
  type: string;
}

interface SelectAQuizType {
  activeModal: (activeModal: string) => void;
  endPoint: (endpoint: any) => void;
}

const SelectAQuizComponent: React.FC<SelectAQuizType> = (props) => {
  const useGameStore = gameStore();
  const [selectedNumber, setSelectedNumber] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<CatType>({
    id: 1,
    category: 'Any Category',
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<DiffType>({
    id: 'any',
    difficulty: 'Any Difficulty',
  });
  const [selectedType, setSelectedType] = useState<TypeType>({
    id: 'any',
    type: 'Any Type',
  });

  const handleSelectNumberFunc = (selectedNumber: number) => {
    if (selectedNumber <= 0) {
      setSelectedNumber(5);
    } else if (selectedNumber > 50) {
      setSelectedNumber(50);
    } else {
      setSelectedNumber(selectedNumber);
    }
  };
  const handleSelectCategoryFunc = (selectedID: string) => {
    const selectedCat = category.find((cat) => cat.id === Number(selectedID));
    setSelectedCategory(selectedCat || { id: 1, category: 'Any Category' });
  };

  const handleSelectDifficultyFunc = (selectedID: string) => {
    const selectedDifficulty = difficulty.find(
      (diff) => diff.id === selectedID,
    );
    setSelectedDifficulty(
      selectedDifficulty || { id: 'any', difficulty: 'Any Difficulty' },
    );
  };

  const handleSelectTypeFunc = (selectedID: string) => {
    const selectedType = type.find((type) => type.id === selectedID);
    setSelectedType(selectedType || { id: 'any', type: 'Any Type' });
  };

  useEffect(() => {
    useGameStore.setQuizSettings({
      numberOfQuestions: selectedNumber,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      type: selectedType,
    });
  }, [selectedCategory, selectedDifficulty, selectedNumber, selectedType]);

  const handleStartQuiz = () => {
    fetchQuizData();
    props.activeModal('quiz-game-ready');
  };

  const fetchQuizData = async () => {
    let amount = `amount=${useGameStore.quizSettings.numberOfQuestions}`;
    let category = '';
    let difficulty = '';
    let type = '';
    if (useGameStore.quizSettings.category.id !== 1) {
      category = `&category=${useGameStore.quizSettings.category.id}`;
    }

    if (useGameStore.quizSettings.difficulty.id !== 'any') {
      difficulty = `&difficulty=${useGameStore.quizSettings.difficulty.id}`;
    }

    if (useGameStore.quizSettings.type.id !== 'any') {
      type = `&type=${useGameStore.quizSettings.type.id}`;
    }

    if (category === '' && difficulty === '' && type === '' && amount !== '') {
      amount = `amount=${useGameStore.quizSettings.numberOfQuestions}`;
    }
    const endpoint = `${amount}${category}${difficulty}${type}`;
    props.endPoint(endpoint);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:w-7/12">
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Round setup
      </h2>

      <div className="flex flex-col gap-2">
        <span className="font-sans text-sm text-paper">
          Number of questions
        </span>
        <div className="flex w-40 items-center gap-2">
          <button
            type="button"
            aria-label="Fewer questions"
            onClick={() => handleSelectNumberFunc(selectedNumber - 1)}
            className="h-10 w-10 rounded-lg border border-slate/40 font-display text-xl text-paper hover:border-marquee"
          >
            −
          </button>
          <input
            type="number"
            value={selectedNumber}
            onChange={(e) => handleSelectNumberFunc(Number(e.target.value))}
            className="ticket-edge h-10 w-full rounded-lg bg-paper text-center font-display text-lg text-ink shadow-ticket outline-none focus-visible:ring-2 focus-visible:ring-marquee"
          />
          <button
            type="button"
            aria-label="More questions"
            onClick={() => handleSelectNumberFunc(selectedNumber + 1)}
            className="h-10 w-10 rounded-lg border border-slate/40 font-display text-xl text-paper hover:border-marquee"
          >
            +
          </button>
        </div>
      </div>

      <ChipGroup
        name="category"
        legend="Category"
        value={String(selectedCategory.id)}
        onChange={handleSelectCategoryFunc}
        options={category.map((cat) => ({
          id: String(cat.id),
          label: cat.category,
        }))}
      />

      <ChipGroup
        name="difficulty"
        legend="Difficulty"
        value={selectedDifficulty.id}
        onChange={handleSelectDifficultyFunc}
        options={difficulty.map((diff) => ({
          id: diff.id,
          label: diff.difficulty,
        }))}
      />

      <ChipGroup
        name="type"
        legend="Question type"
        value={selectedType.id}
        onChange={handleSelectTypeFunc}
        options={type.map((t) => ({ id: t.id, label: t.type }))}
      />

      <ul className="flex flex-col gap-1.5 font-sans text-sm text-slate">
        <li>Score 75% or better and the confetti comes out.</li>
        <li>Each question gives you 15 seconds &mdash; the clock is the real opponent.</li>
        <li>Everything else is just for fun.</li>
      </ul>

      <button
        onClick={handleStartQuiz}
        className="w-full rounded-lg bg-marquee p-3 font-sans font-semibold text-ink transition-transform hover:bg-marquee-dark active:translate-y-0.5 lg:mt-2"
      >
        Let&apos;s start
      </button>
    </div>
  );
};

export { SelectAQuizComponent };
