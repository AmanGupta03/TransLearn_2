import React from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { HelpOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  titleBar: {
    // backgroundColor: "green",
    height: 80,
    padding: 5,
  },
  headingGrid: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: 60,
    },
  },
  instructions: {
    // marginLeft: "auto",
  },
  instructionText: {
    // fontSize: "1em",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7em",
    },
  },
}));

function TitleBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid
      item
      container
      justify="center"
      className={classes.titleBar}
      alignItems="center"
    >
      <Grid item xs={matchesXSmall ? 8 : 8} container>
        <Grid
          item
          xs={12}
          container
          justify={matchesXSmall ? "flex-start" : "flex-end"}
        >
          <Grid item className={classes.headingGrid}>
            <Typography variant={matchesMedium ? "h4" : "h3"}>
              {props.heading}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={matchesXSmall ? 4 : 4}>
        <Grid
          item
          xs={12}
          container
          className={classes.instructions}
          justify="flex-end"
        >
          <Grid item container xs={matchesXSmall ? 8 : 6} justify="center">
            <Grid item>
              <HelpOutline />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionText}>
                How it works
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TitleBar;
