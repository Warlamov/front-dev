import { ReactComponent as SpinnerIcon } from 'assets/svgIcons/spinner.svg';

import c from './spinner.module.scss';

interface IProps {
  isShow: boolean;
  tiny?: boolean;
}

const Spinner = (props: IProps) => {
  const { isShow, tiny } = props;

  return isShow ? (
    <div className={c.spinnerWrapper}>
      <SpinnerIcon className={tiny ? `${c.tiny} ${c.spinner}` : c.spinner} />
    </div>
  ) : null;
};

export default Spinner;
