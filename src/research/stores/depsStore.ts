import { usersDtos } from './usersStore';

import DepartmentModel from '../models/DepartmentModel';
import { IDepDto, IOrgDto } from '../interfaces/IDepDto';
import {makeAutoObservable, toJS} from 'mobx';
import { useStaticRendering } from "mobx-react";

const depsDto: IDepDto[] = [
  {
    id: '401',
    name: 'Lalalal corp',
    region: 'Tomsk region',
    orgs: [
      {
        id: '501',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal corp',
        users: [
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
        ],
      },
      {
        id: '602',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal 2 corp',
        users: usersDtos,
      },
      {
        id: '402',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal 2 corp',
        users: usersDtos,
      },
    ],
  },
  {
    id: '702',
    name: 'Lalalal corp 2',
    region: 'Tomsk region 2',
    orgs: [
      {
        id: '401',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal corp',
        users: [
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
        ],
      },
      {
        id: '802',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal 2 corp',
        users: usersDtos,
      },
      {
        id: '902',
        inn: '400 232 534 52 31',
        address: 'Nahimov street',
        name: 'Lalalal 2 corp',
        users: usersDtos,
      },
    ],
  },
];

class DepartmentsStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public departments: DepartmentModel[] = depsDto.map((dto: IDepDto) => new DepartmentModel(dto));

  public showProxyProblem() {
    console.log(toJS(this.departments));
    const deps = toJS(this.departments);

    debugger
  }
}

export default new DepartmentsStore();
