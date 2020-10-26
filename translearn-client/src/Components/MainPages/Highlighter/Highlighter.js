import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Slider,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Header from "../../Headers/Header/Header";
import TitleBar from "../Helpers/TitleBar/TitleBar";

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
    height: 700,
  },
  formGrid: {
    marginTop: "-120px",
    backgroundColor: "white",
  },
  formArea: {
    width: "100%",
  },
  uploadAreaGrid: {
    // width: "100%",
    // height: 100,
    height: 230,
    // backgroundColor: "brown",
  },
  uploadBtnArea: {
    // backgroundColor: "yellow",
    padding: 15,
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
    [theme.breakpoints.up("md")]: {
      padding: 30,
    },
  },
  uploadBtn: {
    display: "none",
  },
  uploadedFilesListGrid: {
    // backgroundColor: "cyan",
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
    [theme.breakpoints.up("md")]: {
      padding: 30,
    },
  },
  uploadedFilesList: {
    height: 190,
    [theme.breakpoints.down("xs")]: {
      maxWidth: 200,
    },
  },
  fileUploadedItemInList: {
    fontSize: "0.95em",
    marginTop: "-10px",
    marginBottom: "-10px",
  },
  sliderGrid: {
    // backgroundColor: "brown",
    height: 100,
  },
  sliderInstruction: {
    // backgroundColor: "red",
  },
  slider: {
    marginTop: 10,
    // backgroundColor: "yellow",
  },
  submitGridArea: {
    // backgroundColor: "orange",
    height: 50,
  },
  submitBtnGrid: {
    // backgroundColor: "cyan",
  },
}));

function Highlighter() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [ratio, setRatio] = useState(0.3);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [response, setResponse] = useState([]);
  const isMounted = useRef(true);
  const fileInput = useRef(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // console.log("initial useEffect on render faltu....");
  }, []);

  const valuetext = (value) => value;

  const onChangeSlider = (e, value) => {
    let sliderRatio = value / 100;
    console.log(sliderRatio);
    setRatio(sliderRatio);
  };

  const getRequestData = useCallback(() => {
    // console.log("inside get uploaded files");

    const filesObj = fileInput.current.files;
    if (Object.keys(filesObj).length === 0) {
      return null;
    }

    const requestData = new FormData();
    let numberOfFiles = filesObj.length;

    for (let file = 0; file < numberOfFiles; file++) {
      requestData.append("files", filesObj[file]);
    }

    requestData.append("ratio", ratio);
    // console.log("endof getRequestData function");
    return requestData;
  }, [ratio]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("inside usecallback onsubmit vala");
      if (isSendingRequest) {
        console.log("already sending req");
        return;
      }
      let filesData = getRequestData();
      if (filesData === null) {
        alert("no files selected");
        return;
      }
      // console.log("filesData in useCallback - ", filesData); // check the format
      setIsSendingRequest(true);
      // console.log("sending request set to true....");

      await axios({
        method: "post",
        url: "https://translearn-check.herokuapp.com/highlight",
        data: filesData,
      })
        .then((res) => {
          console.log("then block entered.........got some response");
          let highlightedDocs = JSON.parse(res.request.response)
            .highlighted_doc;
          // console.log(highlightedDocs);
          // highlightedDocs.forEach((highlightedDoc) => {
          //   if (!highlightedDoc.hasOwnProperty("message")) {
          //     // setResponse([...response, highlightedDoc]);
          //     setResponse(response.push(highlightedDoc));
          //   } else {
          //     // setFailedHighlightedFiles([
          //     //   ...failedHighlightedFiles,
          //     //   highlightedDoc,
          //     // ]);
          //     setFailedHighlightedFiles(
          //       failedHighlightedFiles.push(highlightedDoc)
          //     );
          //   }
          // });
          setResponse(highlightedDocs);
          // console.log("then finished..........got response");
          // console.log("response from ucb");
          console.log(response);
          // console.log("uploadedFiles from ucb");
          // console.log(uploadedFiles);
        })
        .catch((err) => console.log(err));

      // only update if we are still mounted
      if (isMounted.current) {
        // console.log("setting sending request to false");
        setIsSendingRequest(false);
      }
    },
    [isSendingRequest, response, getRequestData]
  );

  function showUploadedFiles() {
    const current = fileInput.current;

    // if (current && current.files.length > 0) {
    let filesToBeUploaded = [];
    for (let file of current.files) {
      filesToBeUploaded = filesToBeUploaded.concat(<p>{file.name}</p>);
    }
    setUploadedFiles(filesToBeUploaded);
    // return uploadedFiles;
    // }
    // return null;
  }

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
          <TitleBar heading="Highlighter" feature="hilighlighter" />

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
              {/* upload area */}
              <Grid container item xs={12} className={classes.uploadAreaGrid}>
                <Grid
                  item
                  container
                  xs={5}
                  sm={6}
                  className={classes.uploadBtnArea}
                  // justify={matchesXSmall ? "center" : "flex-end"}
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <input
                      accept="application/pdf,application/msword"
                      className={classes.uploadBtn}
                      id="file"
                      multiple
                      type="file"
                      ref={fileInput}
                      onChange={showUploadedFiles}
                      disabled={isSendingRequest}
                    />
                    <label htmlFor="file">
                      <Button
                        variant="contained"
                        component="span"
                        disabled={isSendingRequest}
                      >
                        Upload Files
                      </Button>
                    </label>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={7}
                  sm={6}
                  className={classes.uploadedFilesListGrid}
                  // justify={matchesXSmall ? "center" : "flex-start"}
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid
                    item
                    className={
                      uploadedFiles.length > 0 ? classes.uploadedFilesList : ""
                    }
                    // style={{ backgroundColor: "blue" }}
                  >
                    <p
                      style={{
                        paddingRight: 40,
                        paddingLeft: 40,
                        marginBottom: 10,
                        fontSize: "0.95rem",
                      }}
                    >
                      Uploaded file(s):
                    </p>
                    <Divider style={{ marginLeft: 40 }} />
                    <div
                      style={{
                        overflow: "hidden",
                        overflowY: "auto",
                        height: "100%",
                        maxHeight: "130px",
                      }}
                    >
                      <ol>
                        {uploadedFiles.length > 0 &&
                          uploadedFiles.map((uploadedFile) => {
                            return (
                              <li className={classes.fileUploadedItemInList}>
                                {uploadedFile}
                              </li>
                            );
                          })}
                      </ol>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justify="center"
                className={classes.sliderGrid}
              >
                <Grid
                  item
                  xs={12}
                  container
                  className={classes.sliderInstruction}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      // id="discrete-slider"
                      align="center"
                      gutterBottom
                      style={{ color: "#282828", fontSize: "0.9rem" }}
                    >
                      Set Percentage of text you want to highlight (default is
                      30%)
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  className={classes.slider}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={10} md={8} lg={6}>
                    <Slider
                      // name="sliderr"
                      defaultValue={ratio * 100}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      onChange={onChangeSlider}
                      step={10}
                      marks
                      min={10}
                      max={100}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <br />
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
                    variant="contained"
                    disabled={isSendingRequest}
                    onClick={onSubmit}
                    // color="secondary"
                    // style={{ color: "white" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <br />
              <Grid
                item
                container
                xs={12}
                style={{ height: 50 }}
                justify="center"
                alignitems="center"
              >
                <Grid item xs={10} md={8} lg={6}>
                  {isSendingRequest ? <LinearProgress /> : null}
                </Grid>
                {response.length > 0 &&
                  response.map((responseFile) => {
                    let fileName = String(
                      responseFile.highlighted_doc
                    ).substring(55);
                    return (
                      <div>
                        <a
                          href={`https://translearn-check.herokuapp.com${responseFile.highlighted_doc}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {`Highlighted-${fileName}`}
                        </a>
                      </div>
                    );
                  })}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Highlighter;
