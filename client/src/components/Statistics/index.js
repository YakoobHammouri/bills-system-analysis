import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  List,
  Divider,
} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { Bar } from 'react-chartjs-2';
import swal from 'sweetalert';
import LoaderProgress from '../../common-components/LoaderProgress';
import Ils from '../../assets/ils.svg';
import Styles from './style';

const data = {
  labels: [],
  datasets: [
    {
      label: 'Consumption',
      data: '',
      backgroundColor: Object.values(teal).splice(
        2,
        Object.values(teal).length,
      ),
      borderColor: '#fff',
      borderWidth: 1,
    },
  ],
};

export default (props) => {
  const classes = Styles();

  const [chartData, setChartData] = useState({});
  const [historyBill, setHistoryBill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayBlock, setIsDisplayBlock] = useState(true);

  const getBillHistory = () =>
    axios.get(`/api/bill/getBillByType/${props.match.params.bill_type}`);

  const getBillStatistics = () =>
    axios.get(
      `/api/bill/${props.match.params.bill_type}/statistics/${props.match.params.billId}`,
    );

  useEffect(() => {
    Promise.all([getBillHistory(), getBillStatistics()])
      .then((results) => {
        const history = results[0];
        const statistics = results[1];

        setHistoryBill(history.data.Result);

        const { amount, amountLabels } = statistics.data.Result;

        data.datasets[0].data = amount;
        data.labels = amountLabels;
        setChartData(data);

        if (!history.data.Result) {
          setIsLoading(false);
        }
        if (history.data.Result.length === 0) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          swal('Error', err.response.data.message, 'error');
        }
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const BuildBillHistory = (history) => {
    if (!history) {
      return [];
    }
    if (history.length === 0) {
      return [];
    }

    return history.map((bill, index) => {
      if (history.length - 1 === index && isLoading) {
        setIsLoading(false);
      }

      const dueDate = new Date(bill.due_date);

      return (
        <Fragment key={index}>
          <ListItem>
            <ListItemText>
              <Typography component="span" variant="subtitle1">
                {dueDate.toLocaleString('default', { month: 'long' })}
              </Typography>
              <Typography
                component="span"
                variant="overline"
                className={classes.yearText}
              >
                {dueDate.getFullYear()}
              </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <span>
                <img src={Ils} />
              </span>
              <span>{bill.total_amount}</span>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </Fragment>
      );
    });
  };

  const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
  const displayHistory = !historyBill || !historyBill.length ? 'none' : 'block';
  return (
    <Box component="div" p={3} width={1}>
      <LoaderProgress isLoading={isLoading} />
      <Box component="div" width={1} display={displayStatus}>
        <Grid container item sx={12} justify="center">
          <Grid item container xs={12}>
            <Typography variant="h4" color="textPrimary" align="left">
              {props.title}
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
            <Box width={1} mt={3}>
              <Typography variant="caption" color="textPrimary" align="left">
                {props.providerName}
              </Typography>
            </Box>
            <Box width={1} className={classes.chartPaper} mt={1}>
              <Bar
                data={chartData}
                options={{
                  scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                  legend: { display: true, position: 'top' },
                }}
              />
            </Box>
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
            <Box width={1} mt={3} display={displayHistory}>
              <Typography variant="h5" color="textPrimary" align="left">
                History
              </Typography>
            </Box>
            <Box width={1} mt={1} display={displayHistory}>
              <Paper className={classes.historyList}>
                <List>{BuildBillHistory(historyBill)}</List>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
