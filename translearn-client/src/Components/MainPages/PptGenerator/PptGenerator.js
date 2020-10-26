import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import axios from "axios";
import {
  Button,
  Drawer,
  FormControl,
  Input,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  LinearProgress,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Header from "../../Headers/Header/Header";
import TitleBar from "../Helpers/TitleBar/TitleBar";
import "./PptGenerator.css";
import Axios from "axios";
import { Language } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    backgroundColor: "#404040",
    marginTop: 75,
    [theme.breakpoints.down("md")]: {
      marginTop: 70,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 65,
    },
  },
  layoutGridContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: "#D8D8D8",
    height: 800,
  },
  formGrid: {
    // marginTop: "-300px",
    backgroundColor: "white",
  },
  formArea: {
    width: "100%",
  },
  searchBarLangGrid: {
    height: 110,
    // backgroundColor: "cyan",
  },
  searchBarAreaGrid: {},
  searchBarGrid: {
    marginLeft: 10,
  },
  langAreaGrid: {
    // backgroundColor: "black",
  },
  langDropDownGrid: {
    // backgroundColor: "yellow",
  },
  langDropDown: {
    width: 150,
    [theme.breakpoints.down("xs")]: {
      width: 80,
    },
  },
  submitGridArea: {
    // backgroundColor: "orange",
    height: 100,
  },
  pptResponseGrid: {
    height: 500,
    // backgroundColor: "red",
    padding: 5,
  },
  pptFileGridArea: {
    height: 60,
    // backgroundColor: "orange",
  },
  pptFileGrid: {
    // backgroundColor: "brown",
  },
  suggestionsTextGridArea: {
    // backgroundColor: "yellow",
    height: 50,
  },
  suggestionsGridArea: {
    height: 400,
    // backgroundColor: "black",
  },
  suggestionsGrid: {
    // backgroundColor: "green",
  },
  drawer: {
    height: "50vh",
  },
  drawerPaper: {
    height: "50vh",
  },
}));

function PptGenerator(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState(1);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [receivedPptFile, setReceivedPptFile] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [alternatePpts, setAlternatePpts] = useState([]);
  const [unmatchedTitle, setUnmatchedTitle] = useState("");
  const [error, setError] = useState("");
  const [uploadedPpt, setuploadedPpt] = useState([]);
  const isMounted = useRef(true);
  const fileInput = useRef(null);
  const suggestionsListRef = useRef(null);

  // const prevLanguage = useRef(1);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSuggestionSearchSubmit = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    onSubmit();
  };

  useEffect(() => {
    if (error !== "") {
      suggestionsListRef.current = null;
    } else {
      setError("");
      suggestionsListRef.current =
        suggestions.length > 0 &&
        suggestions.map((suggestionListItem) => {
          return (
            <ul className="suggestions-unordered-list">
              <li className="suggestions-li-item" key={suggestionListItem}>
                {suggestionListItem}
                <Button
                  className="suggestions-li-item-search-btn"
                  onClick={() => onSuggestionSearchSubmit(suggestionListItem)}
                >
                  Search
                </Button>
              </li>
            </ul>
          );
        });
    }
  }, [suggestions, error]);

  // useEffect(() => {
  //   prevLanguage.current = language;
  // }, [language]);

  useEffect(() => {
    console.log("initial useEffect on render faltu....");
  }, []);
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      let searchQueryText = searchQuery;
      if (searchQueryText === "") {
        alert("Please enter something in search bar!");
        return;
      }
      console.log("inside usecallback onsubmit vala");
      if (isSendingRequest) {
        console.log("already sending req");
        return;
      }
      const languageMap = ["eng", "hindi", "tamil"];
      setIsSendingRequest(true);
      //https://translearn-check.herokuapp.com/ppt
      await axios({
        method: "GET",
        url: `https://pptmaker.herokuapp.com/ppt/?topic=${searchQueryText}&lang=${
          languageMap[language - 1]
        }`,
      })
        .then((res) => {
          console.log(res);
          let response = res.data;
          if (response.status !== "success") {
            setError("Some Error Occurred!");
            return;
          }
          if (response.status === "success" && error !== "") {
            setError("");
          }
          if (response.match === false) {
            setUnmatchedTitle(response.title);
          }
          // console.log(response);
          setReceivedPptFile(`https://pptmaker.herokuapp.com/${response.file}`);
          console.log(receivedPptFile);
          setSuggestions(response.suggestion);
          console.log(suggestions);
          setAlternatePpts(response.alternate);
          console.log(alternatePpts);
        })
        .catch((err) => console.log(err));
      if (isMounted.current) {
        // console.log("setting sending request to false");
        setIsSendingRequest(false);
      }
    },
    [
      isSendingRequest,
      error,
      searchQuery,
      language,
      alternatePpts,
      receivedPptFile,
      suggestions,
    ]
  );
  return (
    <div className={classes.root}>
      <Header />
      <Grid container className={classes.gridContainer}>
        <Grid
          item
          container
          xs={12}
          className={classes.layoutGridContainer}
          justify="center"
        >
          {/* titlebar */}
          <TitleBar heading="PPT Generator" feature="PPT Generator" />

          <Grid
            container
            item
            xs={12}
            md={10}
            lg={8}
            justify="center"
            className={classes.formGrid}
          >
            <form className={classes.formArea}>
              <Grid
                container
                item
                // xs={12}
                className={classes.searchBarLangGrid}
              >
                <Grid
                  item
                  container
                  xs={9}
                  className={classes.searchBarAreaGrid}
                  // justify={matchesXSmall ? "center" : "flex-end"}
                  justify={matchesXSmall ? "flex-start" : "center"}
                  alignItems="center"
                >
                  <Grid item className={classes.searchBarGrid}>
                    <input
                      id="search-bar"
                      type="search"
                      placeholder="Search"
                      onChange={handleSearchQueryChange}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={3}
                  className={classes.langAreaGrid}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item className={classes.langDropDownGrid}>
                    <Select
                      value={language}
                      className={classes.langDropDown}
                      onChange={(e) => setLanguage(e.target.value)}
                      // input={<BootstrapInput name="currency" id="language-select" />}
                    >
                      <MenuItem value={1}>English</MenuItem>
                      <MenuItem value={2}>Hindi</MenuItem>
                      <MenuItem value={3}>Tamil</MenuItem>
                    </Select>
                    {/* {console.log(language)} */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                className={classes.submitGridArea}
                justify="center"
                alignItems="center"
              >
                <Grid item className={classes.submitBtnGrid}>
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={isSendingRequest}
                    onClick={onSubmit}
                    style={{
                      backgroundColor: "#212121",
                      color: "white",
                      padding: 5,
                      height: 45,
                      width: 150,
                      fontSize: "1em",
                    }}
                  >
                    Generate PPT
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                // justify="center"
                className={classes.pptResponseGrid}
              >
                <div>{error !== "" ? error : null}</div>
                {suggestions.length > 0 && suggestionsListRef.current ? (
                  <Fragment>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.pptFileGridArea}
                      justify="center"
                    >
                      <Grid
                        item
                        container
                        xs={12}
                        md={6}
                        className={classes.pptFileGrid}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item container xs={12}>
                          <Grid item xs={6} style={{ paddingRight: 20 }}>
                            <Typography align="right">
                              PPT Generated:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <a
                              href={receivedPptFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="got-ppt-btn"
                            >
                              PPT File
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.suggestionsTextGridArea}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid
                        item
                        container
                        xs={12}
                        className={classes.submitBtnGrid}
                      >
                        <Grid item xs={12}>
                          <Typography align="center">Suggestions: </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.suggestionsGridArea}
                      justify="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={10}
                        md={8}
                        lg={8}
                        className={classes.suggestionsGrid}
                      >
                        {suggestions.length > 0 && suggestionsListRef.current}
                      </Grid>
                    </Grid>
                  </Fragment>
                ) : null}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default PptGenerator;
//   async function handleClick() {
//     console.log("btn clicked");
//     // try {
//     //   await firebase.addNametoDb(name);
//     // } catch (error) {
//     //   console.log(error);
//     // }
// }

// const bottomDrawer = (
//   <Fragment>
//     <Drawer
//       anchor="bottom"
//       className={classes.drawer}
//       open={openDrawer}
//       onClose={() => setOpenDrawer(false)}
//       classes={{ paper: classes.drawerPaper }}
//     >
//       <div className={classes.toolbar} />
//       <List disablePadding>
//         <ListItem
//           onClick={() => {
//             setOpenDrawer(false);
//           }}
//           divider
//           button
//         >
//           <ListItemText className={classes.drawerItem}>
//             PPT Generator
//           </ListItemText>
//         </ListItem>
//       </List>
//     </Drawer>
//     {/* <HelpOutline onClick={() => setOpenDrawer(!openDrawer)} /> */}
//   </Fragment>
// );
