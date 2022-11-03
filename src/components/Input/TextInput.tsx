import c from './textInput.module.scss';

interface IProps {
  id?: string;
  value: string;
  onChange(value: string): void;
}

const TextInput = (props: IProps) => {
  const { id, value, onChange } = props;

  const onChangeText = (e: any) => {
    onChange(e.target.value);
  };

  return <input className={c.textInput} autoComplete={'off'} id={id || ''} onChange={onChangeText} value={value} />;
};

export default TextInput;
