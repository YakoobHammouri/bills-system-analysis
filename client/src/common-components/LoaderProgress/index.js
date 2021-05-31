import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Style from './style';

export default ({ isLoading }) => {
  const classes = Style();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" size={60} thickness={2} />
    </Backdrop>
  );
};
