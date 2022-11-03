import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { organizationsStore, usersStore } from 'Stores';

import Select from 'components/Select';
import TextInput from 'components/Input';

import c from './userForm.module.scss';

const userSurnameHtmlId = 'userSurname';
const userNameHtmlId = 'userName';
const userPatronymicHtmlId = 'userPatronymic';
const userOrgHtmlId = 'userOrg';
const userEmailHtmlId = 'userEmail';

const UserForm = () => {
  useEffect(() => {
    organizationsStore.getOrganizationsList();
  }, []);

  return (
    <div>
      <div className={c.formRow}>
        <label htmlFor={userSurnameHtmlId}>Фамилия<span style={{color: 'red', paddingLeft: '8px'}}>*</span></label>

        <TextInput id={userSurnameHtmlId} onChange={usersStore.user.onChangeSurname} value={usersStore.user.surname} />
      </div>

      <div className={c.formRow}>
        <label htmlFor={userNameHtmlId}>Имя</label>

        <TextInput id={userNameHtmlId} onChange={usersStore.user.onChangeName} value={usersStore.user.name} />
      </div>

      <div className={c.formRow}>
        <label htmlFor={userPatronymicHtmlId}>Отчество</label>

        <TextInput
          id={userPatronymicHtmlId}
          onChange={usersStore.user.onChangePatronymic}
          value={usersStore.user.patronymic}
        />
      </div>

      <div className={c.formRow}>
        <label htmlFor={userOrgHtmlId}>Организация</label>

        <Select
          hasClearItem={true}
          isLoading={organizationsStore.isPending}
          selectedId={usersStore.user.organizationId}
          values={organizationsStore.organizationsSelectList}
          onSelect={usersStore.user.onChangeOrganization}
        />
      </div>

      <div className={c.formRow}>
        <label htmlFor={userEmailHtmlId}>E-Mail</label>

        <TextInput id={userEmailHtmlId} onChange={usersStore.user.onChangeEmail} value={usersStore.user.email} />
      </div>
    </div>
  );
};

export default observer(UserForm);
