import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, CssBaseline } from '@material-ui/core';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import theme from './Theme/MaterialTheme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />

    <React.StrictMode>
      <Grid container direction="column">
        <App />
      </Grid>
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
