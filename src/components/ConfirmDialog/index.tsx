import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';

interface IConfirmDialogProps {
  open: boolean;
  rowNumber: number;
  userWon: boolean;
  answer: string;
  confirmAction: () => void;
}

export function ConfirmDialog(props: IConfirmDialogProps) {
  const { open, rowNumber, userWon, answer, confirmAction } = props;

  const header = userWon
    ? 'Parabéns, você venceu!!'
    : 'Que pena, tente novamente';

  return (
    <Dialog.Root open={open} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div>
            <h3>{header}</h3>
            <p>Número de tentativas: {rowNumber - 1}</p>
            {!userWon ? (
              <p>
                A resposta era:{' '}
                <span style={{ color: 'var(--primary)' }}>
                  {answer.toLocaleUpperCase()}
                </span>
              </p>
            ) : (
              ''
            )}
            <div className="footer">
              <button type="button" onClick={confirmAction}>
                Reiniciar
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
