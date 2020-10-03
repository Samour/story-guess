import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core';
import { DataGrid, Columns } from '@material-ui/data-grid';
import { Category, GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { IGuessItemsTableConfig } from '../../../state/config/guessItemsTable';
import { IGuessItemsListStrings } from '../../../state/strings/guessItemsList';
import { IState } from '../../../state';
import { getManager } from '../../../services/manager';

const useStyles = makeStyles(() => createStyles({
  table: {
    height: 500,
  },
}));

interface ICState {
  tableConfig: IGuessItemsTableConfig;
  strings: IGuessItemsListStrings;
  categoryStringMap: Map<Category, string>;
  filterCategory: Category | 'ALL';
  loading: boolean;
  data: PageResponse<GuessItemDto> | undefined;
}

const mapState = (state: IState): ICState => ({
  tableConfig: state.config.guessItemsTable,
  strings: state.strings.guessItemsList,
  categoryStringMap: state.strings.categories.categories,
  filterCategory: state.guessItemsList.category,
  loading: state.guessItemsList.loading,
  data: state.guessItemsList.page,
});

function Table({ tableConfig, strings, categoryStringMap, filterCategory, loading, data }: ICState): JSX.Element {
  useEffect(() => {
    getManager().getGuessItemsListService().initialise();
  }, [filterCategory]);

  const classes = useStyles();

  const columns: Columns = [
    { headerName: strings.columns.answer, field: 'title', width: tableConfig.colWidths.answer, sortable: false },
    { headerName: strings.columns.category, field: 'category', width: tableConfig.colWidths.category, sortable: false },
  ];

  const rows = (data?.items || []).map((r) => ({
    ...r,
    category: categoryStringMap.get(r.category),
  }));

  return (
    <div className={classes.table}>
      <DataGrid autoPageSize
        disableSelectionOnClick
        paginationMode="server"
        loading={loading}
        columns={columns}
        rows={rows}
        rowCount={data?.total || 0}
        pageSize={tableConfig.pageSize}
        rowsPerPageOptions={[tableConfig.pageSize]} />
    </div>
  );
}

export default connect(mapState)(Table);
