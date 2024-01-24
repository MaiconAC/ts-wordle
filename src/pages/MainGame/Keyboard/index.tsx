import './styles.css';
interface IKeyboardProps {
  attemptNumber: number;
  setAttemptNumber: React.Dispatch<React.SetStateAction<number>>;
  setAttemptWord: React.Dispatch<React.SetStateAction<string>>;
  sendWord(): void;
}

export function Keyboard(props: IKeyboardProps) {
  return (
    <div className="container">
      <input
        type="text"
        id="text_input"
        maxLength={5}
        onChange={e => props.setAttemptWord(e.target.value)}
        placeholder="Digite aqui sua palavra"
      />
      <button type="button" onClick={props.sendWord}>
        Enviar
      </button>
    </div>
  );
}
