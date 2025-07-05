import React, { useMemo } from 'react';
import { useDataLayoutContext } from '../../context/data-layout-context';
import { FlexTable, Tbody, Td, Tr } from '../../../components/flex-table';
import NoDataFoundMsg from '../../common/NoDataFoundMsg';

const GridNoData = () => {
  const { table } = useDataLayoutContext();
  const visibleColumns = useMemo(() => table.getAllLeafColumns(), [table]);

  return (
    <>
      <FlexTable>
        <Tbody>
          <Tr>
            {visibleColumns.map((column, i) => (
              <Td
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </Tr>
        </Tbody>
      </FlexTable>
      <NoDataFoundMsg />
    </>
  );
};
export default GridNoData;
