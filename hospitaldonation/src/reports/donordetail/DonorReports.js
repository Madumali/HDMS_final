import React, { useState, useEffect } from "react";
import * as donors from "../../donors/services/donors"
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { FormControlLabel, Grid, IconButton, MenuItem } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import Button from "../../components/controls/Button";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";


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
    
  ];


 function DonorReports() {
    const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);
 const [startdate, setStartdate] = useState(new Date());
 const [enddate, setEnddate] = useState(new Date());

 //this function will get data between dates
    useEffect(() => {
      getDonors();
    }, []);
    const getDonors = () => {
      let startdatex = new Date(startdate);
      let enddatex  = new Date(enddate);
      let start = startdatex.getFullYear()+'-' + (startdatex.getMonth()+1) + '-'+startdatex.getDate();
      let end = enddatex.getFullYear()+'-' + (enddatex.getMonth()+1) + '-'+enddatex.getDate();
   
      donors
        .getBetweenDates(start,end)
        .then((data) => {
          if(data.msg == "No data available")
          {
            setResponse(data)
          }
          else {
            const dataarray = [];
            
            for (const key in data) {
              const donors = {
                id: key,
                ...data[key],
              };
              dataarray.push(donors);
            }

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



// const rows = records.map((data)=> (
//  { 
//     // id:i,
//     donor_id:data.donor_id,
//     title:data.title,
//     donor_name: data.donor_name,
//     national_id: data.national_id,
//     address_line1: data.address_line1,
//     address_line2:data.address_line2,
//     email:data.email,
//     contact_no:data.contact_no,
//     contact_no2:data.contact_no2,
//     reg_date:data.reg_date,


// }
// ))

//customized tool bar
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
            title="Donor Report"
            subTitle="Donors details"
            icon={<AssessmentTwoToneIcon fontSize="large" />}
        />
         <Box
      sx={{
        height: 400,
        width: '77%',
        '& .super-app-theme--header': {
          backgroundColor: '#E3F2FD',
        },
      }}
      margin="50px auto"
    >

<Grid container spacing={1} style={{marginBottom:20}}  alignItems="center" justifyContent="center" >
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
    <Grid style={{marginTop:5}}>
      <Button text="Filter" onClick={getDonors} />
    </Grid>                 
</Grid>

      <DataGrid
        getRowId={row => row.donor_id}
        rows={records}
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
 
      
      /></Box>
</>
  );
}

export default DonorReports;