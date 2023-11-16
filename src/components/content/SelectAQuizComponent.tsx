import { gameStore } from '@store/game';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from './Footer';

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
    if (selectedNumber < 0) {
      setSelectedNumber(0);
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
    <div className="flex flex-col gap-4 lg:w-7/12 jlace-content-center p-4">
      <span className="font-bold text-2xl text-white">QuizWizGo Settings</span>
      <span className="text-white">Number of Questions:</span>
      <input
        type="number"
        value={selectedNumber}
        onChange={(e) => handleSelectNumberFunc(Number(e.target.value))}
        className="border text-button-text border-background p-2 rounded-md text-sm outline-none "
        placeholder="Enter a number"
      />
      <span className="text-white">Select Category:</span>
      <select
        value={selectedCategory.id || ''}
        onChange={(e) => handleSelectCategoryFunc(e.target.value)}
        className="border text-button-text border-background p-2 rounded-md text-sm outline-none"
      >
        {category.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category}
          </option>
        ))}
      </select>
      <span className="text-white">Select Difficulty:</span>
      <select
        value={selectedDifficulty.id || ''}
        onChange={(e) => handleSelectDifficultyFunc(e.target.value)}
        className="border text-button-text border-background p-2 rounded-md text-sm outline-none"
      >
        {difficulty.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.difficulty}
          </option>
        ))}
      </select>
      <span className="text-white">Select Type:</span>
      <select
        value={selectedType.id || ''}
        onChange={(e) => handleSelectTypeFunc(e.target.value)}
        className="border text-button-text border-background p-2 rounded-md text-sm outline-none"
      >
        {type.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.type}
          </option>
        ))}
      </select>
      <div className="px-10">
        <ul className="text-yellow text-sm">
          <li className="list-disc">
            Passing rate is 75%, and achieving it will display 🎉 confetti.
          </li>
          <li className="list-disc">
            Complete each question within a 15-second timer. Keep an eye on the
            clock! ⏱️
          </li>
          <li className="list-disc">
            Above all, enjoy the QuizWizGo experience! Have fun challenging
            yourself. 😊🧠
          </li>
        </ul>
      </div>
      <div className="lg:py-4">
        <button
          onClick={handleStartQuiz}
          className="w-full rounded-2xl hover:bg-light hover:text-dark p-3 px-20 bg-yellow font-bold"
        >
          Let&apos;s Start
        </button>
      </div>
    </div>
  );
};

export { SelectAQuizComponent };
