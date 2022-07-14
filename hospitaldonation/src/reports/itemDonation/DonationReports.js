import React, { useState, useEffect } from "react";
import * as donations from "../../donation/services/donations"
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Grid,  } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Controls from "../../components/controls/Controls";
import Button from "../../components/controls/Button";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PageHeader } from "../../components/controls/Common";

const columns = [
    {field: "item_id",  headerName: "ID",width: 50
    , headerClassName: 'super-app-theme--header',hide: true },
    {  field: "user", headerName: "Entered By",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "donor_name", headerName: "Donor",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "type_code", headerName: "Category",width: 100,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name",width: 150,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "item_qty", headerName: "Item Qty",width: 80,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "item_description", headerName: "Description" ,width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "donationDate", headerName: "Receive Date" ,width: 120,editable: true,  headerClassName: 'super-app-theme--header',},
   
  ];


 function DonationReports() {
    
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
     
      donations
        .donationsByDates(start,end)
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
            if(dataarray.item_id == 0)
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
                title="Donations Report"
                subTitle="Received donations details"
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
      <Grid item xs = {1} style={{marginTop:5,marginLeft:0}}>
        <Button text="Filter" onClick={getDonors} />
      </Grid>                 
  </Grid>
  
        <DataGrid
          getRowId={row => row.item_id}
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
        </>
    );
}
export default DonationReports;