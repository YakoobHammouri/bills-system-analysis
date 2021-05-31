import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

import {
  Grid,
  Box,
  Typography,
  InputLabel,
  NativeSelect,
  InputAdornment,
  Input,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import LoaderProgress from '../../common-components/LoaderProgress';

import Styles from './style';
import { tr } from 'date-fns/locale';

export default () => {
  const classes = Styles();
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState(new Date());
  const [billData, setbillData] = useState({
    billType: {
      value: '',
      lable: 'Type of bill',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'dropDown',
    },
    provider: {
      value: '',
      lable: 'Provider name ',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'dropDown',
    },

    billDate: {
      value: new Date(),
      lable: ' Bill Date',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'Date',
    },

    dueDate: {
      value: new Date(),
      lable: ' Due Date',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'Date',
    },
    toDate: {
      value: new Date(),
      lable: 'Type of bill',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'Date',
    },
    fromDate: {
      value: new Date(),
      lable: 'From',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'Date',
    },
    totalAmount: {
      value: '',
      lable: 'Total amount',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'text',
    },
    billNumber: {
      value: '',
      lable: 'Bill Number',
      message: '',
      isValid: true,
      isRequired: true,
      type: 'text',
    },
  });
  const [billType, setBillType] = useState([]);
  const [providerType, setProviderType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayBlock, setIsDisplayBlock] = useState(true);

  useEffect(() => {
    const min = new Date();
    min.setDate(1);
    min.setMonth(0);
    min.setFullYear(min.getFullYear() - 50);
    setMinDate(min);

    axios
      .get('/api/getBillType')
      .then((result) => {
        setBillType(result.data.Result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          swal('Error', err.response.data.message, 'error');
        }
        setIsLoading(false);
      });
  }, []);

  const handleTextInput = (event) => {
    const form = { ...billData };
    form[event.target.name].value = event.target.value;
    form[event.target.name].message = '';
    form[event.target.name].isValid = true;

    setbillData(form);
  };

  const billTypeHandleChange = (event) => {
    setIsLoading(true);
    if (!event.target.value) {
      swal('Error', 'please choose a value from the option', 'error');
      setIsLoading(false);
      return;
    }
    handleTextInput(event);

    axios
      .get(`/api/providers/getProviders/${event.target.value}`)
      .then((result) => {
        setProviderType(result.data.Result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          swal('Error', err.response.data.message, 'error');
        }
        setIsLoading(false);
      });
  };

  const clearDataField = () => {
    const inputData = { ...billData };

    for (const control of Object.keys(inputData)) {
      const input = inputData[control];
      input.value = input.type === 'Date' ? new Date() : '';
      input.message = '';
      input.isValid = true;
    }

    setbillData(inputData);
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValid = true;
    setIsLoading(true);
    const inputData = { ...billData };

    // eslint-disable-next-line no-restricted-syntax
    for (const control of Object.keys(inputData)) {
      const input = inputData[control];

      if (
        input.isRequired &&
        (input.type === 'text' || input.type === 'dropDown')
      ) {
        if (!input.value.trim()) {
          input.message =
            input.type === 'dropDown'
              ? `Please choose  ${input.lable} from the option`
              : `Please Enter ${input.lable}`;
          input.isValid = false;
          formValid = false;
        } else {
          input.message = '';
          input.isValid = true;
        }
      }
    }

    setbillData(inputData);
    if (!formValid) {
      setIsLoading(false);
      return;
    }

    const data = {
      providerId: billData.provider.value,
      type: billData.billType.value,
      totalAmount: billData.totalAmount.value,
      billDate: billData.billDate.value,
      dueDate: billData.dueDate.value,
      startDate: billData.fromDate.value,
      endDate: billData.toDate.value,
      billNumber: billData.billNumber.value,
    };

    axios
      .post('/api/new-bill', data)
      .then((res) => {
        if (res.data.status !== 200) {
          swal(res.data.messg);
          return;
        }
        clearDataField();
        swal('Good job!', "'Bill added succesfully", 'success');
      })
      .catch((error) => {
        console.log('error : ', { ...error });
        setIsLoading(false);
        if (error.response.data) {
          swal('Error', error.response.data.message, 'error');
        }
      });
  };

  const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

  // console.log('Bill Data : ', billData);
  return (
    <Box component="div" pt={3} width={1}>
      <LoaderProgress isLoading={isLoading} />
      <Box component="div" display={displayStatus} width={1}>
        <Grid container item sx={12} justify="center">
          <Grid item container xs={12}>
            <Typography
              variant="h4"
              color="textPrimary"
              align="left"
              className={classes.title}
            >
              New Bill
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="space-evenly"
            className={classes.inputContainer}
            direction="row"
            alignItems="center"
          >
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid
                container
                justify="center"
                spacing={1}
                alignItems="flex-end"
              >
                {/* type of bill */}
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  className={classes.inputGrid}
                >
                  <Grid item xs={5}>
                    <InputLabel className={classes.lable} htmlFor="bill-type">
                      {billData.billType.lable}
                    </InputLabel>
                  </Grid>
                  <Grid
                    xs={5}
                    className={classes.gridPosition}
                    justify="flex-end"
                  >
                    <NativeSelect
                      value={billData.billType.value}
                      className={classes.inputText}
                      error={!billData.billType.isValid}
                      onChange={billTypeHandleChange}
                      inputProps={{
                        name: 'billType',
                        id: 'bill-type',
                      }}
                      input={<Input />}
                    >
                      <option value="" className={classes.optionStyle}></option>
                      {billType.map((type, index) => (
                        <option
                          key={index}
                          value={type}
                          className={classes.optionStyle}
                        >
                          {type}
                        </option>
                      ))}
                    </NativeSelect>
                  </Grid>
                </Grid>

                <Grid
                  xs={12}
                  item
                  className={classes.errorTitle}
                  justify="flex-start"
                >
                  <FormControl error className={classes.errorTitle}>
                    <FormHelperText className={classes.textError}>
                      {billData.billType.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* Provider name */}
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  className={classes.inputGrid}
                >
                  <Grid xs={5}>
                    <InputLabel htmlFor="provider" className={classes.lable}>
                      {billData.provider.lable}
                    </InputLabel>
                  </Grid>
                  <Grid xs={5} className={classes.gridPosition}>
                    <NativeSelect
                      value={billData.provider.value}
                      className={classes.inputText}
                      onChange={handleTextInput}
                      error={!billData.provider.isValid}
                      disabled={!providerType.length}
                      inputProps={{
                        name: 'provider',
                        id: 'provider',
                      }}
                      input={<Input />}
                    >
                      <option value="" className={classes.optionStyle}></option>
                      {providerType.map((type, index) => (
                        <option
                          key={index}
                          value={type.id}
                          className={classes.optionStyle}
                        >
                          {type.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </Grid>
                </Grid>

                <Grid
                  xs={12}
                  item
                  className={classes.errorTitle}
                  justify="flex-start"
                >
                  <FormControl error className={classes.errorTitle}>
                    <FormHelperText className={classes.textError}>
                      {billData.provider.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {/* Data One  */}
                  <Grid item container xs={12} justify="space-between">
                    <Grid container item xs={5} alignItems="center">
                      <KeyboardDatePicker
                        margin="normal"
                        id="billDate"
                        name="billDate"
                        label={billData.billDate.lable}
                        format="MM/dd/yyyy"
                        value={billData.billDate.value}
                        onChange={handleTextInput}
                        minDate={minDate}
                        maxDate={maxDate}
                        className={classes.datePicker}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      {/* </Grid> */}
                    </Grid>

                    <Grid item container xs={5} alignItems="center">
                      <KeyboardDatePicker
                        margin="normal"
                        label={billData.dueDate.lable}
                        id="dueDate"
                        name="dueDate"
                        format="MM/dd/yyyy"
                        value={billData.dueDate.value}
                        onChange={handleTextInput}
                        minDate={minDate}
                        maxDate={maxDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Data Two  */}
                  <Grid item container xs={12} justify="space-between">
                    <Grid item container xs={5} alignItems="center">
                      <KeyboardDatePicker
                        margin="normal"
                        id="fromDate"
                        name="fromDate"
                        label={billData.fromDate.lable}
                        format="MM/dd/yyyy"
                        value={billData.fromDate.value}
                        onChange={handleTextInput}
                        minDate={minDate}
                        maxDate={maxDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>

                    <Grid item container xs={5}>
                      <KeyboardDatePicker
                        margin="normal"
                        color="secondary"
                        id="toDate"
                        name="toDate"
                        format="MM/dd/yyyy"
                        label={billData.toDate.lable}
                        style={{ color: '#000' }}
                        value={billData.toDate.value}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleTextInput}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
                {/* amount */}
                <Grid item container xs={12} justify="space-between">
                  <Grid xs={5}>
                    <InputLabel htmlFor="provider" className={classes.lable}>
                      {billData.totalAmount.lable}
                    </InputLabel>
                  </Grid>
                  <Grid xs={5} className={classes.lable}>
                    <TextField
                      color="secondary"
                      id="totalAmount"
                      name="totalAmount"
                      error={!billData.totalAmount.isValid}
                      onChange={handleTextInput}
                      value={billData.totalAmount.value}
                      className={classes.inputText}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₪</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  xs={12}
                  item
                  className={classes.errorTitle}
                  justify="flex-start"
                >
                  <FormControl error className={classes.errorTitle}>
                    <FormHelperText className={classes.textError}>
                      {billData.totalAmount.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* Number */}
                <Grid item container xs={12} justify="space-between">
                  <Grid xs={5}>
                    <InputLabel htmlFor="billNumber" className={classes.lable}>
                      {billData.billNumber.lable}
                    </InputLabel>
                  </Grid>
                  <Grid xs={5} className={classes.lable}>
                    <TextField
                      color="secondary"
                      id="billNumber"
                      name="billNumber"
                      className={classes.inputText}
                      value={billData.billNumber.value}
                      error={!billData.billNumber.isValid}
                      onChange={handleTextInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">#</InputAdornment>
                        ),
                        inputProps: { min: 1, max: 20 },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  xs={12}
                  item
                  className={classes.errorTitle}
                  justify="flex-start"
                >
                  <FormControl error className={classes.errorTitle}>
                    <FormHelperText className={classes.textError}>
                      {billData.totalAmount.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item container xs={12} justify="center">
                  <Button
                    type="submit"
                    size="large"
                    color="secondary"
                    variant="contained"
                    className={classes.addbtn}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
