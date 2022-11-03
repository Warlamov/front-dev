import c from './button.module.scss';

interface IProps {
  className?: string;
  children?: JSX.Element;
  onClick(): void;
  caption: string;
  type?: ButtonTypes;
}

export enum ButtonTypes {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

const Button = (props: IProps) => {
  const { caption, className, children, type, onClick } = props;

  const classNames =
    type === ButtonTypes.Secondary ? `${c.button} ${c.secondaryButton} ${className}` : `${c.button} ${className}`;

  return (
    <button className={classNames} onClick={onClick}>
      {children}
      {caption}
    </button>
  );
};

export default Button;
