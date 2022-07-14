import React, { useState, useEffect } from "react";
import * as donors from "../../donors/services/donors"
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Grid,} from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import RestoreConfirm from "../../components/RestoreConfirm";

  

 function BackupDonor() {
  
    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
 const [startdate, setStartdate] = useState(new Date());
 const [enddate, setEnddate] = useState(new Date());
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

//THIS WILL GET ALL DATA OF DELETED DONORS
useEffect(() => {
  getDonors();
}, []);
const getDonors = () => {
  donors
    .getDeletedDonors()
    .then((data) => {
      if(data.msg == "No data available")
      {
        setResponse(data)
      }
      else {
        const dataarray = [];
        // setUserData(arr);
        for (const key in data) {
          const donors = {
            id: key,
            ...data[key],
          };
          dataarray.push(donors);
        }
        // console.log(dataarray);
        if(dataarray.donor_id == 0)
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
    {field: "donor_id",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true },
    { field: "title",  headerName: "Title",width: 20,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "donor_name", headerName: "Name",width: 190,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "national_id", headerName: "NIC",width: 120,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "address_line1", headerName: "Address1" ,width: 90,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "address_line2", headerName: "Address2" ,width: 80,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "email", headerName: "Email" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "contact_no", headerName: "Contact No" ,width: 120,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "contact_no2", headerName: "Contact No" ,width: 120,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "reg_date", headerName: "Reg.Date" ,width: 100,editable: true,  headerClassName: 'super-app-theme--header',},
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
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
                      title: "Are you sure to restore this record?",
                      // subTitle: "You can't undo this operation",
                      onConfirm: () => {
                    restoreDonor(params.row);
                  },
                })
                  }} 
                            >
      <RestoreIcon fontSize="small" />
   
        </Controls.ActionButton>
        <Controls.ActionButton
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        deleteDonor(params.row);
                      },
                    });
                  }}
                            >
      <DeleteOutline fontSize="small" />
   
        </Controls.ActionButton>
  </>
        )
    },
    }
    
  ];


    //restore deleted donors
    const restoreDonor = (uid) => {
      setRestoreConfirm({
        ...restoreConfirm,
        isOpen: false,
      });
        donors.restoreDelete(uid.donor_id, uid)
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
            getDonors();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }


  //DELETE FOREVER
  const deleteDonor = (uid) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

      donors
      .deleteDonorForever(uid.donor_id, uid)
      .then((data) => {
        getDonors();
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
              title="Backup Donors"
              subTitle="Deleted list of donors"
              icon={<AssessmentTwoToneIcon fontSize="large" />}
          />
        <Box
        sx={{
          height: 400,
          width: '83%',
          '& .super-app-theme--header': {
            backgroundColor: '#E3F2FD',
          },
        }}
        margin="50px auto"
      >

  
        <DataGrid
          getRowId={row => row.donor_id}
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
export default BackupDonor;