import './styles.css';
interface IKeyboardProps {
  attemptNumber: number;
  setAttemptNumber: React.Dispatch<React.SetStateAction<number>>;
  setAttemptWord: React.Dispatch<React.SetStateAction<string>>;
  checkWordSent(): void;
}

export function Keyboard(props: IKeyboardProps) {
  function enviarPalavra() {
    props.checkWordSent();
    props.setAttemptNumber(props.attemptNumber + 1);
  }

  return (
    <div className="container">
      <input
        type="text"
        id="text_input"
        maxLength={5}
        onChange={e => props.setAttemptWord(e.target.value)}
        placeholder="Digite aqui sua palavra"
      />
      <button type="button" onClick={enviarPalavra}>
        Enviar
      </button>
    </div>
  );
}
