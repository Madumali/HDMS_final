import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { blue, blueGrey, lightGreen, orange, red } from "@mui/material/colors";
import React, { Fragment, useEffect, useState } from "react";
import { useStyles } from "../components/BodyStyles";
import Controls from "../components/controls/Controls";
import { Graph } from "../components/controls/Graph";
import { randomValue } from "../utils/GraphData";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { GraphData } from "../utils/GraphData";
import { indigo } from "@mui/material/colors";
import DonationGraph from "./DonationGraph";
import Popup from "../components/Popup";
import { Button } from "@mui/material";
import Dates from "./Schedule";
import BookingProgress from "./BookingProgress";





const Dashboard = ()=>{
    const classes = useStyles()
const [fetched,setFetched] = useState(false);
const [data,setdata] = useState();
const [auth, setauth] = useState(true);
const [openPopup, setOpenPopup] = useState(false);
const[displaydata, setDisplaydata] = useState([])

const id = localStorage.getItem("userrole");

//check for the user role
    // const [record, setItemData] = useState([])
    // useEffect(()=>{
    //     if(id == "admin")
    //     {
    //         getItems();
    //     }
       
    //     }, []);
    
    //     const handlesubmit = (e)=>{
    //         e.preventDefault();
    //         setauth(false);
    //     }       
       
    //get newly added donation count
          const getItems = () => {
           
            const token = localStorage.getItem('authToken');
            console.log(token, 'token');
            fetch("http://localhost:4000/donations/newdonations",
            {
              method: "GET",
              headers:  {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + token
              }
            })
            .then((response) => {
              console.log(response)
              return response.json();
             
            })
                .then(data => {
                   const dataarray = [];
                   // setUserData(arr);
                   for (const key in data){
                       const donor = {
                           id:key,
                           ...data[key]
                       };
                       dataarray.push(donor);
                       if(donor.newdonations == 0)
                       {
                      setauth(false);
                        }
                   }
                   console.log(dataarray);
                 
                    // setItemData(dataarray);
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  })
        }

useEffect(()=>{
    getCategorydetails();
}, []);



        const getCategorydetails = () => {
           
            const token = localStorage.getItem('authToken');
            console.log(token, 'token');
            fetch("http://localhost:4000/stock/categoryall",
            {
              method: "GET",
              headers:  {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + token
              }
            })
            .then((response) => {
              console.log(response)
              return response.json();
             
            })
                .then(data => {
                   const dataarray = [];
                   for (const key in data){
                       const donor = {
                           id:key,
                           ...data[key],
                         

                       };
                       dataarray.push(donor);
                      
                   }
                   console.log("this is dashbord",dataarray);
                 
                    setDisplaydata(dataarray);
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  })
        }



const displayData = [
    // {label:displaydata[0][0], value:randomValue({digit: 1000} ),icon:<ArrowDropUpIcon/>, iconLabel:"17%"},
    {label:"Surgical Consumable", value:randomValue({digit: 1000} ),icon:<ArrowDropUpIcon/>, iconLabel:"17%"},
    {label:"Consumable Items", value:randomValue({digit: 100}),icon:<ArrowDropUpIcon/>, iconLabel:"78%"},
    {label:"Surgical Items", value:randomValue({digit: 200}),icon:<ArrowDropUpIcon/>, iconLabel:"43%"},
    {label:"Drugs", value:randomValue({digit: 100}),icon:<ArrowDropUpIcon/>, iconLabel:"11%"},
    {label:"General Items", value:randomValue({digit: 1000}),icon:<ArrowDropUpIcon/>, iconLabel:"23%"},
    {label:"Foods", value:randomValue({digit: 50}),icon:<ArrowDropUpIcon/>, iconLabel:"23%"},
]

const graphData = [
    {
        id: "Surgical Consumable",
    data: GraphData({count:9,digit:100}),
    brColor:blue[500],
    bgColor:blue[50],

    },
    {
    id: "Consumable Items",
    data: GraphData({count:9,digit:100}),
    brColor:indigo[500],
    bgColor:indigo[50],

    },
    {
        id: "Surgical Items",
    data: GraphData({count:9,digit:100}),
    brColor:lightGreen[500],
    bgColor:lightGreen[50],

    },
    {
        id: "Drugs",
    data: GraphData({count:9,digit:100}),
    brColor:orange[500],
    bgColor:orange[50],

    },
    {
        id: "General Items",
    data: GraphData({count:9,digit:100}),
    brColor:red[500],
    bgColor:red[50],

    },
    {
        id: "Foods",
    data: GraphData({count:9,digit:100}),
    brColor:red[500],
    bgColor:red[50],

    },
]

    useEffect(()=>{
        if(!fetched)
        {
            graphData.map((item,i) =>  
            {Graph(
         {   id: item.id,
    data: item.data,
    brColor: item.brColor,
    bgColor: item.bgColor
})}
);    
    setFetched(true)
        }
       
    },[fetched]);


    return(
        <>

    <Box className={classes.section}>
        <Grid container spacing={1}>

        
                    {displayData.map((item,i) => 
                     
                     <Grid key = {i} item xs={6} sm={2} >
                         
                     <Card>

                         <CardContent  className={classes.cardContent}>
                        
                         <canvas id = {item.label} className={classes.displayCard}></canvas>
                      
                             <Typography variant="body2" className={classes.cardlabel}>
                                 {item.label}
                             </Typography>
                             <Typography variant="subtitle" component="h6" className={classes.carditem}>
                             {item.value}
                             </Typography>
                             <Typography component={"p"} style={{textAlign:"center", marginBottom:"0px",}}>
                             <Button size="small" className={classes.ratio} startIcon={<ArrowDropUpIcon/>} 
                           >
                              {item.iconLabel}
                             </Button>
                             </Typography>
                         </CardContent>
                         </Card>
            </Grid>
                         )}
                      

                          
                     
                        
        </Grid>
         
       <Grid container spacing={1}>
           <Grid item sm={8}>
<BookingProgress/>
           </Grid>
           <Grid item sm={4} >
           <Dates/>
           </Grid>
           </Grid>
    
        <DonationGraph/>
   
       
    </Box>

   



    </>
    );

}
export default Dashboard;