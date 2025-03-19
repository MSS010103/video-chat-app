import React, {useContext, useState} from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    underline: {
        '&:before': {
          borderBottomColor: 'white', // Set the color for the line here
        },
        '&:hover:not($disabled):before': {
          borderBottomColor: 'white', // Set the color for the line on hover here
        },
      },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
      background:'black',
    },
    textname:{
        color: '#66fcf1'
    },
    textfield: {
        width: '100%',
        marginBottom: theme.spacing(2),
        color:'white',
      },
      input: {
        color: 'white', // Set your text color here
      },
      inputLabel: {
        color: 'white', // Set your text color for placeholder here
      },
  }));
  

const Options=({children}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes=useStyles();
    return (
        <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography className={classes.textname} gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth
              className={classes.textfield}
              InputProps={{
                className: classes.input,
                classes: {
                  underline: classes.underline,
                },
              }}
              InputLabelProps={{
                className: classes.inputLabel,
              }}/>
              <CopyToClipboard text={me} className={classes.margin}>
             
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
             
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography className={classes.textname} gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth
              className={classes.textfield}
              InputProps={{
                className: classes.input,
                classes: {
                  underline: classes.underline,
                },
              }}
              InputLabelProps={{
                className: classes.inputLabel,
              }}/>
            {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth onClick={leaveCall} className={classes.margin}>
               Hang up
              </Button>
            ) :(
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
            )
            }
                
            </Grid>
            </Grid>
            </form>
            {children}
            </Paper>
            
           
            </Container>
            );
};

export default Options;