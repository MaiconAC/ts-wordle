interface ILetterData {
  text?: string;
  type?: string;
}

interface IWordData {
  letters: ILetterData[];
}

interface IWarningData {
  header: string;
  content: string;
}

export type { IWordData, ILetterData, IWarningData };
