import { ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';
import { useEffect } from 'react';
import { IBoardCellData } from '../interface';
import { getKeyboardStatuses } from '../../../services/answerUtils';

interface IKeyboardProps {
  boardData: IBoardCellData[][];
  handleClickEnter(): void;
  handleClickBackspace(): void;
  handleSelectLetter(e: string): void;
}

export function Keyboard(props: IKeyboardProps) {
  const {
    boardData,
    handleClickEnter,
    handleClickBackspace,
    handleSelectLetter,
  } = props;

  const keyboardStatuses = getKeyboardStatuses(boardData);

  // Verifica as teclas pressionadas do teclado
  useEffect(() => {
    const listenerEvent = (e: KeyboardEvent) => {
      const key = e.key.toLocaleUpperCase();

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        handleSelectLetter(key);
      } else if (e.code === 'Backspace') {
        handleClickBackspace();
      } else if (e.code === 'Enter') {
        handleClickEnter();
      }
    };

    document.addEventListener('keydown', listenerEvent);

    return () => {
      document.removeEventListener('keydown', listenerEvent);
    };
  }, [handleClickBackspace, handleClickEnter, handleSelectLetter]);

  return (
    <div className="container">
      <div className="kb-row">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
          (letter, index) => {
            return (
              <button
                key={index}
                onClick={() => handleSelectLetter(letter)}
                className={keyboardStatuses[letter]}
              >
                {letter}
              </button>
            );
          },
        )}
      </div>
      <div className="kb-row">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'].map(
          (letter, index) => {
            return (
              <button
                key={index}
                onClick={() => handleSelectLetter(letter)}
                className={keyboardStatuses[letter]}
              >
                {letter}
              </button>
            );
          },
        )}
      </div>
      <div className="kb-row">
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, index) => {
          return (
            <button
              key={index}
              onClick={() => handleSelectLetter(letter)}
              className={keyboardStatuses[letter]}
            >
              {letter}
            </button>
          );
        })}

        <button
          id="kb-backspace"
          style={{ width: '65px' }}
          onClick={handleClickBackspace}
        >
          <ArrowLeftIcon
            color="#696969"
            className="icon"
            width={25}
            height={25}
          />
        </button>
        <button
          id="kb-enter"
          style={{ width: '100px' }}
          onClick={handleClickEnter}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
