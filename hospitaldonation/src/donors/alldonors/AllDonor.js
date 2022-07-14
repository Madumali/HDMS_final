import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
// import AddDonorsForm from "./AddDonorsForm";
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
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import useTable from "../../components/useTable";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import * as donors from "../services/donors";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import AddTeams from "../adddorors/AddTeams";
import { PageHeader } from "../../components/controls/Common";
import { useStyles } from "../../components/BodyStyles";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import EditDonor from "./EditDonor";

const headCells = [
  // { id: 'type_id', label: 'ID' },
  { id: "national_id", label: "NIC" },
  { id: "donor_name", label: "Name" },
  { id: "address_line1", label: "Address1" },
  { id: "address_line2", label: "Address2" },
  { id: "email", label: "Email" },
  // { id: "contact_no", label: "Telephone" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const AllDonor = (props) => {
  const classes = useStyles();
  const [check, setCheck] = useState(false);
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
    donorDataAfterPagingAndSorting,
  } = useTable(donorData, headCells, filterFn);
///////////////////////////SEARCH FUNCTION IN TABLE
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.donor_name.toLowerCase().includes(target.value) ||
              x.national_id.toLowerCase().includes(target.value)
          );
      },
    });
  };
/////////////////////THIS WILL GET ALL THE DONORS
  useEffect(() => {
    getAllPerson();
  }, []);
  const getAllPerson = () => {
    donors
      .getDonorPersons()

      .then((data) => {
      
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const category = {
            id: key,
            ...data[key],
          };
          dataarray.push(category);
        }
    
        setDonorData(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };


  ////////////////THIS WILL UPDATE DONOR DATA///////////////////
  const addOrEdit = (donor, resetForm) => {
    if (donor.donor_id == null) {
      donors
        .insertDonor("http://localhost:4000/donors/", donor)
        .then((data) => {
          setResponse(data);
          if (data.status == 200) {
          //  notify (response.msg)
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
          getAllPerson();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else
      donors
        .updateDonorPerson(donor.donor_id, donor)
        .then((data) => {
          console.log("bookdata",data)
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

          getAllPerson();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    setRecordForEdit(null);
    setOpenPopup(false);
    resetForm();
  };

  ///////SELECTED DATA OPEN IN POPUP//////////////
  const openInPopup = (item) => {
  
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  ////////////////DONOR WILL DELETE ///////////////////////
  const onDeleteP = (donor) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    donors
      .deleteDonor(donor.donor_id, donor)
      .then((data) => {
        getAllPerson();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
  
    <Box className={classes.section} style={{marginTop:3}} >
    <PageHeader
                    title="All Donors"
                    subTitle="List of all donors"
                    icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
                />
                
     <Paper className={classes.mainpaper} style={{borderRadius:5, width: "1000px", margin:"0 auto"}}>
          <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
            Donors List
            </Typography>
           <Divider /> 
      {check ? (
       
        <AddTeams />   
       
      ) : (
        <>
        
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
                  donorDataAfterPagingAndSorting().map((item,i) => (
                    <TableRow key={i}>
                      <TableCell>{item.national_id}</TableCell>
                      <TableCell>{item.donor_name}</TableCell>
                      <TableCell>{item.address_line1}</TableCell>
                      <TableCell>{item.address_line2}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
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
                              // subTitle: "You can't undo this operation",
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
         
          <Popup
            title="Add Donor Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          > 
            <Paper
         className={classes.paper33}
       >
     <EditDonor addOrEdit={addOrEdit}  recordForEdit={recordForEdit}/>

         </Paper> 
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          
        </>
      )}
      </Paper>
    </Box>
  );
};

export default AllDonor;
