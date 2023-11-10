interface IKeyboardProps {
  attemptNumber: number;
  setAttemptNumber: React.Dispatch<React.SetStateAction<number>>;
  setAttemptWord: React.Dispatch<React.SetStateAction<string>>
  checkWordSent(): void;
}

export function Keyboard(props: IKeyboardProps) {
  function enviarPalavra() {
    props.checkWordSent();
    props.setAttemptNumber(props.attemptNumber + 1);
  }

  return (
    <div>
      <input 
        type="text" 
        id="text_input" 
        maxLength={5} 
        onChange={e => props.setAttemptWord(e.target.value)}
        style={{ border: "4.8px solid lightgray", borderRadius: "5px" }}
      />
      <button 
        type="button" 
        onClick={enviarPalavra}
        style={{ border: "4.8px solid lightgray", borderRadius: "5px" }}
      >
        Enviar
      </button>
    </div>
  )
}
