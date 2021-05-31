import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  inputContainer: {
    padding: theme.spacing(4),
  },
  optionStyle: {
    color: '#000',
  },

  title: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px `,
  },
  lable: {
    paddingTop: '25px',
    color: '#F2F2F2',

    textAlign: 'left',
  },
  gridPosition: {
    margin: `${theme.spacing(2)}px  0 `,
  },
  inputGrid: {
    // opacity: '0.5',
    // borderBottom: '0.5px solid #F2F2F2',
  },
  inputText: {
    backgroundColor: '#616161',
    padding: '0 8px',
    width: 300,
    [theme.breakpoints.down('sm')]: { width: 100 },
  },

  datePicker: {
    color: '#000',
    textColor: '#000',
    calendarTextColor: '#000',
    selectColor: '#000',
    selectTextColor: '#000',
    calendarYearBackgroundColor: '#000',
    headerColor: '#000',
    '& MuiPickersDay-day': { color: '#000' },
    //.MuiTypography-colorInherit
  },
  addbtn: {
    width: 250,
    marginTop: theme.spacing(5),
  },
}));
