import { Keyboard } from './Keyboard';
import wordsJson from '../../services/wordsJson.json';
import './styles.css';
import { useState } from 'react';
import { ILetterData, IWarningData, IWordData } from './interface';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { WarningToast } from '../../components/WarningToast';

export function MainGame() {
  const [attemptNumber, setAttemptNumber] = useState<number>(1);
  const [attemptWord, setAttemptWord] = useState<string>('');
  const [userWon, setUserWon] = useState<boolean>(false);
  const [wordsData, setWordsData] = useState<IWordData[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [warningData, setWarningData] = useState<IWarningData>(
    {} as IWarningData,
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const drawWord = () => {
    // Sorteia um numero de 0 a 50
    const drawNumber = Math.floor(Math.random() * 50);
    const wordData = wordsJson[drawNumber];

    return wordData.text;
  };

  const [answerWord, setAnswerWord] = useState<string>(drawWord);

  const openWarning = (data: IWarningData) => {
    setWarningData(data);
    setShowWarning(true);
  };

  const sendWord = () => {
    const lettersData: ILetterData[] = [];

    if (attemptWord.length < 5) {
      openWarning({
        header: 'Palavra inválida!',
        content: 'A palavra precisa ter 5 letras',
      });

      return;
    }

    // Verifica cada letra da palavra
    for (let i = 0; i < answerWord.length; i++) {
      const letterSent = attemptWord.charAt(i);
      const secretWordLetter = answerWord.charAt(i);

      if (letterSent === secretWordLetter) {
        lettersData.push({
          text: letterSent,
          type: 'correct',
        });
      } else if (answerWord.includes(letterSent)) {
        lettersData.push({
          text: letterSent,
          type: 'semi-correct',
        });
      } else {
        lettersData.push({
          text: letterSent,
          type: 'wrong',
        });
      }
    }

    setWordsData([...wordsData, { letters: lettersData }]);

    if (attemptWord === answerWord) {
      setUserWon(true);
      setShowDialog(true);
    } else if (attemptNumber === 6) {
      setUserWon(false);
      setShowDialog(true);
    }

    setAttemptNumber(attemptNumber + 1);
  };

  const restartGame = () => {
    setAttemptNumber(1);
    setWordsData([]);
    setAnswerWord(drawWord);
    setShowDialog(false);
  };

  const wordRow = (wordData: IWordData, rowKey: number) => {
    return [...Array(5)].map((_, index) => {
      const letterStyle =
        rowKey > attemptNumber - 1
          ? 'locked'
          : wordData?.letters[index].type ?? 'plain';

      return (
        <span
          key={`${rowKey}-${index}`}
          className={`row-letter ${letterStyle}`}
        >
          {wordData?.letters[index]?.text ?? ''}
        </span>
      );
    });
  };

  // Cria a grid por meio de um map pois garante que vai criar pra todas as rows
  const gameGrid = (
    <div className="game-grid">
      {[...Array(6)].map((_, index) => {
        return (
          <div key={index} className="grid-row">
            {wordRow(wordsData[index], index)}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <ConfirmDialog
        open={showDialog}
        confirmAction={restartGame}
        attemptNumber={attemptNumber}
        answerWord={answerWord}
        userWon={userWon}
      />

      <WarningToast
        header={warningData.header}
        content={warningData.content}
        open={showWarning}
        setOpen={setShowWarning}
      />

      <div className="main-wrapper">
        {gameGrid}

        <Keyboard
          attemptNumber={attemptNumber}
          setAttemptNumber={setAttemptNumber}
          setAttemptWord={setAttemptWord}
          sendWord={sendWord}
        />
      </div>
    </div>
  );
}
