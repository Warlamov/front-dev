import { makeAutoObservable } from 'mobx';

import OrganizationModel from './OrganizationModel';

import { IDepDto } from '../interfaces/IDepDto';

export default class DepartmentModel {
  constructor(dto: IDepDto) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.id = dto.id;
    this.name = dto.name;

    this.organizations = dto.orgs.map((orgDto) => new OrganizationModel(orgDto));
  }

  public id = '';

  public name = '';

  public organizations: OrganizationModel[] = [];

  public get usersCountTotalChecked() {
    let totalSelected = 0;

    this.organizations.forEach((org) =>
      org.users.forEach((user) => user.checked && totalSelected++));

    return totalSelected > 0 ? `Всего выбрано: ${totalSelected}` : '';
  }
}
