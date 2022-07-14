import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import * as bookingServices from "../../bookservice/bookingServices"
import ItemsList from "./reservations/ItemsList";

const ItemNeed = () => {
const [requests, setRequests] = useState([]);

const fetchdata = async () => {
    const token = localStorage.getItem('DonorauthToken');
    console.log(token, 'token');
    try {
        const response = await fetch("http://localhost:4000/requests/required/",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        console.log(response);
        const res = await response.json();
        console.log("result", res);
        const dataarray = [];
        for (const key_1 in res) {
            const reqst = {
                id: key_1,
                ...res[key_1]
            };
            dataarray.push(reqst);
            setRequests(dataarray);

        }
        console.log("request", dataarray);
    } catch (e) {
        console.log("error", e);
    }
 }
 useEffect(()=>{
 fetchdata()
 },[])
 


    return (
        <div>
            <Box  style={{border:"1px solid #7fffd4",  margin:"0px auto"}} 
           
      >
          <Typography variant="h6" style={{fontFamily:"Times New Roman", fontWeight:600, color: "#616161", textAlign:"center"}} >
              Following Items Are In Need
          </Typography>

{
    requests.map((items, index) =>
   { 
    return (  
     
    <ItemsList  key={index} text={items} text1={items.itemname} />
    
    )}

    )
}
          </Box>
        </div>
    )

}
export default ItemNeed;


