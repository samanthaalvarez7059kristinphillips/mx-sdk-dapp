import React from 'react';
import classNames from 'classnames';
import { withStyles, WithStylesImportType } from 'hocs/withStyles';
import { OperationType } from 'types/serverTransactions.types';
import {
  useGetOperationList,
  OperationListType
} from 'utils/transactions/transactionInfoHelpers/useGetOperationList';
import { OperationRow } from './components/OperationRow';

const OperationsListComponent = (
  props: OperationListType & WithStylesImportType
) => {
  const { globalStyles } = props;

  const {
    isExpanded,
    displayedOperations,
    showToggleButton,
    toggleButtonText,
    onToggleButtonClick
  } = useGetOperationList(props);

  return (
    <div className={globalStyles?.mbN2}>
      <div
        className={classNames(globalStyles?.dFlex, globalStyles?.flexColumn)}
      >
        {displayedOperations.map((operation: OperationType, index) => (
          <div key={`display-${index}`}>
            <OperationRow
              operation={operation}
              transaction={props.transaction}
            />
          </div>
        ))}
      </div>

      {showToggleButton && (
        <button
          className={classNames(globalStyles?.btn, globalStyles?.btnLink)}
          type='button'
          onClick={onToggleButtonClick}
          aria-controls='operations-list'
          aria-expanded={isExpanded}
        >
          {toggleButtonText}
        </button>
      )}
    </div>
  );
};

export const OperationsList = withStyles(OperationsListComponent, {});
