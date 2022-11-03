import { makeAutoObservable } from 'mobx';

import { IUserGetDto, IUserPostDto, IUserPutDto } from '../../interfaces/api/users';

class UserFormModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public id = '';

  public surname = '';

  public name = '';

  public patronymic = '';

  public organizationId = '';

  public email = '';

  public onChangeSurname(value: string) {
    this.surname = value;
  }

  public onChangeName(value: string) {
    this.name = value;
  }

  public onChangePatronymic(value: string) {
    this.patronymic = value;
  }

  public onChangeOrganization(selectedId: string) {
    this.organizationId = selectedId;
  }

  public onChangeEmail(value: string) {
    this.email = value;
  }

  public initByDto(dto: IUserGetDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
    this.email = dto.email;
    this.patronymic = dto.patronymic;
    this.organizationId = dto.organizationId;
  }

  public getPostDto(): IUserPostDto {
    return {
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      organizationId: this.organizationId,
      email: this.email,
    };
  }

  public getPutDto(): IUserPutDto {
    return {
      id: this.id,
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      organizationId: this.organizationId,
      email: this.email,
    };
  }

  public deInitModel() {
    this.id = '';
    this.surname = '';
    this.name = '';
    this.patronymic = '';
    this.organizationId = '';
    this.email = '';
  }
}

export default UserFormModel;
