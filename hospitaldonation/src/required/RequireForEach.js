
import React, { useState, useEffect } from "react";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box,
  TextField,
} from "@material-ui/core";
import useTable from "../components/useTable";
import CloseIcon from '@mui/icons-material/Close';
import * as requests from "./services/requestDon";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";
import Controls from "../components/controls/Controls";
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import Popup from "../components/Popup";

import EditRequire from "./EditRequire";

const headCells = [
  { label: "Request By", id: "requestBy"},
  { label: "Request For(dep)", id: "dep_name" },
  { label: "Designation", id: "desig_name" },
  { label: "Item Name", id: "itemname" },
  { label: "Requested Qty", id: "request_qty" },
  { label: "Received Qty", id: "request_qty" },
  { label: "Date", id: "date"  },
  { id: "actions", label: "Actions", disableSorting: true },
];




export const RequireForEach = () => {
  const classes = useStyles();
  const [record, setRecords] = useState([]);
  const [response, setResponse] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);


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
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordAfterPagingAndSorting,
  } = useTable(record, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.requestBy.toLowerCase().includes(target.value) ||
              x.dep_name.toLowerCase().includes(target.value) ||  
              x.itemname.toLowerCase().includes(target.value)
              
          );
      },
    });
  };


  const addOrEditR = (request, resetFormt) => {
    if(request.req_id == null){
     requests.insertRequest("http://localhost:4000/requests/",request )
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

  
  useEffect(() => {
    getAllRequests();
  }, []);
  const getAllRequests = () => {
      const id = localStorage.getItem("id");
    requests
      .getRequestsAllForEach(id)

      .then((data) => {
          console.log("require", data)
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const donations = {
            id: key,
            ...data[key],
          };
          dataarray.push(donations);
        }
        console.log(dataarray);

        setRecords(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };

 
   

//DELETE REQUESTS ONLY WHEN THE

  const onDeleteP = (item) => {
    
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    requests
        .deleteRequestForeach(item.req_stk_id,item)
        .then((data) => {
          setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error",
          });
          getAllRequests()
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  
    
  
  }






  return (
   <>
  <Box className={classes.section} style={{marginTop:3}} >
    <PageHeader  title="All Requests"
                subTitle="List of all requests"
                icon={<CardGiftcardTwoToneIcon fontSize="large" />}/>
  <Paper className={classes.mainpaper} style={{borderRadius:5}}>
             
            <Toolbar>
            <TextField
               variant = "outlined"
               size="small"
                label="Search "
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
            <TblContainer>
              <TblHead />
              <TableBody>
                {response.msg}
                {
                  recordAfterPagingAndSorting().map((item,i) => (
                    <TableRow key={i}>
                
                      <TableCell>{item.requestBy}</TableCell>
                      <TableCell>{item.dep_name}</TableCell>
                      <TableCell>{item.desig_name}</TableCell>
                      <TableCell>{item.itemname}</TableCell>
                      <TableCell>{item.request_qty}</TableCell>
                      <TableCell>{item.receive_qty}</TableCell>
                      <TableCell>{item.date}</TableCell>
                     
                      <TableCell>
 {/* <Controls.ActionButton
                       color="primary"
                       onClick={() => {
                         openInPopup(item);
                       
                       }}
                     >
                       <EditOutlinedIcon fontSize="small" />
                     </Controls.ActionButton> */}
                     <Controls.ActionButton
                       color="error"
                       onClick={() => {
                         setConfirmDialog({
                           isOpen: true,
                           title: "Are you sure to delete this record?",
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
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>

      </Box>
      <Popup
         title="Request Form"
         openPopup={openPopup}
         setOpenPopup={setOpenPopup}  
       >
       <Paper
         className={classes.paper33}
       >
     <EditRequire addOrEditR={addOrEditR}  recordForEdit={recordForEdit}/>

         </Paper>
       </Popup>
           <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          
     </>
   
  );
};

export default RequireForEach;




