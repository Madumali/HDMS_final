import React, { useState, useEffect } from "react";
import * as bookings from "../reservation/services/bookingSer"
import { DataGrid, GridToolbarContainer,  GridToolbarExport,  GridToolbarFilterButton } from '@mui/x-data-grid';
import { Box } from "@material-ui/core";
import Stack from '@mui/material/Stack';



function BookingProgress() {
  const [records, setRecords] = useState([]);
    const [response, setResponse] = useState([]);


//THIS WILL GET ALL DATA OF BOOKED DONATIONS
useEffect(() => {
  getBookingAll();
}, []);
const getBookingAll = () => {
 bookings
    .getAllBookings()
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
    {  field: "donor_name", headerName: "Name",width: 250,editable: true,  headerClassName: 'super-app-theme--header', },
    {  field: "itemname", headerName: "Item Name" ,width:150,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "reserved_date", headerName: "Reserved Date" ,width: 200,editable: true,  headerClassName: 'super-app-theme--header',},
    {  field: "approve", headerName: "Progress" ,width: 150,editable: true,  headerClassName: 'super-app-theme--header',},
   
  
    
  ];


  

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
          width: '90%',
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
         
          }}
   
        
        /></Box>
        
        </>
    );
}

export default BookingProgress;
