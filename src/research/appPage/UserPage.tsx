import { observer } from 'mobx-react';

import usersStore from '../stores/usersStore';

import c from './appPage.module.scss';

const UserPage = () => {
  return (
    <div className={c.appStoreWrapper}>
      <div className={c.orgWrapper}>
        {usersStore.users.map((user) => (
          <div key={user.id} className={c.userRecordWrapper} onClick={user.checkHandle}>
            <span>{user.name}</span>
            <input className={c.userCheck} type={'checkbox'} checked={user.checked} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(UserPage);
