import { makeAutoObservable } from 'mobx';

import { usersApiService } from '../Services';

import { NoticeType } from 'components/NoticeDisplay/NoticeDisplay';

import { UserFormModel, UserRowModel } from 'shared/models/users';
import PaginatorModel from 'shared/models/PaginatorModel';
import { INoticeDisplay } from 'shared/interfaces/app';

const successText = 'Операция выполнена успешно';
const errorText = 'Произошла ошибка';

const timoutForNoticeDisplay = 3000;

class UsersStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public isPending = false;

  public operationResult: INoticeDisplay = {
    type: NoticeType.Success,
    text: successText,
  };

  public paginator = new PaginatorModel(() => this.getUsersList());

  public users: UserRowModel[] = [];

  public user: UserFormModel = new UserFormModel();

  public isShowUserForm = false;

  public usersIdsToRemove: string[] = [];

  public get userFormTitle() {
    return this.user.id ? 'Редактирование пользователя' : 'Создание пользователя';
  }

  public get selectedUsersCount(): number {
    return this.users.filter((user) => user.isSelected).length;
  }

  public get usersFullNamesToRemove() {
    const usersToRemove = this.users.filter((user) => this.usersIdsToRemove.includes(user.id));

    return usersToRemove.map((item) => item.fullName);
  }

  public async getUsersList() {
    this.isPending = true;
    try {
      const result = await usersApiService.getUsersList(this.paginator.selectedPageSize, this.paginator.pageIndex);
      this.users = result.pageData.map((dto) => new UserRowModel(dto));
      this.paginator.initTotalRows(result.totalRecords);
    } catch (e) {
      this.operationResult = { type: NoticeType.Error, text: errorText };
      console.log(e);
    } finally {
      this.isPending = false;
    }
  }

  public async getUserById(userId: string) {
    this.isPending = true;
    try {
      const dto = await usersApiService.getUserById(userId);
      if (!dto) return;

      this.user.initByDto(dto);
      this.isShowUserForm = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.isPending = false;
    }
  }

  private async postUser() {
    this.isPending = true;
    try {
      const dto = await usersApiService.postUser(this.user.getPostDto());
      if (!dto) return;
    } catch (e) {
      this.operationResult = { type: NoticeType.Error, text: errorText };
      console.log(e);
    } finally {
      this.isPending = false;
      this.clearOperationResult(false);
    }
  }

  private async putUser() {
    this.isPending = true;
    try {
      const dto = await usersApiService.putUser(this.user.getPutDto());
      if (!dto) return;
    } catch (e) {
      this.operationResult = { type: NoticeType.Error, text: errorText };
      console.log(e);
    } finally {
      this.isPending = false;
    }
  }

  public async removeUser() {
    this.isPending = true;

    try {
      const dto = await usersApiService.deleteUser(this.usersIdsToRemove);
      if (!dto) return;

      this.closeRemoveDialog();
      await this.getUsersList();
      this.operationResult = { type: NoticeType.Success, text: successText };
    } catch (e) {
      this.operationResult = { type: NoticeType.Error, text: errorText };
      console.log(e);
    } finally {
      this.isPending = false;
      this.closeRemoveDialog();
    }
  }

  public async submitUser() {
    if (!this.user.id) {
      await this.postUser();
    }

    if (this.user.id) {
      await this.putUser();
    }

    this.closeUserForm();
    await this.getUsersList();
    this.operationResult = { type: NoticeType.Success, text: successText };
    this.clearOperationResult(false);
  }

  public openUserForm() {
    this.isShowUserForm = true;
  }

  public closeUserForm() {
    this.isShowUserForm = false;
   this.user.deInitModel();
  }

  public openRemoveDialog(userId: string) {
    this.usersIdsToRemove = [userId];
  }

  public closeRemoveDialog() {
    this.usersIdsToRemove = [];
  }

  public openRemoveSelectedDialog() {
    this.usersIdsToRemove = this.users.filter((user) => user.isSelected).map((user) => user.id);
  }

  public deInitSelected(e: any) {
    this.users.forEach((item) => item.onSelect(false));
  }

  public clearOperationResult(rightNow: boolean) {
    if (rightNow) {
      this.operationResult = { type: NoticeType.Hidden, text: '' };
      return;
    }

    setTimeout(() => (this.operationResult = { type: NoticeType.Hidden, text: '' }), timoutForNoticeDisplay);
  }

  public deInit() {
    this.user.deInitModel();
    this.users = [];
    this.isPending = false;
    this.operationResult = { type: NoticeType.Hidden, text: '' };
  }
}

export default new UsersStore();
