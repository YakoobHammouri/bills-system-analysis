import React from 'react';
import Styles from './Style';
import { Grid, Box, Typography, Paper } from '@material-ui/core';

export default () => {
  const classes = Styles();
  return (
    <Box component="div" p={3} width={1}>
      <Grid container item sx={12} justify="center">
        <Paper elevation={3} className={classes.content}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              Billbase
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};
