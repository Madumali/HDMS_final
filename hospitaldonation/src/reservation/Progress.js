import React, { useState, useEffect } from "react";
import * as bookings from "./services/bookingSer"
import { DataGrid, GridToolbarContainer,  GridToolbarExport,  GridToolbarFilterButton } from '@mui/x-data-grid';
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../components/controls/Controls";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../components/controls/Common";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";
import RestoreConfirm from "../components/RestoreConfirm";
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useHistory } from "react-router-dom"; //import useHistory hook


function Progress() {
  const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
    const history = useHistory(); // useHistory hook redirects the pages
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
    const [restoreConfirm, setRestoreConfirm] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });
const addedby = localStorage.getItem("name")
//THIS WILL GET ALL DATA OF BOOKED DONATIONS
useEffect(() => {
  getBookingApproved();
}, []);
const getBookingApproved = () => {
 bookings
    .getAllapprovedBookings()
    .then((data) => {
        console.log("booking", data)
      if(data.msg == "No data available")
      {
        setResponse(data)
      }
      else {
        const dataarray = [];
     
        for (const key in data) {
          const booking = {
            id: key,
            ...data[key],
            addedby
          };
          dataarray.push(booking);
        }
       
        if(dataarray.booking_id == 0)
        {
          setRecords(dataarray.msg)
        }
        else {
          setRecords(dataarray);
          console.log(dataarray);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
 
};




    //field names of table
const columns = [
    {field: "booking_id",  headerName: "ID",width: 90
    , headerClassName: 'super-app-theme--header'},
    {field: "addedby",  headerName: "ID",width: 90,hide:true
    , headerClassName: 'super-app-theme--header'},
    {  field: "donor_name", headerName: "Name",width: 200,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name" ,width:150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "reserved_date", headerName: "Reserved Date" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "morning", headerName: "Morning" ,width: 80,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "evening", headerName: "Evening" ,width: 80,editable: true,  headerClassName: 'super-app-theme--header',},
    
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 120,
        disableClickEventBubbling: true,
        headerClassName: 'super-app-theme--header',
        renderCell:(params) => {
        return (
        <>
            <Controls.ActionButton
                  color="success"
                  onClick={() => {
                    setRestoreConfirm({
                      isOpen: true,
                      title: "Are you sure to confirm reservation?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                    confirmDonation(params.row);
                  },
                })
                  }} 
                            >
      <CheckCircleOutlineOutlinedIcon fontSize="small" />
   
        </Controls.ActionButton>
        <Controls.ActionButton
                  color="warning"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to reject the reservation?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        unReceivedDonation(params.row);
                      },
                    });
                  }}
                            >
      <SmsFailedOutlinedIcon fontSize="small" />
   
        </Controls.ActionButton>
  </>
        )
    },
    }
    
  ];


    //approve bookings
    const confirmDonation = (uid) => {
    localStorage.setItem("bookDon",uid.donor_id);
        console.log("id",uid)
      setRestoreConfirm({
        ...restoreConfirm,
        isOpen: false,
      });
       bookings.updateConfirm(uid.booking_id, uid)
      
        .then((data) => {
       console.log("approval",data)
          if(data.msg == "can not confirm")
          {
            setNotify({
              isOpen: true,
              message: "Can not Confirm.Due date is ahead",
              type: "error",
            });
             
          
            } else {
              setNotify({
                isOpen: true,
                message: "Successfully Marked as Completed",
                type: "success",
              });
              history.push("/printletter");
            }
            getBookingApproved();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }


  //when booking is not completed by the donor
  const unReceivedDonation = (uid) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

      bookings
      .updateUncompletedDonation(uid.booking_id, uid)
      .then((data) => {
        if(data.msg == "can not confirm")
          {
            setNotify({
              isOpen: true,
              message: "Can not Confirm.Due date is ahead",
              type: "error",
            });
             
          
            } else {
              setNotify({
                isOpen: true,
                message: "Successfully Marked as Uncompleted",
                type: "success",
              });
            }
        getBookingApproved();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

 
  }

function MyExportButton() {
  return (
    <GridToolbarContainer>
       <GridToolbarFilterButton/>
       <GridToolbarExport
       printOptions={{
        hideFooter: true,
        hideToolbar: true,
      }}
      />
    </GridToolbarContainer>
  );
}



    return (
      <>
      <PageHeader
              title="Approved Reservations"
              subTitle="List of approved reservations to check progress"
              icon={<AssessmentTwoToneIcon fontSize="large" />}
          />
        <Box
        sx={{
          height: 400,
          width: '65%',
          '& .super-app-theme--header': {
            backgroundColor: '#E3F2FD',
          },
        }}
        margin="50px auto"
      >

  
        <DataGrid
          getRowId={row => row.booking_id}
          rows={records}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No rows in DataGrid
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Local filter returns no result
              </Stack>
            ),
            Toolbar: MyExportButton,
            
          }}
   
        
        /></Box>
         <Notification notify={notify} setNotify={setNotify} />
<ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <RestoreConfirm
            restoreConfirm={restoreConfirm}
            setRestoreConfirm={setRestoreConfirm}
          />
        </>
    );
}

export default Progress;
