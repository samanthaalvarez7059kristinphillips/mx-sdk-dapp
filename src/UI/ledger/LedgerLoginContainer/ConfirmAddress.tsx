import React from 'react';
import globalStyles from 'assets/sass/main.scss';
import { useGetAccountInfo } from 'hooks';
import classNames from 'classnames';
import { WithClassname } from 'UI/types/with-classname';

export const ConfirmAddress = ({
  token,
  noBorder,
  className = 'dapp-ledger-confirm-address'
}: {
  token?: string;
  noBorder?: boolean;
} & WithClassname) => {
  const { ledgerAccount } = useGetAccountInfo();
  return (
    <div className={classNames(globalStyles.mAuto, className)}>
      <div
        className={classNames([
          globalStyles.card,
          globalStyles.my4,
          globalStyles.textCenter,
          { [globalStyles.border0]: noBorder }
        ])}
      >
        <div
          className={classNames([
            globalStyles.cardBody,
            globalStyles.p4,
            globalStyles.mxLg4
          ])}
        >
          <h4 className={globalStyles.mb4}>Confirm Ledger Address</h4>
          <p>For security, please confirm that your address: </p>
          <p
            className={classNames([
              globalStyles.lead,
              globalStyles.border,
              globalStyles.rounded,
              globalStyles.p2
            ])}
          >
            {ledgerAccount ? ledgerAccount.address : ''}
          </p>
          {token && (
            <>
              <p>and Auth Token</p>
              <p
                className={classNames([
                  globalStyles.lead,
                  globalStyles.border,
                  globalStyles.rounded,
                  globalStyles.p2
                ])}
              >{`${token}{}`}</p>
            </>
          )}
          <p className={globalStyles.m0}>
            {token
              ? 'are the one shown on your Ledger device screen now.'
              : 'is the one shown on your Ledger device screen now.'}
          </p>

          <p>Select Approve on your device to confirm.</p>
          <p>
            Or, if it does not match, close this page and{' '}
            <a
              href='https://help.elrond.com/en/'
              {...{
                target: '_blank'
              }}
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
