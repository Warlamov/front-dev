import { IOrganizationShortDto } from '../shared/interfaces/api/organizations';

const delayInMs = 500;

class OrganizationsApiService {
  public organizations: IOrganizationShortDto[] = [
    {
      id: '401',
      name: 'Zion',
    },
    {
      id: '402',
      name: 'Agency',
    },
    {
      id: '403',
      name: 'Umbrella corp',
    },
  ];

  public async getOrganizationsShort(): Promise<IOrganizationShortDto[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.organizations), delayInMs);
    });
  }
}

export default new OrganizationsApiService();
