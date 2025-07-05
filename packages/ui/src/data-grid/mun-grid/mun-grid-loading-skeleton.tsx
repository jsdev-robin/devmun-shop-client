import React, { useMemo } from 'react';
import RowLoadingSkeleton from '../../ui/row-loading-skeleton';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Tbody, Td, Tr } from '../../components/flex-table';
import { getPinStyles } from '../utils/getPinStyles';

const MunGridLoadingSkeleton = () => {
  const { table, split } = useDataGrid();

  const visibleColumns = useMemo(
    () =>
      (split ? table.getCenterHeaderGroups() : table.getHeaderGroups()).flatMap(
        (group) =>
          group.headers
            .filter(
              (header) =>
                !header.isPlaceholder &&
                !header.subHeaders?.length &&
                header.column.id !== 'rowNumber',
            )
            .map((header) => header.column),
      ),
    [table, split],
  );

  return (
    <Tbody>
      {[...Array(20)].map((_, i) => (
        <Tr key={i} className="*:border-r *:border-border h-10">
          {visibleColumns.map((column, j) => (
            <Td
              key={j}
              style={{
                width: column.getSize(),
                minWidth: column.getSize(),
                maxWidth: ['select'].includes(column.id)
                  ? column.getSize()
                  : undefined,
                flex: ['select'].includes(column.id) ? undefined : 1,
                ...(!split && getPinStyles(column)),
              }}
            >
              <RowLoadingSkeleton column={column} i={i} j={j} />
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default MunGridLoadingSkeleton;
