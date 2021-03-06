import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import { AppBar, Drawer, Toolbar, Grid, Typography, IconButton, Badge, Divider } from "material-ui";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import { withStyles } from "material-ui/styles";
import MenuIcon from 'material-ui-icons/Menu';
import { Dashboard, Assignment, Settings, Person, Notifications, ExitToApp } from "material-ui-icons";

import treadmill from "../../treadmill.png";
// import heisenberg from "../../heisenberg.jpg";
import qrcode from "../../qrcode.png";
import logo from "../../husky-logo.png";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  hamburger: {
    marginRight: -12,
  },
  typography: {
    margin: 10,
  },
  float: {
    position: "fixed",
    bottom: 15,
    right: 15,
    zIndex: 100,
  }
};

const titles = {
  "/reserve": "Reserve",
  "/my-reservations": "My reservations",
  "/settings" : "Settings",
  "/membership" : "Membership",
  "/qr" : "Scan QR code",
  "/" : "Dashboard",
}

const links = [
  {path: "/", name: "Dashboard", icon: <Dashboard />},
  {path: "/reserve", name: "Reserve", icon: <img alt="ss" src={treadmill} />},
  {path: "/my-reservations", name: "My reservations", icon: <Assignment />},
  {path: "/settings", name: "Settings", icon: <Settings />},
  {path: "/membership", name: "Membership", icon: <Person />},
  {path: "/qr", name: "Scan qr code", icon: <img alt="qr" src={ qrcode } />},
  {path: "/logout", name: "Logout", icon: <ExitToApp />},
]

class UserProfile extends Component {
  render = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}>
        <Grid item style={{paddingTop: "12%", paddingBottom: "10%"}}>
          <img alt="heisenberg" style={{width: 100, height: 100, margin: 10}} src={user.imageUrl} />
          <Typography align="center" variant="body1">{user.name}</Typography>
        </Grid>
      </Grid>
    );
  }

}

const MyLink = props => <NavLink exact activeStyle={{ backgroundColor: "#ccc" }}  {...props} />


class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer = (e) => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleNotificationClick = (e) => {
    this.props.onNotificationClick(this.notiIcon);
  }

  render = () => {
    const classes = this.props.classes;
    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer}
          onClick={this.toggleDrawer}>
          <div>
            <UserProfile />
            <Divider />
            {links.map((l, i) => {
              return (
                <ListItem component={MyLink} to={l.path} key={i} button>
                  <ListItemIcon>
                    {l.icon}
                  </ListItemIcon>
                  <ListItemText primary={l.name} />
                </ListItem>
              )
            })}
            <Divider />

          </div>
        </Drawer>

        <AppBar className={classes.root}>
          <Toolbar style={{paddingLeft: 10}}>
            <Link style={{paddingRight: 10}} to="/">
              <img alt="logo" src={logo} style={{width: 40}} />
            </Link>

            <Typography color="inherit" variant="title" className={classes.flex}>
              <strong>{titles[this.props.location.pathname]}</strong>
            </Typography>
            <IconButton
              ref={node => {
                this.notiIcon = node;
              }}
              onClick={this.handleNotificationClick} color="inherit">
              <Badge badgeContent={2} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton onClick={this.toggleDrawer} className={classes.hamburger} color="inherit">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NavigationBar));
