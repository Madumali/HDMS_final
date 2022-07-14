import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const StockPieChart = () => {
  const [data, setData] = useState({

    labels: [],
    datasets: [
      {
        label: 'In stock',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      
      },
    ],

  });

  const fetchdata = () =>{
    const dataarray1 = [];
     const dataarray2 = [];
     const code = [];
   
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
      
     }).then((res) => {
        for (const key in res) {
         const stock = {
                               id:key,
                           ...res[key]
                        }
         dataarray1.push(stock.qty);
         code.push(stock.codeid);
      
            // labelSet.push(val.name)
        }
        setData({
          labels: code,
          datasets: [
            {
              label: 'In stock',
              data: dataarray1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
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



    return (
    <div style={{ width: '70%', margin:"5px auto"}} >
    <Pie data={data} 
    options={{
      responsive:true,
      maintainAspectRatio:true,
    }}
    />
     </div>
    );
}

export default StockPieChart;