

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
  Typography,
  Divider,
  TextField,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import CloseIcon from '@mui/icons-material/Close';
import * as donations from "../services/donations";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import Controls from "../../components/controls/Controls";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Popup from "../../components/Popup";
import SearchIcon from '@mui/icons-material/Search';
import BasicTable from "../../components/materialTable/BasicTable"
import { CssBaseline } from '@mui/material/CssBaseline';
import { useStyles } from "../../components/BodyStyles";
import { PageHeader } from "../../components/controls/Common";

const headCells = [
  { label: "Donation No", id: "donationNum"},
  { label: "Donor Name", id: "donor_name"},
  { label: "Type Code", id: "type_code" },
  { label: "Item", id: "itemname" },
  { label: "Item Qty", id: "item_qty" },
  { label: "Description", id: "item_description" },
  { label: "Date", id: "receive_date"  },

  { id: "actions", label: "Actions", disableSorting: true },
];

export const DonationList = (props) => {
 

  const classes = useStyles();
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
              x.donor_name.toLowerCase().includes(target.value) || 
              x.type_code.toLowerCase().includes(target.value) ||
              x.itemname.toLowerCase().includes(target.value)
           
 
          );
      },
    });
  };

  
  useEffect(() => {
    getAllDonations();
  }, []);
  const getAllDonations = () => {
    donations
      .getDonationsAll()

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
    if(id == "admin")
    {
      setAuth(true);
    } else {
      setAuth(false);
    }
   
    }, []);

  const onDeleteP = (donation) => {
  setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    donations
      .deleteDonation(donation.item_id, donation)
      .then((data) => {
        getAllDonations();
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
   <>
  <Box className={classes.section} style={{marginTop:3}} >
    <PageHeader  title="Donation List"
                subTitle="List of all donations"
                icon={<VolunteerActivismIcon fontSize="large" />}/>
  <Paper className={classes.mainpaper} style={{width: "auto",borderRadius:5}}>
             
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
                      <TableCell>{item.donationNum}</TableCell>
                      <TableCell>{item.donor_name}</TableCell>
                      <TableCell>{item.type_code}</TableCell>
                      <TableCell>{item.itemname}</TableCell>
                      <TableCell>{item.item_qty}</TableCell>
                      <TableCell>{item.item_description}</TableCell>
                      <TableCell>{item.receive_date}</TableCell>
                      {auth && (
                      <TableCell>
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
                      )}
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

          
     </>
   
  );
};

export default DonationList;




