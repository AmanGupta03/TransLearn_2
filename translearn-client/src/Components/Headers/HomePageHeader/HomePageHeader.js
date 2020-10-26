import React, { Fragment, useState, useEffect } from "react";
import {
  AppBar,
  Button,
  ClickAwayListener,
  Divider,
  Drawer,
  Grid,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { Menu, AccountCircle, Close as CloseIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import Logo from "../../../Assets/Images/logoo.svg";
import LogoDrawer from "../../../Assets/Images/right.svg";
import "./HomePageHeader.css";

const useStyles = makeStyles((theme) => ({
  appBarTop: {
    height: 100,
    background: theme.palette.primary.mainGradient,
  },
  appBarScrolledDown: {
    height: 75,
    [theme.breakpoints.down("md")]: {
      height: 70,
    },
    [theme.breakpoints.down("sm")]: {
      height: 65,
    },
    background: "rgba(30,30,30,1)",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  acntBtnContainer: {
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      marginRight: 25,
    },
  },
  paperMenu: {
    width: 100,
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    color: "white",
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  exploreBtnContainer: {
    color: "black",
    backgroundColor: "white",
    position: "relative",
    left: 500,
  },
  exploreBtnHidden: {
    visibility: "hidden",
  },
  loginSignUpBtnsDiv: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
  },
  loginSignUpBtns: {
    marginLeft: 10,
    marginRight: 10,
  },
  drawer: {
    width: 300,
  },
  drawerPaper: {
    width: 300,
  },
  drawerIcon: {},
  drawerIconContainer: {
    color: "white",
    padding: 0,
    marginRight: 10,
  },
}));

function HomePageHeader() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down("lg"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue, setTabValue] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openAcntBtn, setOpenAcntBtn] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleTabValueChange = (e, value) => {
    setTabValue(value);
  };

  const handleAcntBtnToggle = () => {
    setOpenAcntBtn((prevOpen) => !prevOpen);
  };

  const handleAcntBtnClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenAcntBtn(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAcntBtn(false);
    }
  }
  const prevOpen = React.useRef(openAcntBtn);

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    if (prevOpen.current === true && openAcntBtn === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openAcntBtn;
  }, [openAcntBtn]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  }, [scrollY]);

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

  const exploreBtn = (
    <Button
      disableTouchRipple
      className={classes.exploreBtnHidden}
      // scrollY > 550 ? classes.exploreBtnHidden : classes.exploreBtnContainer
    >
      EXPLORE
    </Button>
  );

  const AccountBtn = (
    <div className={classes.acntBtnContainer}>
      <IconButton
        ref={anchorRef}
        aria-controls={openAcntBtn ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleAcntBtnToggle}
        style={{ padding: 0 }}
      >
        <AccountCircle style={{ color: "white" }} fontSize="large" />
      </IconButton>
      <Popper
        open={openAcntBtn}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paperMenu}>
              <ClickAwayListener onClickAway={handleAcntBtnClose}>
                <MenuList
                  autoFocusItem={openAcntBtn}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleAcntBtnClose}
                    component={Link}
                    to="/login"
                  >
                    Sign In
                  </MenuItem>
                  <MenuItem
                    onClick={handleAcntBtnClose}
                    component={Link}
                    to="/register"
                  >
                    Register
                  </MenuItem>
                  {/* <MenuItem onClick={handleAcntBtnClose}>Logout</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
  const XLNavMenu = (
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
      <div className={classes.loginSignUpBtnsDiv}>
        <Button
          variant="contained"
          className={classes.loginSignUpBtns}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          className={classes.loginSignUpBtns}
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </div>
    </Fragment>
  );

  const logoButton = (
    <Button
      component={Link}
      to="/"
      className={classes.logoContainer}
      disableRipple
      disableTouchRipple
      disableFocusRipple
    >
      <ReactSVG src={Logo} className={matchesMedium ? "logo" : "logo-big"} />
    </Button>
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
          <ListItem>
            <Grid
              container
              className="logo-drawer-div"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <ReactSVG src={LogoDrawer} className="logo-drawer" />
              </Grid>
              <Grid item>
                <IconButton
                  disableTouchRipple
                  disableRipple
                  disableFocusRipple
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
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
    </Fragment>
  );
  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={
          scrollY > 200 ? classes.appBarScrolledDown : classes.appBarTop
        }
        elevation={0}
      >
        <Toolbar>
          {matchesMedium ? (
            <Fragment>
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.drawerIconContainer}
                disableTouchRipple
              >
                <Menu className={classes.drawerIcon} />
              </IconButton>

              {logoButton}
              {exploreBtn}
              {AccountBtn}

              {ddrawer}
            </Fragment>
          ) : (
            <Fragment>
              {logoButton}
              {XLNavMenu}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default HomePageHeader;
