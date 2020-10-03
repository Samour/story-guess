import React, { ReactElement, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { DataGrid, Columns, CellParams, PageChangeParams } from '@material-ui/data-grid';
import { Category, GuessItemDto, GuessItemStatus } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { IGuessItemsTableConfig } from '../../../state/config/guessItemsTable';
import { IGuessItemsListStrings } from '../../../state/strings/guessItemsList';
import { IState } from '../../../state';
import { getManager } from '../../../services/manager';
import { viewGuessItemEvent } from '../../../events/ViewGuessItemEvent';

const useStyles = makeStyles((theme) => createStyles({
  table: {
    height: 500,
  },
  removedIcon: {
    color: theme.palette.secondary.main,
    marginRight: 10,
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

interface IActions {
  openItem: (itemId: string) => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  openItem: (itemId) => dispatch(viewGuessItemEvent(itemId)),
});

function Table({
  tableConfig,
  strings,
  categoryStringMap,
  filterCategory,
  loading,
  data,
  openItem,
}: ICState & IActions): JSX.Element {
  useEffect(() => {
    getManager().getGuessItemsListService().initialise();
  }, [filterCategory]);

  const classes = useStyles();

  const renderTitleCell = (cell: CellParams): ReactElement => {
    const icon = () => {
      if (cell.data.status !== GuessItemStatus.ACTIVE) {
        return <Cancel className={classes.removedIcon} />;
      } else {
        return null;
      }
    };

    return (
      <>
        {icon()}
        {cell.value}
      </>
    );
  };

  const columns: Columns = [
    {
      headerName: strings.columns.answer,
      field: 'title',
      width: tableConfig.colWidths.answer,
      sortable: false,
      renderCell: renderTitleCell,
    },
    { headerName: strings.columns.category, field: 'category', width: tableConfig.colWidths.category, sortable: false },
  ];

  const onPageChange = (page: PageChangeParams) => getManager().getGuessItemsListService().loadPage(
    (page.page - 1) * page.pageSize,
    page.pageSize,
  );

  const rows = (data?.items || []).map((r) => ({
    ...r,
    category: categoryStringMap.get(r.category),
  }));

  return (
    <div className={classes.table}>
      <DataGrid disableSelectionOnClick
        paginationMode="server"
        loading={loading}
        columns={columns}
        rows={rows}
        rowCount={data?.total || 0}
        pageSize={tableConfig.pageSize}
        rowsPerPageOptions={[tableConfig.pageSize]}
        onRowClick={(r) => openItem(r.data.id as string)}
        onPageChange={onPageChange} />
    </div>
  );
}

export default connect(mapState, mapActions)(Table);
