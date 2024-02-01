import { wordsList } from './wordsList';

export function handleDrawAnswer() {
  // Sorteia um numero de 0 a 999
  const drawnNumber = Math.floor(Math.random() * 999);
  const wordsData = new Array(...wordsList);

  return wordsData[drawnNumber];
}
