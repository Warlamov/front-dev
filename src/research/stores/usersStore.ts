import { IUserDto } from '../interfaces/IDepDto';
import UserModel from '../models/UserModel';

export const usersDtos = [
  {
    id: '103',
    name: 'Вилли Артёмович Богданов',
  },
  {
    id: '104',
    name: 'Леонид Евгеньевич Анисимов',
  },
  {
    id: '105',
    name: 'Владислав Noname Ильяович',
  },
  {
    id: '103',
    name: 'Вилли Артёмович Богданов',
  },
  {
    id: '104',
    name: 'Леонид Евгеньевич Анисимов',
  },
  {
    id: '105',
    name: 'Владислав Noname Ильяович',
  },
  {
    id: '103',
    name: 'Вилли Артёмович Богданов',
  },
  {
    id: '104',
    name: 'Леонид Евгеньевич Анисимов',
  },
  {
    id: '105',
    name: 'Владислав Noname Ильяович',
  },
];

class UsersStore {
  public users: UserModel[] = usersDtos.map((dto: IUserDto) => new UserModel(dto));
}

export default new UsersStore();
