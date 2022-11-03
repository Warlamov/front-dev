import IconBtn from '../Buttons/IconBtn';

import { ReactComponent as EditIcon } from 'assets/svgIcons/edit.svg';
import { ReactComponent as CloseIcon } from 'assets/svgIcons/close.svg';
import { ISelectItem, ITableDisplayParams } from 'shared/interfaces/app';
import { Paginator } from '../index';

import c from './table.module.scss';

interface IPaginatorControls {
  pageSize: number;
  pagesSizes: ISelectItem[];
  currentPage: number;
  totalPages: number;
  onChangePageSize(value: string): void;
  onNextPage(): void;
  onPrevPage(): void;
}

interface IProps {
  columnParams: ITableDisplayParams[];
  data: any;
  onEdit(rowId: string): void;
  onRemove(rowId: string): void;
  paginatorControls: IPaginatorControls;
}

const Table = (props: IProps) => {
  const { columnParams, data, paginatorControls, onEdit, onRemove } = props;

  const renderHeader = () => {
    return (
      <div className={c.tHead}>
        <div className={c.tHeadRow}>
          {columnParams.map((column) => (
            <div key={column.columnName} className={c.tHeadCell} style={{ width: column.width }}>
              {column.columnName}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRow = (data: any) => {
    const onEditClick = () => {
      onEdit(data.id);
    };

    const onRemoveClick = () => {
      onRemove(data.id);
    };

    return (
      <>
        {columnParams.map((item: ITableDisplayParams, index) => {
          return (
            <div key={item.columnName} className={c.tBodyCell} style={{ width: item.width }}>
              {item.keyData ? data[item.keyData] : null}
            </div>
          );
        })}

        <div className={`${c.tBodyCell} ${c.actions}`}>
          <IconBtn icon={<EditIcon />} onClick={onEditClick} />
          <IconBtn icon={<CloseIcon />} onClick={onRemoveClick} />
        </div>
      </>
    );
  };

  const renderTableBody = (dataList: any[]) => {
    return (
      <div className={c.tBody}>
        {dataList.map((dataItem: any) => {
          const onSelectRow = (e: any) => {
            dataItem.onSelect(!dataItem.isSelected);
            e.stopPropagation();
          };

          return (
            <div
              key={dataItem.id}
              onClick={onSelectRow}
              className={dataItem.isSelected ? `${c.selectedRow} ${c.tBodyRow}` : c.tBodyRow}>
              {renderRow(dataItem)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderPaginator = () => {
    const { pageSize, pagesSizes, currentPage, totalPages, onChangePageSize, onNextPage, onPrevPage } =
      paginatorControls;

    return (
      <div className={c.paginatorWrapper}>
        <Paginator
          pageSize={pageSize.toString()}
          pagesSizes={pagesSizes}
          onChangePageSize={onChangePageSize}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    );
  };

  return (
    <div className={c.table}>
      {renderHeader()}
      {renderTableBody(data)}
      {!!paginatorControls && renderPaginator()}
    </div>
  );
};

export default Table;
