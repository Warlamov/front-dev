import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { Button, Spinner, Modal } from 'components';

import NoticeDisplay from 'components/NoticeDisplay';
import UserForm from './components/UserForm';

import { usersStore } from 'Stores';

import { ITableDisplayParams } from 'shared/interfaces/app';
import { ButtonTypes } from 'components/Buttons/PrimaryButton/Button';

import Table from '../components/Table/Table';

import c from './usersPage.module.scss';
import counterStore from "../Stores/counterStore";

const tableDisplayParams: ITableDisplayParams[] = [
  { columnName: 'Пользователь', keyData: 'fullName', width: '34%' },
  { columnName: 'Организация', keyData: 'organizationName', width: '30%' },
  { columnName: 'E-Mail', keyData: 'eMail', width: '30%' },
];

const UsersPage = () => {
  useEffect(() => {
    document.addEventListener('click', (e) => usersStore.deInitSelected(e));
    usersStore.getUsersList();

    return () => {
      usersStore.deInit();
    };
  }, []);

  return (
    <div className={c.usersPageWrapper}>
      <Button onClick={counterStore.inc} caption={counterStore.count.toString()} />
      <Spinner isShow={usersStore.isPending} />

      {usersStore.isShowUserForm && (
        <Modal
          title={usersStore.userFormTitle}
          onClose={usersStore.closeUserForm}
          onOk={usersStore.submitUser}
          onCancel={usersStore.closeUserForm}>
          <UserForm />
        </Modal>
      )}

      {usersStore.usersIdsToRemove.length > 0 && (
        <Modal
          onOk={usersStore.removeUser}
          onClose={usersStore.closeRemoveDialog}
          onCancel={usersStore.closeRemoveDialog}
          title={`Удалить?`}>
          {usersStore.usersFullNamesToRemove.map((item) => (
            <div className={c.removeItem}>{item}</div>
          ))}
        </Modal>
      )}

      <div className={c.pageButtonsRow}>
        <Button onClick={usersStore.openUserForm} caption={'Добавить пользователя'} />

        {usersStore.selectedUsersCount > 0 && (
          <Button
            className={c.removeBtn}
            type={ButtonTypes.Secondary}
            onClick={usersStore.openRemoveSelectedDialog}
            caption={`Удалить ${usersStore.selectedUsersCount} записей`}
          />
        )}
      </div>

      <Table
        columnParams={tableDisplayParams}
        data={usersStore.users}
        paginatorControls={usersStore.paginator.controls}
        onEdit={usersStore.getUserById}
        onRemove={usersStore.openRemoveDialog}
      />

      <NoticeDisplay params={usersStore.operationResult} onClose={() => usersStore.clearOperationResult(true)} />
    </div>
  );
};

export default observer(UsersPage);
