import React from 'react';
import { Typography,AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    customAppBarColor: {
        backgroundColor: 'black',
      },
      
      title: {
        color: '#66fcf1',
      },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));
  
const App=() =>{
    const classes = useStyles();
    return(
        <div className={classes.wrapper}>
      <AppBar className={`${classes.appBar} ${classes.customAppBarColor}`} position="static" color="inherit">
        <Typography variant="h2" align="center"className={classes.title}>Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
        </div>
    )
}

export default App;