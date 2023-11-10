interface ILetterData {
  text?: string;
  type?: string
}

interface IWordData {
  letters: ILetterData[]
}

export type { IWordData, ILetterData };
