import { Keyboard } from "./Keyboard";
import { WordRow } from "./WordRow";
import wordsJson from "../../services/wordsJson.json"
import './styles.css';
import { useState } from "react";
import { ILetterData, IWordData } from "./interface";

export function MainGame() {
    const [attemptNumber, setAttemptNumber] = useState<number>(1);
    const [attemptWord, setAttemptWord] = useState<string>('');
    const [wordsData, setWordsData] = useState<IWordData[]>([]);

    const drawWord = () => {
        // Sorteia um numero de 0 a 50
        const drawNumber = Math.floor(Math.random() * 50);
        const wordData = wordsJson[drawNumber];

        return wordData.text;
    }

    const [answerWord] = useState<string>(drawWord);

    function checkWordSent() {
        const lettersData: ILetterData[] = [];
        // Verifica cada letra da palavra
        for (let i = 0; i < answerWord.length; i++) {
            const letterSent = attemptWord.charAt(i);
            const secretWordLetter = answerWord.charAt(i);

            if (letterSent === secretWordLetter) {
                lettersData.push({
                    text: letterSent,
                    type: 'correct'
                })
            } else if (answerWord.includes(letterSent)) {
                lettersData.push({
                    text: letterSent,
                    type: 'semi-correct'
                })
            } else {
                lettersData.push({
                    text: letterSent,
                    type: 'wrong'
                })
            }

        }

        setWordsData([
            ... wordsData,
            { letters: lettersData },
        ])

        if (attemptWord === answerWord) {
            alert('VOCE GANHOU')
        } else if (attemptNumber === 6) {
            alert('VOCE PERDEU, CLIQUE NO ICONE PARA REINICIAR')
        }
    }

    return (
        <div className="main-wrapper">
            <div className="game-grid">
                <WordRow data={wordsData[0]} />
                <WordRow data={wordsData[1]} />
                <WordRow data={wordsData[2]} />
                <WordRow data={wordsData[3]} />
                <WordRow data={wordsData[4]} />
                <WordRow data={wordsData[5]} />
            </div>

            <Keyboard 
                attemptNumber={attemptNumber} 
                setAttemptNumber={setAttemptNumber} 
                setAttemptWord={setAttemptWord}
                checkWordSent={checkWordSent}
            />
        </div>
    )
}
