import React, { useState } from "react";
import IssuanceForm from "./IssuanceForm";
import { Paper, Box } from "@mui/material";
import * as issuanceadd from "./service/issuanceadd";
import Notification from "../components/Notification";
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";

const AddIssuance = () => {
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
// FUNCTION TO ENTER ISSUE DATA
  const addOrEditI = (issue, resetFormt) => {
    if (issue.issuance_id == null) {
      issuanceadd
        .insertIssuance("http://localhost:4000/issuance/", issue)
        .then((data) => {
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Successfully Added",
              type: "success",
            });
          } else if (data.status == 400) {
            setNotify({
              isOpen: true,
              message: "Something Wrong!",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else
      setNotify({
        isOpen: true,
        message: "Something Wrong!",
        type: "warning",
      });
    resetFormt();
  };

  return (
    <Box className={classes.section} style={{ marginTop: 3 }}>
      <PageHeader
        title="New Issuance"
        subTitle="Create new issuance for donation"
        icon={<LocalShippingTwoToneIcon fontSize="large" />}
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
          Issuance Information
        </Typography>
        <Divider />
        {/* Issuance form component imported and pass the addOrEditI function */}
        <IssuanceForm addOrEditI={addOrEditI} />  
        {/* Notification component */}
        <Notification notify={notify} setNotify={setNotify} />
      </Paper>
    </Box>
  );
};

export default AddIssuance;
