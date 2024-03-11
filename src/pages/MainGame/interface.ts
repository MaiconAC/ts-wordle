type LetterStatusType = 'correct' | 'semi-correct' | 'wrong' | 'locked';

interface ISelectedWordData {
  letters: string[];
  indexPosition: number;
}

interface IBoardCellData {
  letter: string;
  status: LetterStatusType;
}

interface IWarningData {
  header: string;
  content: string;
}

export type { ISelectedWordData, IWarningData, IBoardCellData };
