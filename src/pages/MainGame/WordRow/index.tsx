import { IWordData } from '../interface'
import './styles.css'

interface IWordRowProps {
    data: IWordData;
}

export function WordRow(props: IWordRowProps) {
    const { data } = props;
    
    return (
        <div className="grid-row">
            <span className={`row-letter ${data?.letters[0].type ?? 'plain'}`} >
                {data?.letters[0]?.text ?? ''}
            </span>
            <span className={`row-letter ${data?.letters[1].type ?? 'plain'}`} >
                {data?.letters[1]?.text ?? ''}
            </span>
            <span className={`row-letter ${data?.letters[2].type ?? 'plain'}`} >
                {data?.letters[2]?.text ?? ''}
            </span>
            <span className={`row-letter ${data?.letters[3].type ?? 'plain'}`} >
                {data?.letters[3]?.text ?? ''}
            </span>
            <span className={`row-letter ${data?.letters[4].type ?? 'plain'}`} >
                {data?.letters[4]?.text ?? ''}
            </span>
        </div>
    )
}
