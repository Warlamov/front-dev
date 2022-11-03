import { makeAutoObservable } from 'mobx';

import { ISelectItem } from '../interfaces/app';

class PaginatorModel {
  private readonly onChangePagination: () => void;

  constructor(onChangePagination: () => void) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.onChangePagination = onChangePagination;
  }

  public pageSizes: ISelectItem[] = [
    { id: '5', name: '5' },
    { id: '10', name: '10' },
    { id: '50', name: '50' },
  ];

  public totalRows = 0;

  public selectedPageSize = parseInt(this.pageSizes[1].id);

  public totalPages = 0;

  public pageIndex = 0;

  public onChangePageSize(value: string) {
    this.selectedPageSize = parseInt(value);
    this.pageIndex = 0;
    this.onChangePagination();
  }

  public initTotalRows(value: number) {
    this.totalRows = value;
    this.setTotalPages(Math.ceil(this.totalRows / this.selectedPageSize));
  }

  public setTotalPages(value: number) {
    this.totalPages = value;
  }

  public goPrevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.onChangePagination();
    }
  }

  public goNextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.onChangePagination();
    }
  }

  public get controls() {
    return {
      pageSize: this.selectedPageSize,
      pagesSizes: this.pageSizes,
      onChangePageSize: this.onChangePageSize,
      onNextPage: this.goNextPage,
      onPrevPage: this.goPrevPage,
      currentPage: this.pageIndex,
      totalPages: this.totalPages,
    };
  }
}

export default PaginatorModel;
