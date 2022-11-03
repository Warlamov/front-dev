import { makeAutoObservable } from 'mobx';

import UserModel from './UserModel';
import { IOrgDto } from '../interfaces/IDepDto';

export default class OrganizationModel {
  constructor(dto: IOrgDto) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.id = dto.id;
    this.name = dto.name;

    this.users = dto.users.map((userDto) => new UserModel(userDto));
  }

  public id = '';

  public name = '';

  public users: UserModel[] = [];

  public isExpanded = false;

  public get usersCountChecked() {
    const checked = this.users.filter((user) => user.checked).length;
    return checked > 0 ? `Выбрано: ${checked}` : '';
  }

  public expandHandle() {
    this.isExpanded = !this.isExpanded;
  }
}
