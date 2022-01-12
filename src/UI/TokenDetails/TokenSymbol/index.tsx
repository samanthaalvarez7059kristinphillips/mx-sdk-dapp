import * as React from 'react';
import { faLock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Simple = ({ children }: { children: React.ReactNode }) => (
  <div className='token-symbol'>{children}</div>
);

export const Combined = ({
  small,
  children
}: {
  small: boolean | undefined;
  children: React.ReactNode;
}) => (
  <div className={`token-symbol-combined ${small ? 'small' : ''}`}>
    {children}
  </div>
);

export const Wrapped = ({ children }: { children: React.ReactNode }) => (
  <div className='token-symbol-wrapped'>
    <div className='wrapped rounded-circle shadow'>
      <div className='locked-icon'>
        <FontAwesomeIcon icon={faDollarSign} size='sm' />
      </div>
      {children}
    </div>
  </div>
);

export const Pool = ({
  first,
  second
}: {
  first: React.ReactNode;
  second: React.ReactNode;
}) => (
  <div className='token-symbol-pool'>
    <div className='pool rounded-circle shadow'>
      {first}
      <div className='pool-icon'>{second}</div>
    </div>
  </div>
);

export const Locked = ({ children }: { children: React.ReactNode }) => (
  <div className='token-symbol-locked'>
    <div className='locked rounded-circle shadow'>
      <div className='locked-icon'>
        <FontAwesomeIcon icon={faLock} size='sm' />
      </div>
      {children}
    </div>
  </div>
);
