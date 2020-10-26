// import React, {  Fragment } from "react";
// import {
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from "@material-ui/core";
// import firebase from "../../../config/firebase";
// import { makeStyles } from "@material-ui/styles";
// import { HelpOutline } from "@material-ui/icons";

// import Heading from "./Heading";

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     height: "50vh",
//   },
//   drawerPaper: {
//     height: "50vh",
//   },
// }));

// function PptGenerator(props) {
//   const classes = useStyles();

//   const bottomDrawer = (
//     <Fragment>
//       <Drawer
//         anchor="bottom"
//         className={classes.drawer}
//         open={openDrawer}
//         onClose={() => setOpenDrawer(false)}
//         classes={{ paper: classes.drawerPaper }}
//       >
//         <div className={classes.toolbar} />
//         <List disablePadding>
//           <ListItem
//             onClick={() => {
//               setOpenDrawer(false);
//             }}
//             divider
//             button
//           >
//             <ListItemText className={classes.drawerItem}>
//               PPT Generator
//             </ListItemText>
//           </ListItem>
//         </List>
//       </Drawer>
//       <HelpOutline onClick={() => setOpenDrawer(!openDrawer)} />
//     </Fragment>
//   );

//   return (
//     <div>a</div>
//   );
//   async function handleClick() {
//     console.log("btn clicked");
//     // try {
//     //   await firebase.addNametoDb(name);
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   }
// }

// export default PptGenerator;
