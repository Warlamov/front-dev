import { IUserGetDto, IUserPostDto, IUserPutDto, IUserRowDto } from 'shared/interfaces/api/users';
import { IPaginatedData } from 'shared/interfaces/api/IPaginatedData';
import { organizationsApiService } from './index';

const delayInMs = 500;

interface IUserDBModel {
  id: string;
  name: string;
  patronymic: string;
  surname: string;
  organizationId: string;
  organizationName?: string;
  email: string;
}

class UsersApiService {
  private async init() {
    const resp = await fetch('/user_list.json').then((resp) => resp.json());
    this.users = resp;
  }

  public async getUsersList(pageSize: number, pageIndex: number): Promise<IPaginatedData<IUserRowDto>> {
    if (this.users.length === 0) {
      await this.init();
    }
    const startIndex = pageSize * pageIndex;

    const rowDtos: IUserRowDto[] = this.users
      .sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1))
      .slice(startIndex, startIndex + pageSize)
      .map((user) => ({
        id: user.id,
        fullName: `${user.surname} ${user.name} ${user.patronymic}`,
        organizationName: user.organizationName || '',
        email: user.email,
      }));

    return new Promise((resolve) => {
      setTimeout(() => resolve({ totalRecords: this.users.length, pageData: rowDtos }), delayInMs);
    });
  }

  public async getUserById(userId: string): Promise<IUserGetDto | null> {
    const user = this.users.find((item) => item.id === userId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(user || null), delayInMs);
    });
  }

  public postUser(userDto: IUserPostDto): Promise<string> {
    const userId = (this.users.length + 1).toString();
    this.users.push({
      ...userDto,
      id: (this.users.length + 1).toString(),
      organizationName:
        organizationsApiService.organizations.find((item) => item.id === userDto.organizationId)?.name || '',
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(userId), delayInMs);
    });
  }

  public async putUser(userDto: IUserPutDto): Promise<string> {
    this.users = this.users
      .filter((user) => user.id !== userDto.id)
      .concat({
        ...userDto,
        organizationName:
          organizationsApiService.organizations.find((item) => item.id === userDto.organizationId)?.name || '',
      });

    return new Promise((resolve) => {
      setTimeout(() => resolve(userDto.id), delayInMs);
    });
  }

  public async deleteUser(userIds: string[]): Promise<boolean> {
    if (userIds.includes('101')) throw {};
    this.users = this.users.filter((user) => !userIds.includes(user.id));

    return new Promise((resolve) => {
      setTimeout(() => resolve(true), delayInMs);
    });
  }

  private users: IUserDBModel[] = [];
}

export default new UsersApiService();
