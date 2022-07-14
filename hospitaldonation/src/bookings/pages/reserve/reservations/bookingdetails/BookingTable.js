

import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
// import AddDonorsForm from "./AddDonorsForm";
import {
  Box,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import useTable from "../../../../../components/useTable";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import * as bookingServices from "../../../../bookservice/bookingServices";
// import ConfirmDialog from "../../components/ConfirmDialog";
// import Notification from "../../components/Notification";
import Controls from "../../../../../components/controls/Controls";
// // import AddDonorTeam from "./AddDonorTeam";
// import Popup from "../../components/Popup";
// import AddTeams from "./AddTeams";
import BasicTable from "../../../../../components/materialTable/BasicTable"
import { useStyles } from "../../../../../components/BodyStyles";
import { PageHeader } from "../../../../../components/controls/Common";




const headCells = [

  { id: "No", field: "booking_id"},
  { id: "Booked Item", field: "itemname" },
  { id: "Reserved Date", field: "reserved_date" },
  { id: "Description", field: "item_qty" },
  { id: "Approval", field: "approve" },
  { id: "actions", label: "Actions", disableSorting: true },
];




const BookingTable = (props) => {
 

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
        // setUserData(arr);
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

  return (
    <div>
  <Box className={classes.section} style={{marginTop:3}} >
    <PageHeader label="Donation"/>

          <Paper
            className={classes.pageContent}
            style={{ width: "auto", margin: "20px auto" }}
          >
             
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
                            // openInPopup(item);
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
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                // onDeleteP(item);
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

          {/* <Popup
            title="Add Donor Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          > */}
            {/* <Paper style={paperStyle}>
              <AddDonorsForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
              <Notification notify={notify} setNotify={setNotify} />
            </Paper>
          {/* </Popup> */}
          {/* <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          
        </>
      )}   */}
       </Box>
    </div>
  );
};

export default BookingTable;




