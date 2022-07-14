import React, { useState, useEffect } from "react";
import * as systemusers from "../services/systemusers";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { blue } from "@material-ui/core/colors";
import { FormControlLabel, IconButton, MenuItem } from "@material-ui/core";
import { Box } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Controls from "../../components/controls/Controls";


const columns = [
    {field: "uid",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true },
    { field: "user_full_name",  headerName: "User Name",width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "user_nic", headerName: "NIC",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "user_email", headerName: "Email",width: 250,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "dep_name", headerName: "Department" ,width: 220,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "desig_name", headerName: "Designation" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 140,
        disableClickEventBubbling: true,
        headerClassName: 'super-app-theme--header',
        renderCell:(params) => {
        return (
        <>
            <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    editUser(params.row.uid);
                  }} 
                            >
      <EditOutlinedIcon fontSize="small" />
        </Controls.ActionButton>
               <Controls.ActionButton
                                            color="error"
                                            onClick={() => {
                                              // setConfirmDialog({
                                              //   isOpen: true,
                                              //   title: "Are you sure to delete this record?",
                                              //   subTitle: "You can't undo this operation",
                                              //   onConfirm: () => {
                                              //     deleteUser(params.row.uid);
                                              //   },
                                              // });
                                            }}
                      
                
                                           >
               <DeleteOutline
                    // color="error"
                    // size="small"
                    // style={{ marginLeft: 16,cursor: "pointer" }}
                    // onClick={() => {
                    //   deleteUser(params.row.uid);
                    // }}
                   
               />
            </Controls.ActionButton>
            </>
        )
    },
    }
    //     renderCell: (params) => {
    //       return (
    //         <div
    //           className="d-flex justify-content-between align-items-center"
    //           style={{ cursor: "pointer" }}
    //         >
    //           <FileCopyIcon  onClick={editUser(params.row.uid)} />
    //         </div>
    //       );
    //     }
    //   }
    // { id: "actions", label: "Actions", disableSorting: true },
  ];




  const editUser = (uid) => {
    console.log("valllll", uid);
    alert(uid);
}
const deleteUser = (uid) => {
  console.log("del", uid);
  alert(uid);
}


export default function DataGridt() {

    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });

    useEffect(() => {
      getAlluser();
    }, []);
    const getAlluser = () => {
      systemusers
        .getAllUsers()
        .then((data) => {
          if(data.msg == "No data available")
          {
            setResponse(data);
            
          }
          else {
          const dataarray = [];
          // setUserData(arr);
          for (const key in data) {
            const users = {
              id: key,
              ...data[key],
            };
            dataarray.push(users);
          }
          // console.log(dataarray);
  
          setRecords(dataarray);
        }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
     
    };



const rows = records.map((data)=> (
 { 
  
   uid:data.uid,
   user_full_name: data.user_full_name,
   user_nic: data.user_nic,
  user_email: data.user_email,
  dep_name: data.dep_name,
  desig_name: data.desig_name,

}
))

  return (
    // <div style={{ height: 400, width: '100%' }}>
         <Box
      sx={{
        height: 400,
        width: '90%',
        '& .super-app-theme--header': {
          backgroundColor: '#E3F2FD',
        },
      }}
      margin="50px auto"
    >




      <DataGrid
      getRowId={(r) => r.uid}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      /></Box>
    // </div>
  );
}
