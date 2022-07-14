import { blue } from "@mui/material/colors";
import { Chart, registerables } from "chart.js";


export const Graph = ({id, data, brColor, bgColor}) => {
  
const ctx = document.getElementById(id).getContext('2d');
Chart.register(...registerables);
const myChart = new Chart(ctx, {
    type: "line",
    data : {
        labels: "myChart",
        datasets: [{
          label: id,
          data: data,
          fill: true,
          borderColor: brColor,
          backgroundColor: bgColor,
          tension: 0.5,
        },
        
        ],
    },
    options: {
        scales: {
            x: {
                
                display:false,
                title:{display:false},
            },
            y: {
                
                display:false,
                title:{display:false},
            },
        },
        plugins:{
            legend: { display: false },
        },
    },
    responsive:true,
    maintainAspectRatio:false,

});

return myChart;
};


// export const GraphMain = ({id,type, data, xAxislabels,lbl}) => {
  
//     const ctx = document.getElementById(id).getContext('2d');
//     Chart.register(...registerables);
//     const myChart = new Chart(ctx, {
//         type: type ? type : "line",
//         data : {
//             labels: xAxislabels,
//             datasets: [{
//                 label: lbl,
//                 data: data,
//                 fill: true,
//                 borderColor:blue["A200"],
//                 backgroundColor: "rgba(21,101,192,0.6)",
//                 tension: 0.5,
//               }],
//         },
//         options: {
//             scales: {
//                 // x: {
                    
//                 //     display:false,
//                 //     title:{display:false},
//                 // },
//                 // y: {
                    
//                 //     display:false,
//                 //     title:{display:false},
//                 // },
//             },
//             plugins:{
//                 legend: { position: "bottom" },
//             },
//         },
//         responsive:true,
//         maintainAspectRatio:false,
    
//     });
    
//     return myChart;
//     };

