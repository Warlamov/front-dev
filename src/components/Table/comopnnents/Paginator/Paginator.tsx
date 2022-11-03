import { observer } from 'mobx-react';

import { ReactComponent as ArrowIcon } from 'assets/svgIcons/arrow.svg';

import Select from '../../../Select';
import IconBtn from '../../../Buttons/IconBtn';

import { ISelectItem } from 'shared/interfaces/app';

import c from './paginator.module.scss';

interface IProps {
  totalPages: number;
  currentPage: number;
  onNextPage(): void;
  onPrevPage(): void;
  pageSize: string;
  pagesSizes: ISelectItem[];
  onChangePageSize(value: string): void;
}

const Paginator = (props: IProps) => {
  const { totalPages, currentPage, onNextPage, onPrevPage, onChangePageSize, pagesSizes, pageSize } = props;

  return (
    <div className={c.paginator}>
      Строк на странице:
      <Select
        className={c.pageSizeSelector}
        hasClearItem={false}
        selectedId={pageSize}
        values={pagesSizes}
        onSelect={onChangePageSize}
      />
      <div className={c.navPage}>
        {currentPage + 1} из {totalPages}
      </div>
      <IconBtn className={c.toLeftBtn} icon={<ArrowIcon />} onClick={onPrevPage} />
      <IconBtn className={c.toRightBtn} icon={<ArrowIcon />} onClick={onNextPage} />
    </div>
  );
};

export default observer(Paginator);
