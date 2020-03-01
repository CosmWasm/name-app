import { makeStyles } from '@material-ui/core/styles';

export const useBaseStyles = makeStyles({
  card: {
    width: '60vw',
    margin: '40px 20px',
    padding: '30px 40px',
    background: '#ebf5fc',
    boxShadow: '-5px -5px 15px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '25px',
    maxWidth: '600px',
    '& ul': {
      listStyleType: 'none',
      padding: '0'
    },
    '& li': {
      display: 'grid',
      gridTemplateColumns: '20% 80%',
    },
    '& li p:first-child': {
      color: '#3d5af1',
    },
  },
  listCardContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCard: {
    width: '60vw',
    margin: '20px',
    padding: '30px 40px',
    borderRadius: '116px',
    background: '#ebf5fc',
    boxShadow: '-5px -5px 15px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: 'inset -5px -5px 10px rgba(255,255,255,0.5), inset 5px 5px 10px rgba(0,0,0,0.05)',
    }
  },
  link: {
    textDecoration: 'none',
    color: '#3d5af1',
  },
  form: {
    height: '115px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '600px',
  },
  input: {
    display: 'flex',
    '& input': {
      height: '30px',
      width: '100%',
      background: '#ebf5fc',
      border: 'none',
      outline: 'none',
      borderRadius: '20px',
      padding: '5px 15px',
      fontSize: '18px',
      color: '#3d5af1',
      boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 1), inset 2px 2px 6px rgba(0, 0, 0, 0.1);',
    }
  },
  isFree: {
    color: '#00BB6D',
    marginBottom: '20px',
    paddingLeft: '8px',
  },
  isOwned: {
    color: '#ff304f',
    marginBottom: '20px',
    paddingLeft: '8px',
  },
  bottomSpacer: {
    marginBottom: '8px',
  }
});