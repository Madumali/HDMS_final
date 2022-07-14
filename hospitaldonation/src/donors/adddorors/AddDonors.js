import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AddDonorsForm from "./AddDonorsForm";
import {
  Paper,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import useTable from "../../components/useTable";
import * as donors from "../services/donors";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import { PageHeader } from "../../components/controls/Common";
import { useStyles } from "../../components/BodyStyles";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';



const headCells = [
  { id: "national_id", label: "NIC" },
  { id: "donor_name", label: "Name" },
  { id: "address_line1", label: "Address1" },
  { id: "address_line2", label: "Address2" },
  { id: "email", label: "Email" },
  { id: "contact_no", label: "Telephone" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export const AddDonors = () => {
 
  const classes = useStyles();
  const [response, setResponse] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
 
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
 


  const addOrEdit = (donor, resetForm) => {
    if (donor.donor_id == null) {
      donors
        .insertDonor("http://localhost:4000/donors/", donor)
        .then((data) => {
          console.log("don",data)
          setResponse(data);
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
    } 
    resetForm();
  };



  return (
  
 <Box className={classes.section} style={{marginTop:1}} >
      <PageHeader
                title="New Donor"
                subTitle="Create new donor"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

   <Paper className={classes.mainpaper}  style={{borderRadius:5,margin:"0 auto",width:1000, padding:"25px"}}>
      
         <>
        <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
        Donor Information
         </Typography>
        <Divider />
              <AddDonorsForm
              
                addOrEdit={addOrEdit}
              />
              <Notification notify={notify} setNotify={setNotify} />
         
      
       
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          </>
       
    
      </Paper>
    </Box>
  );
};

export default AddDonors;
