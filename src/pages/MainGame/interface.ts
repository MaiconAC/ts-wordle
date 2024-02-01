interface ISelectedWordData {
  letters: string[];
  indexPosition: number;
}

interface IBoardLetterData {
  text?: string;
  type?: string;
}

interface IBoardRowData {
  letters: IBoardLetterData[];
}

interface IWarningData {
  header: string;
  content: string;
}

export type {
  ISelectedWordData,
  IBoardLetterData,
  IBoardRowData,
  IWarningData,
};
