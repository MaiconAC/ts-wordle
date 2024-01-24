import * as Toast from '@radix-ui/react-toast';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import './styles.css';

interface IWarningToastProps {
  open: boolean;
  header: string;
  content: string;
  setOpen: (e: boolean) => void;
}

export function WarningToast(props: IWarningToastProps) {
  const { open, header, content, setOpen } = props;

  return (
    <Toast.Provider>
      <Toast.Root className="root" open={open} onOpenChange={setOpen}>
        <InfoCircledIcon className="icon" width={25} height={25} />
        <div>
          <Toast.Title className="header">{header}</Toast.Title>
          <Toast.Description className="description">
            {content}
          </Toast.Description>
        </div>
      </Toast.Root>

      <Toast.Viewport className="viewport" />
    </Toast.Provider>
  );
}
