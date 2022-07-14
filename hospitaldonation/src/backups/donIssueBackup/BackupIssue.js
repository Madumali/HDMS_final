import React, { useState, useEffect } from "react";
import * as issuance from "../../issuance/service/issuanceadd"
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Grid,} from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import RestoreIcon from '@mui/icons-material/Restore';
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import RestoreConfirm from "../../components/RestoreConfirm";

  

 function BackupIssue() {
  
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

//will check the user role and according to user role some tasks are validated
    const id = localStorage.getItem("userrole");
    const [auth, setAuth] = useState(true);
      useEffect(()=>{
        if(id == "admin")
        {
          setAuth(true);
        } else {
          setAuth(false);
        }
       
        }, []);


//THIS WILL GET ALL DATA OF DELETED Issues
useEffect(() => {
  getIssuance();
}, []);
const getIssuance = () => {
  issuance
    .getDeletedIssues()
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
    {field: "issueId",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true},
    {  field: "issued_by", headerName: "Issued By",width: 210,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "dep_name", headerName: "Issued For(department)",width: 220,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "to_whom", headerName: "Issued To" ,width:220,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "issue_item", headerName: "Item Name" ,width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "issue_itemqty", headerName: "Issued Qty" ,width: 100,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "issue_date", headerName: "Issued Date" ,width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
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
                      onConfirm: () => {
                    restoreIssue(params.row);
                  },
                })
                  }} 
                            >
      <RestoreIcon fontSize="small" />
   
        </Controls.ActionButton>
        {auth && (  //only admin is allowed to delete issues forever

        <Controls.ActionButton
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        deleteIssue(params.row);
                      },
                    });
                  }}
                            >
      <DeleteOutline fontSize="small" />
   
        </Controls.ActionButton>
         )}
  </>
        )
    },
    }
    
  ];


    //restore deleted donors
    const restoreIssue = (uid) => {
        console.log("id",uid)
      setRestoreConfirm({
        ...restoreConfirm,
        isOpen: false,
      });
        issuance.restoreDeleteIssues(uid.issueId, uid)
      
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
            getIssuance();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  }


  //DELETE FOREVER
  const deleteIssue = (uid) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

      issuance
      .deleteIssuesForever(uid.issueId, uid)
      .then((data) => {
        getIssuance();
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
              title="Back up Donations"
              subTitle="Deleted list of Donations"
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
          getRowId={row => row.issueId}
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
export default BackupIssue;