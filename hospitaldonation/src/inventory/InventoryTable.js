import React, { useState, useEffect } from "react";
import * as inventory from "../inventory/services/inventoryservice";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { blue } from "@material-ui/core/colors";
import { FormControlLabel, IconButton, MenuItem } from "@material-ui/core";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Controls from "../components/controls/Controls";


const columns = [
    {field: "stock_id",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true },
    { field: "codeid",  headerName: "Category",width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "receives", headerName: "Total Receives",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "issues", headerName: "Total Issues",width: 250,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "qty", headerName: "IN STOCK" ,width: 220,editable: true,  headerClassName: 'super-app-theme--header',},
   
  ];



export default function InventoryTable() {

    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
const [selectval, setSelectVal] = useState([]);
    const fetchdata = () =>{
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
      fetch("http://localhost:4000/stock/totaldonperCat",
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
        console.log("permontheee",data)
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
            if(dataarray.stock_id == 0)
            {
              setRecords(dataarray.msg)
            }
            else {
            setRecords(dataarray);
            }
          }
          }).catch(e => {
                console.log("error", e)
            })
     }
    
     useEffect(()=>{
        fetchdata()
        },[])
      

const monthly = [
{id: '1' , label: 'January'},
{id: '2' , label: 'February'},
{id: '3' , label: 'March'},
{id: '4' , label: 'April'},
{id: '5' , label: 'May'},
{id: '6' , label: 'June'},
{id: '7' , label: 'July'},
{id: '8' , label: 'August'},
{id: '9' , label: 'September'},
{id: '10' , label: 'October'},
{id: '11' , label: 'November'},
{id: '12' , label: 'December'},
]


const rows = records.map((data)=> (
 { 
  
    stock_id: data.stock_id,
   codeid: data.codeid,
  receives: data.receives,
  issues: data.issues,
  qty: data.qty,

}
))

useEffect(() => {
  onChangeMonth();
}, []);
//when donor is selected his/her relevant data is retrieved
const onChangeMonth = (id) => {
  
inventory.filterByMonthlyCat(id)
    .then((data) => {
        
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
          setRecords(dataarray.msg)
        }
        else {
        setRecords(dataarray);
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
        width: '57%',
        '& .super-app-theme--header': {
          backgroundColor: '#E3F2FD',
        },
      }}
      margin="50px auto"
    >
<div style={{marginBottom:10, marginTop:15}}>
 
         <Controls.Input
              select
              name="month"
              label="Filter By Month"
              value={selectval}
             onChange={(e)=>{onChangeMonth(e.target.value); setSelectVal(e.target.value)} } 
            style={{width:150}}
                >
                
              <MenuItem defaultValue = "">None</MenuItem>
                {
                  monthly.map((item , i)=> (
                   <MenuItem key = {i}   value={item.id} >{item.label}</MenuItem>))
                    
                }
            </Controls.Input> 
</div>


      <DataGrid
      getRowId={(r) => r.stock_id}
        rows={rows}
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
      />
      </Box>
    </>
  );
}

  