import React, { useState } from "react";
// import { useHistory } from "react-router";
import { Box, Paper } from "@mui/material";
import  NewUserForm  from "./NewUserForm.js";
// import PageHeader from "../../components/PageHeader";
import * as systemusers from "../services/systemusers";
import Notification from "../../components/Notification";
import { useStyles } from "../../components/BodyStyles.js";
import { PageHeader } from "../../components/controls/Common.js";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
const paperStyle = { variant:"outlined", padding: 20, height: '100vh', width: '150vh', margin: "0.01vh auto", border : '1px solid lightBlue',borderRadius: 5 }

 export const AddNewUsers = () => {

  const classes = useStyles();
    // const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  
  
  const addOrEdit = (users, resetForm) => {
    
        systemusers.insertUser("http://localhost:4000/system-user/", users).then((data) => {
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
    // else
        // employeeService.updateEmployee(employee)
    resetForm()
  //   setNotify({
  //     isOpen: true, 
  //     message: "Successfully submitted!",
  //     type: 'success'
  // })
    setRecords()
  }

  return (
    <Box className={classes.section} style={{marginTop:1}} >
    <PageHeader
                title="New User"
                subTitle="Create new user"
                icon={<SupervisorAccountTwoToneIcon fontSize="large" />}
            />
 <Paper className={classes.mainpaper} style={{borderRadius:5,margin:"0 auto",width:1000}}>
 <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
       User Information
       </Typography>
      <Divider />
    <NewUserForm addOrEdit={addOrEdit}/>
    <Notification  
    notify={notify}
    setNotify={setNotify}/>
</Paper>

    </Box>
  );
};

export default AddNewUsers;
