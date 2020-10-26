import React, { Fragment, useState, useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbar: theme.mixins.toolbar,
  appTitle: {
    fontSize: "2.3em",
    [theme.breakpoints.down("md")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8em",
    },
  },
  appTitleBtn: {
    color: "white",
    padding: 0,
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  loginSignUpBtns: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
  },
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
  drawerIcon: {},
  drawerIconContainer: {
    color: "white",
    padding: 0,
    marginRight: 10,
  },
}));

function LoggedOutHeader() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue, setTabValue] = useState(false);

  const handleTabValueChange = (e, value) => {
    setTabValue(value);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/ppt-generator":
        if (tabValue !== 0) {
          setTabValue(0);
        }
        break;
      case "/highlighter":
        if (tabValue !== 1) {
          setTabValue(1);
        }
        break;
      case "/summarizer":
        if (tabValue !== 2) {
          setTabValue(2);
        }
        break;
      case "/question-answer":
        if (tabValue !== 3) {
          setTabValue(3);
        }
        break;
      case "/question-generator":
        if (tabValue !== 4) {
          setTabValue(4);
        }
        break;
      default:
        break;
    }
  }, [tabValue]);

  const NavMenu = (
    <Fragment>
      <Tabs
        value={tabValue}
        className={classes.tabContainer}
        onChange={handleTabValueChange}
      >
        <Tab
          label="PPT Generator"
          className={classes.tab}
          component={Link}
          to="/ppt-generator"
        />
        <Tab
          label="Highlighter"
          className={classes.tab}
          component={Link}
          to="/highlighter"
        />
        <Tab
          label="Summarizer"
          className={classes.tab}
          component={Link}
          to="/summarizer"
        />
        <Tab
          label="Question-Answer"
          className={classes.tab}
          component={Link}
          to="/question-answer"
        />
        <Tab
          label="Question Generator"
          className={classes.tab}
          component={Link}
          to="/question-generator"
        />
      </Tabs>
      <Button variant="contained" className={classes.loginSignUpBtns}>
        Login
      </Button>
    </Fragment>
  );

  const ddrawer = (
    <Fragment>
      <Drawer
        className={classes.drawer}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <List disablePadding>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(0);
            }}
            divider
            button
            component={Link}
            to="/ppt-generator"
            selected={tabValue === 0}
          >
            <ListItemText className={classes.drawerItem}>
              PPT Generator
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(1);
            }}
            divider
            button
            component={Link}
            to="/highlighter"
            selected={tabValue === 1}
          >
            <ListItemText>Highlighter</ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(2);
            }}
            divider
            button
            component={Link}
            to="/summarizer"
            selected={tabValue === 2}
          >
            <ListItemText>Summarizer</ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(3);
            }}
            divider
            button
            component={Link}
            to="/question-answer"
            selected={tabValue === 3}
          >
            <ListItemText>Question-Answer</ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(4);
            }}
            divider
            button
            component={Link}
            to="/question-generator"
            selected={tabValue === 4}
          >
            <ListItemText>Question-Generator</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
        disableTouchRipple
      >
        <Menu
          className={classes.drawerIcon}
          // fontSize={matchesExtraSmall ? "" : "large"}
        />
      </IconButton>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          {matchesMedium ? (
            <Fragment>
              {ddrawer}
              <Button
                disableRipple
                component={Link}
                to="/"
                className={classes.appTitleBtn}
                onClick={() => setTabValue(false)}
              >
                <Typography variant="h3" className={classes.appTitle}>
                  TransLearn
                </Typography>
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                disableRipple
                component={Link}
                to="/"
                className={classes.appTitleBtn}
                onClick={() => setTabValue(false)}
              >
                <Typography variant="h3" className={classes.appTitle}>
                  TransLearn
                </Typography>
              </Button>
              {NavMenu}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default LoggedOutHeader;
