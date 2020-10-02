import React from 'react';
import { Grid } from '@material-ui/core';
import Table from './Table';

export default function GuessItemsList(): JSX.Element {
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Grid container direction="row">
          <Grid item xs={12} md={9}>
            <strong>Search</strong>
          </Grid>
          <Grid item xs={12} md={3}>
            <strong>Category</strong>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
