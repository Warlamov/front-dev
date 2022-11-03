import { makeAutoObservable } from 'mobx';

import { IUserDto } from '../interfaces/IDepDto';

export default class UserModel {
  constructor(dto: IUserDto) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.id = dto.id;
    this.name = dto.name;
  }

  public id = '';

  public name = '';

  public checked = false;

  public checkHandle() {
    this.checked = !this.checked;
  }
}









