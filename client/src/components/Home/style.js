import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  typeContainer: {
    padding: theme.spacing(2),
  },
  root: {
    width: 150,
    height: 150,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: theme.spacing(1),
  },

  addBtnGridFixPosition: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(1),
  },
  addIcon: { fontSize: 100, color: '#fff' },
  BillNullText: {
    marginTop: '50%',
  },
}));
