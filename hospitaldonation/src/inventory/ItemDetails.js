import React, { useState, useEffect } from "react";
import * as inventory from "../inventory/services/inventoryservice";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { blue } from "@material-ui/core/colors";
import { FormControlLabel, Grid, IconButton, MenuItem } from "@material-ui/core";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Controls from "../components/controls/Controls";


const columns = [
    {field: "stock_id",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true },
    { field: "type_cd",  headerName: "Category",width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
    { field: "itemname",  headerName: "Item Name",width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "enteredBy", headerName: "Entered By" ,width: 140,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "donor_name", headerName: "Donor Name" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "item_qty_in", headerName: "Receives",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "donationDate", headerName: "Donated Date",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "to_whom", headerName: "Issued To" ,width: 140,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "item_qty_out", headerName: "Issues",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "issue_date", headerName: "Issued Date",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    
   
  ];



export default function ItemDetails() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [selectval,setSelectVal] = useState([]);
    const [response, setResponse] = useState([]);

    const fetchdata = (id) =>{
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
      fetch("http://localhost:4000/items",
        { 
          method: "GET",
          headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
       
          const res = response.json();
          return res
         
        })
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

    
            setRecords(dataarray);
          }
          }).catch(e => {
                console.log("error", e)
            })
     }
    
     useEffect(()=>{
        fetchdata()
        },[])
      


// const rows = records.map((data)=> (
//  { 
  
//     stock_id: data.stock_id,
//    itemname: data.itemname,
//   receives: data.receives,
//   issues: data.issues,
//   qty: data.qty,

// }
// ))

useEffect(() => {
  onChangeItem();
}, []);
//when donor is selected his/her relevant data is retrieved
const onChangeItem = (id) => {
  
inventory.filterByItemname(id)
    .then((data) => {
        console.log("selectggg",data)
      //if data is retrieved those data set to the array
      if (data.msg == "No data available") {
        
        setResponse(data);
      } else {
        const dataarray = [];
        for (const key in data) {
          const donor = {
            id: key,
            ...data[key],
          };
          dataarray.push(donor);
        }
        if(dataarray.stock_id == 0)
        {
        //   setRecords(dataarray.msg)
        }
        else {
        setRecords2(dataarray);
        // setAllDonors(dataarray);
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
};




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
    // <div style={{ height: 400, width: '100%' }}>
<>
  


         <Box
      sx={{
        height: 400,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#E3F2FD',
        },
      }}
      margin="90px auto"
    >
<div style={{marginBottom:10, marginTop:15}}>

            <Controls.Input
              select
              name="item"
              label="Filter By Item"
              value={selectval}
             onChange={(e)=>{onChangeItem(e.target.value);setSelectVal(e.target.value)}} 
            style={{width:150, marginRight:30}}
                >
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  records.map((item , i)=> (
                   <MenuItem key = {i}   value={item.code} >{item.itemname}</MenuItem>))
                    
                }
            </Controls.Input>

</div>


      <DataGrid
      getRowId={(r) => r.stock_id}
        rows={records2}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
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
      />
      </Box>
    </>
  );
}

  