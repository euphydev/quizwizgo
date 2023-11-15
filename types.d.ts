export type gameSettings = {
  numberOfQuestions: number;
  category: categorySettings;
  difficulty: difficultySettings;
  type: typeSettings;
};

export type categorySettings = {
  id: number;
  category: string;
};
export type difficultySettings = {
  id: string;
  difficulty: string;
};
export type typeSettings = {
  id: string;
  type: string;
};
