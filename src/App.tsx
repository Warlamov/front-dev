import React from 'react';

import UsersPage from './UsersPage/UsersPage';

import AppPage from './research/appPage/AppPage';
import UserPage from './research/appPage/UserPage';

import './App.css';

import { useStaticRendering } from 'mobx-react'

// use whatever condition you want/need, this is just an example
if (process.env.SSR) {
  useStaticRendering(true)
}

const App = () => {
  return (
    <div className={'mainWindow'}>
      {window.location.search.includes('deps=true') && <AppPage />}
      {window.location.search.includes('users_list=true') && <UserPage />}
      {window.location.search.includes('users=true') && <UsersPage />}
    </div>
  );
};

export default App;
