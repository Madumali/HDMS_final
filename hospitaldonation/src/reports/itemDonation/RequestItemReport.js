import React, { useState, useEffect } from "react";
import * as requestDon from "../../required/services/requestDon";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import {  Grid} from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import Button from "../../components/controls/Button";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";

//field names of table
const columns = [
    {field: "req_stk_id",  headerName: "ID"
    , headerClassName: 'super-app-theme--header',hide: true },
    {  field: "itemCode", headerName: "Category",width:200,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name",width: 350,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "required", headerName: "Requested Total",width: 200,editable: true,  headerClassName: 'super-app-theme--header', },
  
   
  ];


 function RequestItemReport() {
  
    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
 const [startdate, setStartdate] = useState(new Date());
 const [enddate, setEnddate] = useState(new Date());

    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });

    useEffect(() => {
      getDonors();
    }, []);
    const getDonors = () => {
      let startdatex = new Date(startdate);
      let enddatex  = new Date(enddate);
      let start = startdatex.getFullYear()+'-' + (startdatex.getMonth()+1) + '-'+startdatex.getDate();
      let end = enddatex.getFullYear()+'-' + (enddatex.getMonth()+1) + '-'+enddatex.getDate();
     
      requestDon
        .getRequestItemTotal(start,end)
        .then((data) => {
          if(data.msg == "No data available")
          {
            setResponse(data)
          }
          else {
            const dataarray = [];
            for (const key in data) {
              const request = {
                id: key,
                ...data[key],
              };
              dataarray.push(request);
            }
            console.log(dataarray);
            if(dataarray.req_stk_id == 0)
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



const rows = records.map((data)=> (
 { 
req_stk_id:data.req_stk_id,
itemCode:data.itemCode,
itemname:data.itemname,
required:data.required,

    
}
))

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
       
        <Box
        sx={{
          height: 400,
          width: '53%',
          '& .super-app-theme--header': {
            backgroundColor: '#E3F2FD',
          },
        }}
        margin="100px auto"
      >
  
  <Grid container spacing={1} style={{marginBottom:20}} alignItems="center" justifyContent="center">
      <Grid item xs = {3}>
                    <Controls.DatePicker
                          name="start"
                          label="From Date"
                          value={startdate}
                          onChange={(e)=> setStartdate(e.target.value)}
                         
                      />
  
      </Grid>
      <Grid item xs = {3}>
      <Controls.DatePicker
                          name="end"
                          label="To Date"
                          value={enddate}
                          onChange={(e)=> setEnddate(e.target.value)}
                         
                      />
           
  
      </Grid>
      <Grid>
        <Button text="Filter" onClick={getDonors} />
      </Grid>                 
  </Grid>
  
        <DataGrid
          getRowId={row => row.req_stk_id}
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
   
        
        /></Box>
        </>
    );
}
export default RequestItemReport;