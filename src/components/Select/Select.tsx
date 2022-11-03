import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import { ReactComponent as ArrowIcon } from 'assets/svgIcons/arrow.svg';
import { ReactComponent as CloseIcon } from 'assets/svgIcons/close.svg';

import { ISelectItem } from '../../shared/interfaces/app';

import IconBtn from '../Buttons/IconBtn';

import c from './select.module.scss';

interface IProps {
  isLoading?: boolean;
  className?: string;
  id?: string;
  hasClearItem?: boolean;
  disabled?: boolean;
  selectedId: string;
  values: ISelectItem[];
  onSelect(selectedId: string): void;
}

const defaultSelectId = 'defaultSelectId';
const valueElId = 'valueElId';

const Select = (props: IProps) => {
  const { className, id, isLoading, hasClearItem, disabled, selectedId, values, onSelect } = props;

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      setIsOpened(false);
    });
  }, []);

  const [isOpened, setIsOpened] = useState(false);
  const onSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  };

  const onRemoveClick = () => {
    onSelect('');
  };

  const renderInputNode = () => {
    return selectedId && hasClearItem ? (
      <IconBtn className={c.removeSelectBtn} icon={<CloseIcon />} onClick={onRemoveClick} />
    ) : (
      <ArrowIcon className={isOpened ? `${c.selectArrow} ${c.arrowDown}` : c.selectArrow} />
    );
  };

  const renderSelectedValue = () => {
    const valueName = values.find((item) => item.id === selectedId)?.name;

    return (
      <div id={valueElId} className={c.selectedValue} tabIndex={0} onClick={onSelectClick}>
        {valueName}
      </div>
    );
  };

  return (
    <div
      tabIndex={0}
      className={`${className || ''} ${c.selectWrapper}`}
      id={id || defaultSelectId}
      onClick={onSelectClick}>
      <Spinner isShow={!!isLoading} tiny={true} />
      {renderInputNode()}
      {renderSelectedValue()}

      {isOpened && (
        <div className={c.selectListWrapper}>
          {values.map((value) => {
            const onClick = (e: React.MouseEvent) => {
              onSelect(value.id);
              e.preventDefault();
            };

            return (
              <div key={value.id} className={`${c.selectItemWrapper} unselectable`} onClick={onClick}>
                {value.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
