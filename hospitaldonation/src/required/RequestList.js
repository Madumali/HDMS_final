

import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box,
  TextField,
  Button,
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
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import IssueRelease from "../issuance/IssueRelease";
import * as issuanceadd from "../issuance/service/issuanceadd";

const headCells = [
  // { label: "Request No", id: "req_id"},
  { label: "Request By", id: "requestBy"},
  { label: "Request For(dep)", id: "dep_name" },
  { label: "Designation", id: "desig_name" },
  { label: "Item Name", id: "itemname" },
  { label: "Requested Qty", id: "request_qty" },
  { label: "Issued Qty", id: "request_qty" },
  { label: "Date", id: "date"  },

  { id: "actions", label: "Actions", disableSorting: true },
];




export const RequestList = (props) => {
  const classes = useStyles();
  const [record, setRecords] = useState([]);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState({})
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForEdit2, setRecordForEdit2] = useState(null);
  const [roleItems, setItemsData] = useState([]);

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
const id = localStorage.getItem("userrole");
const [auth, setAuth] = useState(true);

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

//this function will issue donations if availabe for a particular request
  const addOrEditI = (issue, resetFormt) => {

    if (issue.issue_itemqty !== null) {
      issuanceadd
        .insertIssuance("http://localhost:4000/issuance/requestissue", issue)
        .then((data) => {
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Successfully Added",
              type: "success",
            });
            getAllRequests();
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
        setOpenPopup(false);
      } 
       
    resetFormt();
   
     
  };

  
  useEffect(() => {
    getAllRequests();
  }, []);
  const getAllRequests = () => {
    requests
      .getRequestsAll()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        // setUserData(arr);
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

  useEffect(()=>{
    if(id == "admin" || id == "front user")
    {
      setAuth(true);
    } else {
      setAuth(false);
    }
   
    }, []);
    const openInPopup = (item) => {
      setRecordForEdit(item);
      setOpenPopup(true);
      getAvailableQty(item.code);
    };


  //FUNCTION TO GET AVAILABLE QTY
  useEffect(() => {
    getAvailableQty()
  }, []);
  
  const getAvailableQty = (code) => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/stock/availableamount/"+code, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const dataarray = [];
        for (const key in data) {
          const items = {
            id: key,
            ...data[key],
          };
          dataarray.push(items);
        }
        if(dataarray.stock_id == 0)
            {
              setItemsData(dataarray.msg);
            } else {
              setItemsData(dataarray);
              console.log("available", dataarray)
            }
       
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const onDeleteP = (item) => {
    
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    requests
        .deleteRequest(item.req_stk_id,item)
        .then((data) => {
         
        if(data.msg == "Can not delete")
        {
         
          setNotify({
            isOpen: true,
            message: "This Request Can not be deleted",
            type: "warning",
          });
        
        } else {
          setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error",
          });
        }
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
                      {auth && (
                      <TableCell>

                          
                          <Controls.ActionButton
                       color="primary"
                       onClick={() => {
                         openInPopup(item);
                       
                       }}
                     >
                      < ShoppingCartCheckoutOutlinedIcon/>
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
                      )}
                    </TableRow>
                  ))
                }
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>

      </Box>
      <Popup
         title="Release Item Form"
         openPopup={openPopup}
         setOpenPopup={setOpenPopup}  
       >
       <Paper
         className={classes.paper33}
       >
     <IssueRelease addOrEditI={addOrEditI}  recordForEdit={recordForEdit} roleItems={roleItems}/>

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

export default RequestList;




