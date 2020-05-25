import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd"
import { Typography } from '@material-ui/core';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TrialItems() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <Typography component="div">
      <Grid container spacing={1} direction="column">
        <Grid style={{background:"#E3E3E3"}} item container xs={12}>
          <Grid item xs={1}>
          <ReceiptIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
          <Grid alignContent="flex-start" direction="column" item container xs={3}>
          <Grid style={{color:"red", fontSize:20, fontWeight:"bold"}}>
          $105.97
          </Grid>
<Grid>Mon, December 17</Grid>
          </Grid>
          <Grid alignContent="flex-start" direction="column" item container xs={7}>
          <Grid style={{fontSize:20}}>VERIZON ONLINE PMT</Grid>
<Grid>Checking</Grid>
          </Grid>
          <Grid item xs={1}>
          <PostAddIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
        </Grid>

        <Grid style={{background:"white"}} item container xs={12}>
          <Grid item xs={1}>
          <AttachMoneyIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
          <Grid alignContent="flex-start" direction="column" item container xs={5} sm={3}>
          <Grid style={{color:"green", fontSize:20, fontWeight:"bold"}}>
          $10,294.97
          </Grid>
<Grid>Mon, December 17</Grid>
          </Grid>
          <Grid alignContent="flex-start" direction="column" wrap="nowrap" item container xs={5} sm={7}>
          <Grid style={{fontSize:20}}>U-TRADE Direct Deposit</Grid>
<Grid>Checking</Grid>
          </Grid>
          <Grid item xs={1}>
          <PostAddIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
        </Grid>

        <Grid style={{background:"#E3E3E3"}} item container xs={12}>
          <Grid item xs={1}>
          <ReceiptIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
          <Grid alignContent="flex-start" direction="column" item container xs={3}>
          <Grid style={{color:"red", fontSize:20, fontWeight:"bold"}}>
          $105.97
          </Grid>
<Grid>Mon, December 17</Grid>
          </Grid>
          <Grid alignContent="flex-start" direction="column" item container xs={7}>
          <Grid style={{fontSize:20}}>VERIZON ONLINE PMT</Grid>
<Grid>Checking</Grid>
          </Grid>
          <Grid item xs={1} >
          <PostAddIcon style={{paddingTop: "5px", float: "left"}} />
          </Grid>
        </Grid>


      </Grid>

      </Typography>
    </div>
  );
}
