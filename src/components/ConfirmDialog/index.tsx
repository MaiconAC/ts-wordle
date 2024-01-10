import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';

interface IConfirmDialogProps {
  open: boolean;
  attemptNumber: number;
  header: string;
  confirmAction: () => void;
}

export function ConfirmDialog(props: IConfirmDialogProps) {
  const { open, attemptNumber, header, confirmAction } = props;

  return (
    <Dialog.Root open={open} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div>
            <h3>{header}</h3>
            <p>Número de tentativas: {attemptNumber - 1}</p>
            <button type="button" onClick={confirmAction}>
              Reiniciar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
