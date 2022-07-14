
import React, {useState, useEffect} from "react";
import {
  Box,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from "../../components/BodyStyles";
import * as systemusers from "../services/systemusers";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import { PageHeader } from "../../components/controls/Common";
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import { useHistory } from "react-router-dom"; //import useHistory hook
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditUserForm from "./EditUserForm";

const headCells = [
   
  { label: "User Name", id : "user_full_name"},
  { label: "NIC", id : "user_nic" },
  { label: "Email", id : "user_email" },
  { label: "Department", id : "dep_name" },
  { label: "Designation", id : "desig_name" },
  { id: "actions", label: "Actions", disableSorting: true },
];



const AllUser = () => {
  const history = useHistory(); // useHistory hook redirects the pages
  const classes = useStyles();
  // const [recordForEdit, setRecordForEdit] = useState(null)

  const [record, setRecords] = useState([]);
  const [response, setResponse] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [donorData, setDonorData] = useState([]);
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
  const [recordForEdit, setRecordForEdit] = useState(null);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordAfterPagingAndSorting,
  } = useTable(record, headCells, filterFn);

  
  
  useEffect(() => {
    getAlluser();
  }, []);
  const getAlluser = () => {
    systemusers
      .getAllUsers()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const users = {
            id: key,
            ...data[key],
          };
          dataarray.push(users);
        }
        console.log(dataarray);

        setRecords(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };
  const addOrEdit = (users, resetForm) => {
    if (users.uid == null) {
      systemusers
      .insertUser("http://localhost:4000/system-user/", users)
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
          //  changeCategory();
          getAlluser()
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          setOpenPopup(false);
        } else
        {
          systemusers.updateUser(users.uid, users)
          .then((data) => {
            if (data.status == 200) {
              setNotify({
                isOpen: true,
                message: "Successfully Updated",
                type: "success",
              });
            } else if (data.status == 400) {
              setNotify({
                isOpen: true,
                message: "Something Wrong!",
                type: "warning",
              });
            }
            // changeCategory(item);
            getAlluser()
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        }
          setRecordForEdit(null);
          setOpenPopup(false);
          resetForm();
    
}


const handleSearch = (e) => {
  let target = e.target;
  setFilterFn({
    fn: (items) => {
      if (target.value == "") return items;
      else
        return items.filter(
          (x) =>
            x.user_full_name.toLowerCase().includes(target.value) ||
            x.user_nic.toLowerCase().includes(target.value)
        );
    },
  });
};

const openInPopup = (item) => {
  setRecordForEdit(item);
  setOpenPopup(true);
};



const onDeleteP = (item) => {
  setConfirmDialog({
    ...confirmDialog,
    isOpen: false,
  });
  systemusers
      .deleteUser(item.uid,item)
      .then((data) => {
        getAlluser()
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  setNotify({
    isOpen: true,
    message: "Deleted Successfully",
    type: "error",
  });


}

return (
  <div>
<Box className={classes.section} style={{marginTop:3}} >
<PageHeader
                title="All Users"
                subTitle="List of all users"
                icon={<SupervisorAccountTwoToneIcon fontSize="large" />}
            />
 <Paper className={classes.mainpaper} style={{borderRadius:5, width: "1000px", margin:"0 auto"}}>
      <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
        Users
        </Typography>
       <Divider /> 
       <Toolbar>
             
           <TextField
             label="Search "
             variant = "outlined"
             size="small"
             className={classes.searchInput}
       
             InputProps={{
   
               startAdornment: (
                 <InputAdornment position="start">
                   <SearchIcon />
                 </InputAdornment>
               ),
             }}
             onChange={handleSearch}
           /> 
         </Toolbar>
      
         <TblContainer >
           <TblHead />
           <TableBody>
         
             {
               recordAfterPagingAndSorting().map((item) => (
                 <TableRow key={item.uid} style={{height: 10}}>
                   
                   <TableCell >
                   
                     {item.user_full_name}
                      </TableCell>
                      
                   <TableCell >{item.user_nic}</TableCell>
                  <TableCell  >{item.user_email}</TableCell>
                  <TableCell  >{item.dep_name}</TableCell>
                  <TableCell  >{item.desig_name}</TableCell>
                   <TableCell  >
                     <Controls.ActionButton
                       color="primary"
                       onClick={() => {
                         openInPopup(item);
                       
                       }}
                     >
                       <EditOutlinedIcon fontSize="small" />
                     </Controls.ActionButton>
                     <Controls.ActionButton
                       color="error"
                       onClick={() => {
                         setConfirmDialog({
                           isOpen: true,
                           title: "Are you sure to delete this record?",
                          //  subTitle: "You can't undo this operation",
                           onConfirm: () => {
                             onDeleteP(item);
                           },
                         });
                       }}
                     >
                       <CloseIcon fontSize="small" />
                      
                     </Controls.ActionButton>
                   </TableCell>
                 </TableRow>
                 ))
             }
                
                {response.msg}
            
         </TableBody>  
         </TblContainer>
         <TblPagination />

       <Popup
         title="Edit User Form"
         openPopup={openPopup}
         setOpenPopup={setOpenPopup}  
       >
       <Paper
         className={classes.paper33}
       >
     <EditUserForm addOrEdit={addOrEdit}  recordForEdit={recordForEdit}/>

         </Paper>
       </Popup>

       <Notification notify={notify} setNotify={setNotify} />
        </Paper>
  </Box>
  <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
</div>
);
};

export default AllUser;
