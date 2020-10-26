import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Highlight from "../../../../Assets/Images/Cards/highlight.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    height: 396,
    width: 330,
    margin: 0,
  },
  cardActionBtn: {
    fontSize: "1.05em",
    paddingTop: 12,
    paddingBottom: 12,
    width: "90%",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    position: "relative",
    top: "178px",
    left: "16px",
  },
  cardImage: {
    height: "100%",
  },
  cardHeader: {
    // background: "rgb(30,233,66)",
    fontSize: "2.8rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#f1f1f1",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
  },
});

function FeatureCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia image={props.cardImage} className={classes.cardImage}>
        <CardHeader
          disableTypography
          className={classes.cardHeader}
          title={props.cardHeading}
        />
        <CardActions>
          <Button
            disableTouchRipple
            className={classes.cardActionBtn}
            component={Link}
            to={props.to}
          >
            {props.cardActions}
            <ArrowForwardIcon style={{ color: "white", marginLeft: 7 }} />
          </Button>
        </CardActions>
      </CardMedia>
    </Card>
  );
}

export default FeatureCard;
