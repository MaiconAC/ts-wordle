import { IBoardCellData } from '../pages/MainGame/interface';
import { wordsList } from './wordsList';

export function handleDrawAnswer() {
  // Sorteia um numero de 0 a 999
  const drawnNumber = Math.floor(Math.random() * 999);
  const wordsData = new Array(...wordsList);

  return wordsData[drawnNumber].toLocaleUpperCase();
}

export function getStatus(
  attemptLetters: string[],
  answer: string,
): IBoardCellData[] {
  const response: IBoardCellData[] = [];
  // Verifica cada letra da palavra
  for (const [index, letterSent] of attemptLetters.entries()) {
    if (letterSent === answer.charAt(index)) {
      response.push({
        letter: letterSent,
        status: 'correct',
      });
    } else if (answer.includes(letterSent)) {
      response.push({
        letter: letterSent,
        status: 'semi-correct',
      });
    } else {
      response.push({
        letter: letterSent,
        status: 'wrong',
      });
    }
  }

  return response;
}

export function initializeBoard(): IBoardCellData[][] {
  const initialBoard: IBoardCellData[][] = [];

  for (let i = 0; i < 6; i++) {
    const row: IBoardCellData[] = [];

    for (let j = 0; j < 5; j++) {
      row.push({ letter: '', status: 'locked' });
    }

    initialBoard.push(row);
  }

  return initialBoard;
}
