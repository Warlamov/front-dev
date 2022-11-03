import { ReactComponent as AlertIcon } from 'assets/svgIcons/alert.svg';
import { ReactComponent as ArrowIcon } from 'assets/svgIcons/arrow.svg';
import { ReactComponent as CloseIcon } from 'assets/svgIcons/close.svg';

import IconBtn from '../Buttons/IconBtn';

import { INoticeDisplay } from 'shared/interfaces/app';

import c from './noticeDisplay.module.scss';

interface IProps {
  params: INoticeDisplay;
  onClose(): void;
}

export enum NoticeType {
  Success = 1,
  Error = 2,
  Hidden = 3,
}

const NoticeDisplay = (props: IProps) => {
  const { params, onClose } = props;

  const classes = params.type === NoticeType.Success ? c.noticeWrapper : `${c.noticeWrapper} ${c.errorType}`;

  const icon = params.type === NoticeType.Success ? <ArrowIcon /> : <AlertIcon />;

  return params.type !== NoticeType.Hidden ? (
    <div className={classes}>
      {icon}
      <div className={c.noticeText}>{params.text}</div>
      <IconBtn className={c.closeBtn} icon={<CloseIcon />} onClick={onClose} />
    </div>
  ) : null;
};

export default NoticeDisplay;
