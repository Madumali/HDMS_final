import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import StockPieChart from './StockPieChart';
import { blue, lightGreen, purple } from "@mui/material/colors";
import { useStyles } from "../components/BodyStyles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

  import { Bar } from 'react-chartjs-2';
  // import 'chartjs-adapter-date-fns';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  
 const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Donation Receives & Issues',
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  const timeFrame = (e) => {
const y = e
console.log(y);

  }
  


const DonationGraph = () => {
    const classes = useStyles();
    const [data, setChartData] = useState({

    labels: [],
    datasets: [
      {
        label: 'Received',
        data: [],
        stack: 'Stack 0',
        // backgroundColor: 'rgba(21,101,192,0.6)',
      },
      {
        label: 'Issued',
        data: [],
        stack: 'Stack 1',
        // backgroundColor: 'rgba(198,40,40,0.6)',
      },
    ],

    })


    const fetchdata = () =>{
       const dataarray1 = [];
        const dataarray2 = [];
        const code = [];
        const month = [];
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        //This function will get total donations,issues per month
 fetch("http://localhost:4000/stock/totaldonperMonth",
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
         
        }).then((res) => {
            console.log("result", res)
           for (const key in res) {
            const stock = {
                                  id:key,
                              ...res[key]
                           }
            dataarray1.push(stock.qty);
            dataarray2.push(stock.qtyout);
            code.push(stock.codeid);
            month.push(stock.date);
      
           }
           setChartData({
               labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
               datasets: [
                 {
                   label: "Received",
                   data:dataarray1,
                   borderColor:blue["A200"],
                    fill:true,
                    tension:0.5,
                   backgroundColor: [
                    
                    'rgba(255, 99, 132, 0.5)',
             
                  ],
                  borderWidth: 1,
                 },
                 
                 {
                   label: "Issued",
                   data:dataarray2,
                   backgroundColor: 'rgba(53, 162, 235, 0.5)',
                   borderColor:purple["A200"],
                       fill:true,
                       tension:0.5,
                       borderWidth: 1,
                    
                 },
             
                
               ],
             })
          
        }).catch(e => {
               console.log("error", e)
           })
    }
useEffect(()=>{
fetchdata()
},[])
    return(
         <Box className={classes.section}>
            <Grid container spacing={1}>
            <Grid item xs ={12} sm={7}>
            <Card>
             <CardContent>
                    <Typography variant="h5" component="h6">
                     Donations
                    </Typography>
                </CardContent>
                <CardContent>
                 
                <Bar options={options} data={data} />
               
         </CardContent> 
             </Card> 

         </Grid>

         <Grid item xs ={12} sm={5} >
         <Card >
             <CardContent>
                    <Typography variant="h5" component="h6">
                     Donations Inventory
                 </Typography>
             </CardContent>
             <CardContent >
         <StockPieChart />
            </CardContent>
         </Card>
         </Grid>
     </Grid>
 </Box>
    );
}
export default DonationGraph;