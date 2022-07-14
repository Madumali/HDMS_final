import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { PageHeader } from "../../components/controls/Common";
import { useStyles } from "../../components/BodyStyles";
import header from "../../components/images/header1.jpg";
import hdmsLogo5 from "../../components/images/hdms logo5.png";


 export const CurrentDonation = React.forwardRef((props, ref) => {

  let currentDateTime = Date().toLocaleString();
  const classes = useStyles();
  const [response, setResponse] = useState([]);
  const [donationData, setDonationData] = useState([]);
const currentdate = new Date();
const date = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;
  useEffect(() => {
    getCurrentDonation();
  }, []);
  let id = localStorage.getItem("donor");
  const getCurrentDonation = () => {

    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/donations/now/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
     
        if (data.msg == "No data available") {
    
        } else {
          const dataarray = [];
          for (const key in data) {
            const don = {
              id: key,
              ...data[key],
            };
            dataarray.push(don);
          }
      
       const nm = [...new Set(dataarray)];
          setDonationData(dataarray);
        
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };





  useEffect(() => {
    getCurrentDonor();
  }, []);
 
  const getCurrentDonor = () => {
  
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/donations/don/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
    
        return response.json();
      })
      .then((data) => {
    
        if (data.msg == "No data available") {
          setResponse(data);
        
        } else {
          const dataarray = [];
          for (const key in data) {
            const don = {
              id: key,
              ...data[key],
            };
            dataarray.push(don);
          }
      
          setResponse(dataarray);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };




  return (
  
    <Box className={classes.printback}>
      
      <div ref={ref}>
      <Paper className={classes.paperStylepdf}>
      
        <Grid container spacing={0.5}>
         
          <img src={header} style = {{maxHeight:400, maxWidth: 790, margin: "auto  1px auto 4px"}}/>
        </Grid>
        <Box sx={{ pl: 5, py: 1, pr: 2 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
        <Typography  style={{ fontWeight: 600, textAlign: "left" }}>
        {response.map((donor) => (
            <div key={donor.id}>
              <Typography style={{fontSize: 14,fontWeight: 600}}>
              {donor.title}.{donor.donor_name} <br/>
                {donor.address_line1} <br/>
                {donor.address_line2} <br/>
              </Typography>
            </div>
          ))}
          {date}
          </Typography></Grid>
          <Grid item xs={6}>
          <Typography  style={{ fontWeight: 600, textAlign: "right" }}>
        
          </Typography>
          </Grid>
          </Grid>

          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:10 }}> Acknowledgement Of a Donation </Typography>
          <Typography style={{ fontWeight: 600,textAlign: "center",marginTop:-20 }}>_______________________________</Typography>
          <Typography style={{
                fontSize: 14, marginTop: 10,fontWeight: 600
              }}>It is with immense gratitude we thank you for the thoughtful and Generous Gesture for the Donation of Following
items to Apeksha Hospital.</Typography>
         
          <Typography  style={{ fontSize: 14,fontWeight: 600, marginTop: 30,textAlign: "center" }}>
            <Grid container spacing={1}>
            
              <Grid item xs={4} style={{ backgroundColor: "lightBlue", border:"1px solid lightBlue" }}>
           
                Item Name{" "}
              </Grid>{" "}
             
              <Grid item xs={4} backgroundColor={"lightBlue"} style={{ border:"1px solid lightBlue"  }}>
               
                Qty
              </Grid>
             
            </Grid>
          </Typography>
          {donationData.msg}
          {donationData.map((donor) => (
            <div key={donor.id}>
              <Typography style={{ textAlign: "center",fontSize: 14,fontWeight: 600 }}>
                <Grid container spacing={0.5}>
                  <Grid item xs={4}>
                    {donor.itemname}{" "}
                  </Grid>{" "}
                  <Grid item xs={4}>
                    {" "}
                    {donor.item_qty}{" "}
                    {donor.item_description}
                  </Grid>
                  <Grid> </Grid>
                 
                </Grid>
                
              </Typography>
            </div>
          ))}
          <Typography style={{fontSize: 14, marginTop: 40, fontWeight: 600}}>
          Your valuable Donation will be of great help in improving the patient care services at the Apeksha Hospital
Maharagama.where a large number of cancer patients from all over the island are treated. <br/><br/>

We look forward to your continue support in our endeavours to provide efficient and effective patient care
services at this Hospital.<br/><br/>


Thank you.<br/>
Sincerely,
</Typography>
<Typography style={{fontSize: 14, marginTop: 10, fontWeight: 600, textAlign:"left"}}>
________________<br/>
 Director Signature <br/>
Apeksha Hospital-Maharagama.
</Typography>

<Grid container>
  <Grid item xs={12} sm={4} md={4} marginTop={20} fontFamily="helvetica" fontSize={10}>  {currentDateTime} </Grid>
  <Grid item xs={12} sm={4} md={4}><img src={hdmsLogo5} alt="this is car image" style = {{height:70, width: 200, margin: "30px auto", paddingBottom:0}}/></Grid>
  <Grid item xs={12} sm={4} md={4}></Grid>

</Grid>



        </Box>
      </Paper>
      </div>
    </Box>
    
  );
 
});
export default CurrentDonation;
