import { Keyboard } from './Keyboard';
import { handleDrawAnswer } from '../../services/answerUtils';
import './styles.css';
import { useState } from 'react';
import {
  ISelectedWordData,
  IWarningData,
  IBoardRowData,
  IBoardLetterData,
} from './interface';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { WarningToast } from '../../components/WarningToast';

export function MainGame() {
  const [answer, setAnswer] = useState<string>(handleDrawAnswer);
  const [rowNumber, setRowNumber] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<ISelectedWordData>({
    letters: ['', '', '', '', ''],
    indexPosition: 0,
  });
  const [userWon, setUserWon] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<IBoardRowData[]>([]);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [warningData, setWarningData] = useState<IWarningData>(
    {} as IWarningData,
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const openWarning = (data: IWarningData) => {
    setWarningData(data);
    setShowWarning(true);
  };

  const sendWord = () => {
    const lettersData: IBoardLetterData[] = [];

    // Valida se estão faltando letras
    const attemptMissingLetters = selectedWord.letters.filter(
      item => item === '',
    );

    if (attemptMissingLetters.length) {
      openWarning({
        header: 'Palavra inválida!',
        content: 'A palavra precisa ter 5 letras',
      });

      return;
    }

    // Verifica cada letra da palavra
    for (const [index, letterSent] of selectedWord.letters.entries()) {
      const secretWordLetter = answer.charAt(index);

      if (letterSent === secretWordLetter) {
        lettersData.push({
          text: letterSent,
          type: 'correct',
        });
      } else if (answer.includes(letterSent)) {
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

    setBoardData([...boardData, { letters: lettersData }]);

    if (selectedWord.letters.join('') === answer) {
      setUserWon(true);
      setShowDialog(true);
    } else if (rowNumber === 5) {
      setUserWon(false);
      setShowDialog(true);
    }

    // Ao enviar a palavra, pula para a próxima linha e limpa a palavra selecionada
    setRowNumber(rowNumber + 1);
    setSelectedWord({
      letters: ['', '', '', '', ''],
      indexPosition: 0,
    });
  };

  const restartGame = () => {
    setRowNumber(0);
    setBoardData([]);
    setAnswer(handleDrawAnswer);
    setShowDialog(false);
  };

  const wordRow = (wordData: IBoardRowData, rowKey: number) => {
    return [...Array(5)].map((_, index) => {
      // Caso a linha seja a linha atual, utiliza os dados do Keyboard
      if (rowKey === rowNumber) {
        const boxIsSelected = index === selectedWord.indexPosition;
        return (
          <span
            key={`${rowKey}-${index}`}
            className={`row-letter plain ${boxIsSelected ? 'selected' : ''}`}
            onClick={() =>
              setSelectedWord({ ...selectedWord, indexPosition: index })
            }
          >
            {selectedWord?.letters[index]}
          </span>
        );
      }

      const letterStyle =
        rowKey > rowNumber
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
            {wordRow(boardData[index], index)}
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
        rowNumber={rowNumber}
        answer={answer}
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
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
          sendWord={sendWord}
        />
      </div>
    </div>
  );
}
