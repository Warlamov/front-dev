import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from 'assets/svgIcons/close.svg';

import Button from '../Buttons/PrimaryButton';
import IconBtn from '../Buttons/IconBtn';

import { ButtonTypes } from '../Buttons/PrimaryButton/Button';

import c from './modal.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
  onClose(): void;
  onOk(): void;
  onCancel(): void;
}

const Modal = (props: IProps) => {
  const { children, title, onClose, onOk, onCancel } = props;

  const rootEl = document.getElementById('root');

  const modalContent = (
    <div className={c.modalBackgroundWrapper}>
      <div className={c.contentWrapper}>
        <div className={c.userFormTitle}>
          <div>{title}</div>
          <IconBtn icon={<CloseIcon />} onClick={onClose} />
        </div>

        <div className={c.modalBody}>{children}</div>

        <div className={c.actionRow}>
          <Button onClick={onOk} caption={'Ок'} />
          <Button onClick={onCancel} caption={'Отмена'} type={ButtonTypes.Secondary} />
        </div>
      </div>
    </div>
  );

  return rootEl ? ReactDOM.createPortal(modalContent, rootEl) : null;
};

export default Modal;
