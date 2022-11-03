import { makeAutoObservable } from 'mobx';

import { organizationsApiService } from 'Services';
import { ISelectItem } from 'shared/interfaces/app';

class OrganizationsStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public isPending = false;

  public organizationsSelectList: ISelectItem[] = [];

  public async getOrganizationsList() {
    this.isPending = true;
    try {
      this.organizationsSelectList = await organizationsApiService.getOrganizationsShort();
    } catch (e) {
      console.log(e);
    } finally {
      this.isPending = false;
    }
  }

  public deInit() {
    this.isPending = false;

    this.organizationsSelectList = [];
  }
}

export default new OrganizationsStore();
