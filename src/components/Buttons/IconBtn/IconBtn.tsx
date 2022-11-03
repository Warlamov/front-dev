import c from './iconBtn.module.scss';

interface IProps {
  className?: string;
  icon: JSX.Element;
  onClick?(): void;
}

const IconBtn = (props: IProps) => {
  const { className, onClick, icon } = props;

  return (
    <span className={className ? `${className} ${c.iconBtn}` : c.iconBtn} onClick={onClick}>
      {icon}
    </span>
  );
};

export default IconBtn;
