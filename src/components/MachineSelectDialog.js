import React, { Component } from 'react';
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from "material-ui";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { Up, StatusChip } from "./UtilComponents";
import { machineTypes, evalStatus } from "../fakeData"

class MachineSelectDialog extends Component {
  state = {
    open: false,
    start: "now",
    futureTime: "3:30pm"
  };

  handleStartChange = (e) => {
    this.setState({start: e.target.value});
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        transition={Up}
      >
        <DialogTitle id="responsive-dialog-title">
            <strong>Machine information</strong>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={4}>
              <img alt="ss" src={machineTypes[this.props.machine.type]} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={8} style={{fontSize: "0.875rem", lineHeight: "140%"}}>
              <div>
                <strong>ID: </strong>{this.props.machine.id}
              </div>
              <div >
                <strong>Type: </strong>{this.props.machine.type}
              </div>
              <div>
                <strong>Status: </strong> {<StatusChip status={evalStatus(this.props.machine)} />}
              </div>
              <div>
                <strong>Queue size: </strong>{this.props.machine.queueSize}
              </div>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="subheading"><strong>Description</strong></Typography>
                <Divider/>
                <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                  {`${this.props.machine.description}`}
                </Typography>
                <Divider/>
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={this.state.start === "now"}
                      onChange={this.handleStartChange}
                      value="now"
                    />
                  }
                  label="Now"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={this.state.start === "other"}
                      onChange={this.handleStartChange}
                      value="other"
                    />
                  }
                  label="Later at"
                />
                <TextField
                  onClick={() => this.setState({start: "other"})}
                  disabled={this.state.start === "other" ? false : true}
                  id="time" type="time" />
                <InputLabel htmlFor="duration">Duration</InputLabel>
                <br/>
                <Input
                  style={{maxWidth: 80}}
                  value={20}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} variant="raised" color="default">
            Discard
          </Button>
          <Button onClick={(e) => {
            let revs = JSON.parse(localStorage.getItem("reservations"));
            revs.push(this.props.machine);
            localStorage.setItem("reservations", JSON.stringify(revs));
            this.props.handleDialogClose(e);
            this.props.sendSnackbarMsg("Reserved", {label: "View", link: "/my-reservations"});
          }} variant="raised" color="primary" autoFocus>
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(MachineSelectDialog);
