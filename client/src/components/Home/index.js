import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Paper, IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import LoaderProgress from '../../common-components/LoaderProgress';
import Water from '../../assets/water.svg';
import Communication from '../../assets/communication.svg';
import Electricity from '../../assets/electricity.svg';
import Internet from '../../assets/internet.svg';
import Styles from './style';

export default () => {
  const classes = Styles();
  const [userBillType, setUserBillType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayBlock, setIsDisplayBlock] = useState(false);

  useEffect(() => {
    axios
      .get('/api/home')
      .then((result) => {
        setUserBillType(result.data.Result);
        if (!result.data.Result) {
          setIsLoading(false);
          setIsDisplayBlock(true);
        }
        if (result.data.Result.length === 0) {
          setIsLoading(false);
          setIsDisplayBlock(true);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          swal('Error', err.response.data.message, 'error');
        }
        setIsLoading(false);
        setIsDisplayBlock(true);
      });
  }, []);

  const BillCard = (index, type, imgSrc) => (
    <Link to={`/bill/${type}`}>
      <Paper key={index} className={classes.root} elevation={3}>
        <img src={imgSrc} className={classes.imageType} />
      </Paper>
    </Link>
  );

  const buildBillType = (types) => {
    if (!types) {
      return [];
    }
    if (types.length === 0) {
      return [];
    }
    return types.map((type, index) => {
      if (types.length - 1 === index && isLoading) {
        setIsLoading(false);
        setIsDisplayBlock(true);
      }
      switch (type.type.toLocaleLowerCase()) {
        case 'electricity':
          return BillCard(index, 'electricity', Electricity);
        case 'water':
          return BillCard(index, 'water', Water);
        case 'internet':
          return BillCard(index, 'internet', Internet);
        case 'communication':
          return BillCard(index, 'communication', Communication);
        default:
          return (
            <Paper key={index} className={classes.root} elevation={3}>
              <Typography variant="h5">Unknown</Typography>
            </Paper>
          );
      }
    });
  };

  const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

  const billLengthStatus =
    !isLoading && (!userBillType || userBillType.length === 0)
      ? 'block'
      : 'none';

  const billAddClassName =
    !isLoading && (!userBillType || userBillType.length <= 3)
      ? classes.addBtnGridFixPosition
      : '';

  return (
    <Box component="div" p={3} width={1}>
      <LoaderProgress isLoading={isLoading} />
      <Box component="div" display={displayStatus} width={1}>
        <Grid container item sx={12} justify="center">
          <Grid item container xs={12}>
            <Typography variant="h4" color="textPrimary" align="left">
              Billbase
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="space-evenly"
            className={classes.typeContainer}
            direction="row"
            alignItems="center"
          >
            {buildBillType(userBillType)}
          </Grid>
          <Grid>
            <Box
              component="div"
              display={billLengthStatus}
              width={1}
              className={classes.BillNullText}
            >
              <Typography
                variant="h4"
                color="textPrimary"
                align="center"
                display="none"
              >
                Please Add Bills
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="flex-end"
            className={billAddClassName}
            id="444"
          >
            <Link to="/new-bill">
              <IconButton color="secondary" aria-label="add an alarm">
                <AddCircleOutline className={classes.addIcon} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
