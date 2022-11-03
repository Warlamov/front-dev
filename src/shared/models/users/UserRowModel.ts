import { makeAutoObservable } from 'mobx';
import { IUserRowDto } from '../../interfaces/api/users';

class UserRowModel {
  constructor(dto: IUserRowDto) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.id = dto.id;

    this.fullName = dto.fullName;

    this.organizationName = dto.organizationName;

    this.email = dto.email;
  }

  public isSelected = false;

  public id = '';

  public fullName = '';

  public organizationName = '';

  public email = '';

  public onSelect(selected: boolean) {
    this.isSelected = selected;
  }
}

export default UserRowModel;
