

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import useTable from "../../../../../components/useTable";
import { Search } from "@material-ui/icons";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CloseIcon from "@material-ui/icons/Close";
import * as bookingServices from "../../../../bookservice/bookingServices";
import Controls from "../../../../../components/controls/Controls";
import { useStyles } from "../../../../../components/BodyStyles";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import Notification from "../../../../../components/Notification";
import { useHistory } from "react-router-dom"; //import useHistory hook


const headCells = [

  { id: "booking_id", label:"No"},
  { id: "itemname", label:"Booked Item" },
  { id: "reserved_date", label:"Reserved Date" },
  { id: "item_qty", label:"Description" },
  { id: "approval", label:"Approval" },
  { id: "actions", label:"Actions", disableSorting: true },
];




const BookingTable = (props) => {
  const history = useHistory(); // useHistory hook redirects the pages

  const classes = useStyles();

 
  const [record, setRecords] = useState([]);
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
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordAfterPagingAndSorting,
  } = useTable(record, headCells, filterFn);
  
  
  useEffect(() => {
    getAllBookings();
  }, []);
  const getAllBookings = () => {
      let id = localStorage.getItem("donorname");
    bookingServices
      .getBookingData(id)

      .then((data) => {
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
        console.log("see",dataarray);

        setRecords(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.itemname.toLowerCase().includes(target.value) ||
              x.code.toLowerCase().includes(target.value)
          );
      },
    });
  };

//THIS WILL DELETE BOOKING IF IT IS NOT APPROVED
  const onDeleteP = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    bookingServices
        .deleteBooking(item.booking_id,item)
        .then((data) => {
          if(data.msg == "Can not delete")
          {
           
            setNotify({
              isOpen: true,
              message: "Approved Booking Can not Cancel.Please contact Donation department",
              type: "warning",
            });
          
          } else {
            setNotify({
              isOpen: true,
              message: "Deleted Successfully",
              type: "error",
            });
          }
          getAllBookings()
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }



  const getPermissinPrint = (item) => {
 
    if(item.approve == "approve")
    {

      localStorage.setItem("print",item.booking_id)
      history.push("/bookings/mainpage/mybookings/print");

      
    } else {
      setNotify({
        isOpen: true,
        message: "Reservation is not approved!",
        type: "error",
      });
    }
   
  
  }





  return (
    <div>
  <Box className={classes.section} style={{marginTop:90}} >
      {/* <PageHeader label="Add Category"/> */}
    <Paper className={classes.mainpaper} style={{borderRadius:20, width:"800px", margin:"0 auto"}}>
             
           <Toolbar>
             <Controls.Input
                label="Search "
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
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
                  recordAfterPagingAndSorting().map((item,index) => (
                    <TableRow key={index}>
                      <TableCell>{item.booking_id}</TableCell>
                      <TableCell>{item.itemname}</TableCell>
                      <TableCell>{item.reserved_date}</TableCell>
                      <TableCell>{item.item_qty}</TableCell>
                      <TableCell>{item.approve}</TableCell>
      
                      <TableCell>
                      <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            getPermissinPrint(item);
                          }}
                        >
                          <LocalPrintshopOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>

                        <Controls.ActionButton
                          color="error"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDeleteP(item);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                          {item.donor_id}
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
       <Notification notify={notify} setNotify={setNotify} />
       <ConfirmDialog
            confirmDialog={confirmDialog}
           setConfirmDialog={setConfirmDialog}
         />
    </div>
  );
};

export default BookingTable;




