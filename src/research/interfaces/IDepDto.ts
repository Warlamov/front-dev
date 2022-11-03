export interface IUserDto {
  id: string;
  name: string;
}

export interface IOrgDto {
  id: string;
  inn: string;
  address: string;
  name: string;
  users: IUserDto[];
}

export interface IDepDto {
  id: string;
  name: string;
  region: string;
  orgs: IOrgDto[];
}
