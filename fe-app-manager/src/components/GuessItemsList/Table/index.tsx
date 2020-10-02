import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DataGrid, Columns } from '@material-ui/data-grid';
import { IGuessItemsTableConfig } from '../../../state/config/guessItemsTable';
import { IGuessItemsListStrings } from '../../../state/strings/guessItemsList';
import { IState } from '../../../state';
import { PageResponse } from '../../../../../ts-shared/dtos/page';
import { GuessItemDto } from '../../../../../ts-shared/dtos/guess/GuessItem';
import { getManager } from '../../../services/manager';

interface ICState {
  tableConfig: IGuessItemsTableConfig;
  strings: IGuessItemsListStrings;
  loading: boolean;
  data: PageResponse<GuessItemDto> | undefined;
}

const mapState = (state: IState): ICState => ({
  tableConfig: state.config.guessItemsTable,
  strings: state.strings.guessItemsList,
  loading: state.guessItemsList.loading,
  data: state.guessItemsList.page,
});

function Table({ tableConfig, strings, loading, data }: ICState): JSX.Element {
  useEffect(() => {
    getManager().getGuessItemsListService().initialise();
  }, []);

  const columns: Columns = [
    { headerName: strings.columns.answer, field: 'title', width: tableConfig.colWidths.answer, sortable: false },
    { headerName: strings.columns.category, field: 'category', width: tableConfig.colWidths.category, sortable: false },
  ];

  const rows = data?.items || [];

  return (
    <div className="guess-item-table-container">
      <DataGrid autoPageSize
        disableSelectionOnClick
        loading={loading}
        columns={columns}
        rows={rows}
        pageSize={tableConfig.pageSize}
        rowsPerPageOptions={[tableConfig.pageSize]} />
    </div>
  );
}

export default connect(mapState)(Table);
