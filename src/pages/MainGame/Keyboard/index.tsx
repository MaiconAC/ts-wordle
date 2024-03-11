import { ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';
import { ISelectedWordData } from '../interface';
interface IKeyboardProps {
  selectedWord: ISelectedWordData;
  setSelectedWord(e: ISelectedWordData): void;
  handleClickEnter(): void;
}

export function Keyboard(props: IKeyboardProps) {
  const { selectedWord, setSelectedWord, handleClickEnter } = props;

  function handleSelectLetter(letter: string) {
    const attemptMissingLetters = selectedWord.letters.filter(
      item => item === '',
    );

    // Se ainda existirem espaços vagos, preeche o espaço selecionado
    if (attemptMissingLetters.length) {
      const updatedWordLetters = selectedWord.letters;
      updatedWordLetters[selectedWord.indexPosition] = letter;

      const nextLetterIsEmpty =
        updatedWordLetters[selectedWord.indexPosition + 1] === '';

      // Busca a proxima casa que nao esteja preenchida
      const nextEmptyLetter = nextLetterIsEmpty
        ? selectedWord.indexPosition + 1
        : selectedWord.letters.findIndex(item => item === '');

      setSelectedWord({
        letters: updatedWordLetters,
        indexPosition: nextEmptyLetter,
      });
    }
  }

  function handleClickBackspace() {
    // Se toda a palavra estiver preenchida, apaga o ultimo quadro
    if (selectedWord.indexPosition === -1) {
      const updatedWordLetters = selectedWord.letters;
      updatedWordLetters[4] = '';

      setSelectedWord({
        letters: updatedWordLetters,
        indexPosition: 4,
      });
    } else if (!selectedWord.letters[selectedWord.indexPosition]) {
      // Se o quadro selecionado estiver vazio, apaga o anterior
      // Se estiver vazio e na primeira posicao, nao faz nada
      if (selectedWord.indexPosition === 0) return;

      const updatedWordLetters = selectedWord.letters;
      updatedWordLetters[selectedWord.indexPosition - 1] = '';

      setSelectedWord({
        letters: updatedWordLetters,
        indexPosition: selectedWord.indexPosition - 1,
      });
    } else {
      // Se o quadro estiver preenchido, apaga ele
      const updatedWordLetters = selectedWord.letters;
      updatedWordLetters[selectedWord.indexPosition] = '';

      setSelectedWord({
        letters: updatedWordLetters,
        indexPosition: selectedWord.indexPosition,
      });
    }
  }

  return (
    <div className="container">
      <div className="kb-row">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
          (letter, index) => {
            return (
              <button key={index} onClick={() => handleSelectLetter(letter)}>
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
              <button key={index} onClick={() => handleSelectLetter(letter)}>
                {letter}
              </button>
            );
          },
        )}
      </div>
      <div className="kb-row">
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, index) => {
          return (
            <button key={index} onClick={() => handleSelectLetter(letter)}>
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
