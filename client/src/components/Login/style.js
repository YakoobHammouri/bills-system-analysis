import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    marginBottom: '4%',
    marginLeft: '4%',
    fontFamily: 'Roboto',
    fontstyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'flex-end',
    width: '294px',
    height: '164px',
  },
  loginBtn: {
    height: '50px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '7px',
  },
  inputBox: {
    height: '44px',
    borderColor: '#FFF !important',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '10%',
    width: '100%',
    borderBottom: '1px solid #FFFFFF',
  },
  input: {
    height: '40px',
  },
  errorMessage: {
    color: '#FFF',
    marginBottom: '10%',
    marginLeft: '2%',
    width: '100%',
  },
  loginForm: {
    width: '100%',
    margin: '20% 4% 20% 4%',
  },
}));
