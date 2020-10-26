import React, { Fragment } from "react";
import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomePageHeader from "../../Headers/HomePageHeader/HomePageHeader";
import image from "../../../Assets/Images/clouds-sunset.jpg";
import ReactPlayer from "react-player";
import { Highlight, Ppt, pexels } from "../../../Assets/index";
import FeatureCard from "./Cards/FeatureCard";
import "./HomePage.css";

const useStyles = makeStyles({
  player: {
    marginBottom: "40px",
  },
  cardContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  explore: {
    margin: "25px",
    padding: "20px",
  },
});

function HomePage() {
  const classes = useStyles();
  return (
    <Fragment>
      <ReactPlayer
        className={classes.player}
        url={pexels}
        height="100%"
        width="100vw"
        playing
        // controls
        loop
      />
      <HomePageHeader />
      <Grid item xs={12} className={classes.explore}>
        <Typography variant="h4">
          Explore
          <Divider />
        </Typography>
      </Grid>

      <Grid
        container
        justify="space-around"
        className={classes.cardContainer}
        spacing={8}
      >
        <Grid item container justify="center" xs={12} sm={6} md={6} lg={4}>
          <FeatureCard
            cardImage={Highlight}
            cardHeading="Highlight Documents"
            cardActions="HIGHLIGHTER"
            to="/highlighter"
          />
        </Grid>
        <Grid item container justify="center" xs={12} sm={6} md={6} lg={4}>
          <FeatureCard
            cardImage={Ppt}
            cardHeading="Generate Powerpoints"
            cardActions="GENERATE PPTs"
            to="/ppt-generator"
          />
        </Grid>
        <Grid item container justify="center" xs={12} sm={6} md={6} lg={4}>
          <FeatureCard
            cardHeading="Summarize Documents"
            cardActions="SUMMARIZER"
            to="/summarizer"
          />
        </Grid>
        <Grid item container justify="center" xs={12} sm={6} md={6} lg={4}>
          <FeatureCard
            cardHeading="Question Answer"
            cardActions="ANSWER YOUR QUESTIONS"
            to="/question-answer"
          />
        </Grid>
        <Grid item container justify="center" xs={12} sm={6} md={6} lg={4}>
          <FeatureCard
            cardHeading="Question Generator"
            cardActions="GENERATE QUESTIONS"
            to="question-generator"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default HomePage;
