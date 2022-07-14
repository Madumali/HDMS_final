import React, { useState } from "react"; // importing react library, useState hook
import { Paper, Box } from "@material-ui/core"; //importing paper, box from material ui
import DonationForm from "./DonationForm"; //import donation form
import * as donations from "../services/donations"; //import functions file
import Notification from "../../components/Notification"; //import notification component
import { useHistory } from "react-router-dom"; //import useHistory hook
import { PageHeader } from "../../components/controls/Common"; //import page header component
import { useStyles } from "../../components/BodyStyles"; //import styles component
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export const AddDonation = () => {
  //start of the functional component(arrow function)

  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: [],
    type: "",
  });
  const history = useHistory(); // useHistory hook redirects the pages

  //addOrEdit function is defined
  const addOrEdit = (donitems, resetFormt) => {
    //if item name is not empty insertDonation function is executing and redirects to the letter(Print.js)
    if (donitems.item_name != "") {
      donations
        .insertDonation("http://localhost:4000/donations/", donitems)
        .then((data) => {
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Success",
              type: "success",
            });
            history.push("/print");
          } else if (data.status == 400) {
            //if name is empty error will occur
            setNotify({
              isOpen: true,
              message: "Please fill all the details!",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else resetFormt();
  };

  return (
    <>
    <Box className={classes.section} style={{ marginTop: 3 }}>
 
   <PageHeader
                title="New Donation"
                subTitle="Create new donation"
                icon={<VolunteerActivismIcon fontSize="large" />}
            />
      <Paper
        className={classes.mainpaper}
        style={{ borderRadius: 5, width: "500px", margin: "0 auto" }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ paddingBottom: 15, marginTop: -5, textAlign: "center" }}
        >
          Donation Information
        </Typography>
        <Divider />
        {/* addOrEdit function is passed to DonationForm component   */}
        <DonationForm addOrEdit={addOrEdit} />
        {/* Notification component displays error/ success message */}
        <Notification notify={notify} setNotify={setNotify} />
       
      </Paper>


    </Box>

    

</>
  );
};

export default AddDonation; //exporting the function
