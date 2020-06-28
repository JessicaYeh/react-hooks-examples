import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
