import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chartPaper: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    boxShadow:
      '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 5,
  },
  historyList: {
    backgroundColor: theme.palette.secondary.main,
    padding: `0 0 ${theme.spacing(4)}px 0`,
  },
  yearText: { padding: `0 ${theme.spacing(1)}px` },
}));
