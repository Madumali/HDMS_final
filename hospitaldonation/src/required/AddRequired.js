
import React, { useState } from "react";
import RequiredForm from "./RequiredForm";
import { Paper, Box } from "@mui/material";
import * as requestDon from "./services/requestDon";
import Notification from "../components/Notification";
import Controls from "../components/controls/Controls";
import {useHistory} from "react-router-dom";
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
const AddRequired = () => {

  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [records, setRecords] = useState();
  const [response, setResponse] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const history = useHistory();


  const addOrEditR = (request, resetFormt) => {
   if(request.req_id == null){
    requestDon.insertRequest("http://localhost:4000/requests/",request )
        .then((data) =>  {
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
    resetFormt()
    
    setRecords()
  }

  
  return (
    <Box className={classes.section} style={{marginTop:3}} >

    <PageHeader
                title="New Request"
                subTitle="Create new request for donation"
                icon={<CardGiftcardTwoToneIcon fontSize="large" />}
            />
  <Paper className={classes.mainpaper} style={{borderRadius:5, width:"500px", margin:"0 auto"}}>
      <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
        Request Donation
        </Typography>
       <Divider /> 
        <RequiredForm addOrEditR = {addOrEditR}/>
        <Notification
          notify={notify}
          setNotify={setNotify} /> 
        </Paper>
    </Box>
  );
};

// addOrEdit={addOrEdit} addOrEditS={addOrEditS} 






export default AddRequired;