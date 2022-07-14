import React, { useState, useEffect } from "react";
import * as bookings from "../services/bookingSer"
import { DataGrid, GridToolbarContainer,  GridToolbarFilterButton } from '@mui/x-data-grid';
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import RestoreConfirm from "../../components/RestoreConfirm";
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
  

 function Approve() {
  
    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);

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

//THIS WILL GET ALL DATA OF BOOKED DONATIONS
useEffect(() => {
  getBookingForApprove();
}, []);
const getBookingForApprove = () => {
 bookings
    .getAllPendingBooking()
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
    {  field: "donor_name", headerName: "Name",width: 200,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name" ,width:150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "reserved_in", headerName: "Reserved In" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
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
                  color="primary"
                  onClick={() => {
                    setRestoreConfirm({
                      isOpen: true,
                      title: "Are you sure to approve reservation?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                    approveBooking(params.row);
                  },
                })
                  }} 
                            >
      <ThumbUpOutlinedIcon fontSize="small" />
   
        </Controls.ActionButton>
        <Controls.ActionButton
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to reject the reservation?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        deleteDonation(params.row);
                      },
                    });
                  }}
                            >
      <ThumbDownOutlinedIcon fontSize="small" />
   
        </Controls.ActionButton>
  </>
        )
    },
    }
    
  ];


    //approve bookings
    const approveBooking = (uid) => {
        console.log("id",uid)
      setRestoreConfirm({
        ...restoreConfirm,
        isOpen: false,
      });
       bookings.updateApprove(uid.booking_id, uid)
      
        .then((data) => {
       console.log("approval",data)
          if(data.msg == 'Can not approve')
          {
            setNotify({
              isOpen: true,
              message: "Can not Approve.You have approved max for the date",
              type: "error",
            });
          }
          
            // } else if(data.msg == 'Can not approve don')
            // {
            //   setNotify({
            //     isOpen: true,
            //     message: "Can not Approve.This donor already has reservation for the date",
            //     type: "error",
            //   });
               
            
            //   }else if(data.msg == "Can not approve item")
            //   {
            //     setNotify({
            //       isOpen: true,
            //       message: "Can not Approve the same Item for the day",
            //       type: "error",
            //     });
                 
              
            //     }
             else {
              setNotify({
                isOpen: true,
                message: "Successfully Updated",
                type: "success",
              });
            }
            getBookingForApprove();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }


  //reject bookings
  const deleteDonation = (uid) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

      bookings
      .updateApproveReject(uid.booking_id, uid)
      .then((data) => {
        getBookingForApprove();
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

function MyExportButton() {
  return (
    <GridToolbarContainer>
       <GridToolbarFilterButton/>
     
    </GridToolbarContainer>
  );
}



    return (
      <>
      <PageHeader
              title="Approve Reservations"
              subTitle="List of reservations to be approved"
              icon={<AssessmentTwoToneIcon fontSize="large" />}
          />
        <Box
        sx={{
          height: 400,
          width: '80%',
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
export default Approve;