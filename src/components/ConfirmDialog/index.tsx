import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

type DialogBodyData = {
  attempts: number;
  answer: string;
  userWon: boolean;
};

interface IConfirmDialogProps {
  open: boolean;
  bodyData: DialogBodyData;
  confirmAction: () => void;
  onOpenChange: (e: boolean) => void;
}

export function ConfirmDialog(props: IConfirmDialogProps) {
  const { open, bodyData, confirmAction, onOpenChange } = props;

  const header = bodyData.userWon
    ? "Parabéns, você venceu!!"
    : "Que pena, tente novamente";

  const victoryBody = <p>Número de tentativas: {bodyData.attempts}</p>;

  const loseBody = (
    <p>
      A resposta era:{" "}
      <span style={{ color: "var(--primary)" }}>
        {bodyData.answer.toLocaleUpperCase()}
      </span>
    </p>
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-overlay" />
        <AlertDialog.Content className="dialog-content">
          <AlertDialog.Title>{header}</AlertDialog.Title>
          <AlertDialog.Description>
            {bodyData.userWon ? victoryBody : loseBody}
          </AlertDialog.Description>
          <div className="footer">
            <AlertDialog.Action
              className="button action"
              onClick={confirmAction}
            >
              Reiniciar
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
