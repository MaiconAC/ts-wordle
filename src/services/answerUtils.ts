import wordsJson from './wordsJson.json';

export function drawAnswer() {
  // Sorteia um numero de 0 a 50
  const drawNumber = Math.floor(Math.random() * 50);
  const wordData = wordsJson[drawNumber];

  return wordData.text;
}
