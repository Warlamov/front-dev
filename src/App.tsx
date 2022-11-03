import React, { useState } from 'react';

import UsersPage from './UsersPage/UsersPage';

import AppPage from './research/appPage/AppPage';
import UserPage from './research/appPage/UserPage';

import './App.css';

import {observer, useStaticRendering} from 'mobx-react';
import { Button } from './components';

// use whatever condition you want/need, this is just an example
if (process.env.SSR) {
  useStaticRendering(true);
}

enum Pages {
  UserList = 1,
  Users = 2,
  Departments = 3,
}

const App = () => {
  const [currentPage, setCurrentPage] = useState(Pages.Users);

  return (
    <div className={'mainWindow'}>
      <div className={'navigation'}>
        <Button
          className={'navItem'}
          onClick={() => setCurrentPage(Pages.Users)}
          caption={'Таблица пользователей'}
        />
        <Button className={'navItem'} onClick={() => setCurrentPage(Pages.UserList)} caption={'Список пользователей'} />
        <Button className={'navItem'} onClick={() => setCurrentPage(Pages.Departments)} caption={'Департаменты'} />
      </div>

      {currentPage === Pages.Departments && <AppPage />}
      {currentPage === Pages.UserList && <UserPage />}
      {currentPage === Pages.Users && <UsersPage />}
    </div>
  );
};

export default observer(App);
