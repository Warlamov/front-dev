import { observer } from 'mobx-react';

import IconBtn from 'components/Buttons/IconBtn';

import depsStore from '../stores/depsStore';

import { ReactComponent as ArrowDown } from 'assets/svgIcons/arrow-down.svg';

import c from './appPage.module.scss';
import {useEffect} from "react";


const AppPage = () => {
  useEffect(() => {
      depsStore.showProxyProblem();
  }, []);

  return (
    <div className={c.appStoreWrapper}>
      {depsStore.departments.map((dep) => (
        <div key={dep.id} className={c.depWrapper}>
          <div className={c.depTitleRow}>
            <span className={c.depName}> {dep.name}</span>
            <span className={c.depUserCheckedCount}>{dep.usersCountTotalChecked}</span>
          </div>

          {dep.organizations.map((org) => {
            return (
              <div key={org.id} className={c.orgWrapper}>
                <div className={c.orgControlRow}>
                  <div className={c.orgControlRowTitle} onClick={org.expandHandle}>
                    <IconBtn icon={<ArrowDown className={!org.isExpanded ? c.col : ''} />} />
                    <span className={c.orgName}>{org.name}</span>
                  </div>

                  <span className={c.orgsUserCheckedCount}>{org.usersCountChecked}</span>
                </div>

                {org.isExpanded &&
                  org.users.map((user) => (
                    <div key={user.id} className={c.userRecordWrapper} onClick={user.checkHandle}>
                      <span>{user.name}</span>
                      <input className={c.userCheck} type={'checkbox'} checked={user.checked} />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default observer(AppPage);
