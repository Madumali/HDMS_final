import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@mui/material/colors";





export const useStyles = makeStyles((theme)=>({
   
toolbar: {
display:"flex",
justifyContent:"space-between",
backgroundColor:"white",
    },
arrow:{
    display:"flex",
    justifyContent:"center",
},
    notchedOutline: {
        border:'1px solid #add8e6',
        borderRadius:10,
         
           
    },
    section:{
        margin:theme.spacing(3,0)
    },
    pageTitle:{
        color:blueGrey[500],
        margin:theme.spacing(11,0,2,0),
    },
    mainpaper:{
        width:"1250px",
        padding:theme.spacing(3,3,3,3),
        color:blueGrey[500],
        border:'1px solid #add8e6',
        // backgroundColor: '#ffffff95'
    },
    //dashboard

    cardlabel:{
        textTransform:"uppercase",
        color:blueGrey[500],
        textAlign:"center",
        margin:theme.spacing(1,0),
        [theme.breakpoints.down("xs")]:{
            fontSize:"0.8rem",
        },
    },
    carditem:{
        textTransform:"Capitalize",
        color:blueGrey[800],
        textAlign:"center",
        margin:theme.spacing(2,0),
        [theme.breakpoints.down("xs")]:{
            fontSize:"1.8rem",
        },
    },
    ratio:{
        fontSize:"1rem",
        fontWeight:"bold",
        color:"blue"
    },
    //cardgraph
    displayCard:{
        position:"absolute",
        bottom:"0",
        left:"0",
        width:"100% !important ",
        height:"50% !important",

    },
    cardContent:{
        position:"relative",
    },
    //donation graph
    displayMainGraph:{
width:"100%",
minHeight:"300px",
height:"auto"
    },
    //pages
    pageContent: {
        display:"flex",
        margin: theme.spacing(-0.5),
        marginLeft: theme.spacing(-2.9),
        padding: theme.spacing(2),
           color: theme.palette.secondary.main,
           backgroundColor: theme.palette.primary.light,
           borderRadius : 20,
           width : '170vh',
           height:'120vh'
       },
         table: {
           marginTop: theme.spacing(1),
               fontWeight: '200',
               color: theme.palette.primary.main,
               backgroundColor: theme.palette.primary.light,
           
       },
         searchInput: {
           width: "30%",
         },
         newButton: {
           position: "absolute",
           left: "510px",
         },
         
       paper2: {
       
               borderRadius:10,
               color:blueGrey[500],
               backgroundColor: "#ffffff",
               width:'50vh',
               paddingLeft:'35px'
          
            
       },
       //pdf
       printback:{
           marginTop:-110,

       },

       paperStylepdf: {
        variant: "outlined",
        // padding: 20,
        width: "793.92px",
        height:"1121.24px",
         //612
        margin: "0 auto 0 auto",
        border: "1px solid lightBlue",
        borderRadius: 5,
        // paddingTop:1,
      },
      img: {
        height: 50,
        width: 145,
      },


      //Booking

      emblem:{
display:"none",
[theme.breakpoints.up("sm")]:{
    display:"block",
},
},
emblemres:{
display:"block",
[theme.breakpoints.up("sm")]:{
    display:"none",
},
        },

        //hdmd
              
hdms:{
display:"none",
[theme.breakpoints.up("sm")]:{
    display:"block",
},
},
hdmsres:{
display:"block",
[theme.breakpoints.up("sm")]:{
    display:"none",
},
        },

nci:{
display:"none",
[theme.breakpoints.up("sm")]:{
    display:"block",
},
        },
ncires:{
display:"block",
[theme.breakpoints.up("sm")]:{
    display:"none",
},
        },
//how to donate
donImg:{
maxWidth:650,
height:500,
marginTop:150,
marginLeft:-100,
[theme.breakpoints.down("xs")]:{
    marginTop:95,
    width:300,
    height:200,
    marginLeft:20,
},
[theme.breakpoints.down("sm")]:{
    marginTop:90,
    marginLeft:30,
},
},



//home
home:{
marginLeft:"1400px",
paddingRight:10,
textDecoration:"none",
color:"white",
marginTop:10
},
babyImg:{
    marginTop:50,

},
apeImg:{
    marginTop:55,
    // marginLeft:30,
    width:1700,
    height:600,

},
//donate
donate:{
    textDecoration:"none",
    color:"white",
    marginTop:10,
    paddingRight:20,
    },
    signin:{
        textDecoration:"none",
        color:"white",
        marginTop:0,
        // paddingRight:50,
        },
//container
container:{
    height:"100vh",
    paddingTop:theme.spacing(5),
    position:"sticky",
    top:0,
   
},
//nav
nav:{
    
    marginTop:85,
    height:10,
    [theme.breakpoints.down("xs")]:{
        height:5,
        marginTop:80,
    },
    [theme.breakpoints.down("sm")]:{
        marginTop:70,
    },
},

//nav1
nav1:{
    
    marginTop:95,
    [theme.breakpoints.down("xs")]:{
        marginTop:55,
        height:40
    },
    [theme.breakpoints.down("sm")]:{
        marginTop:75,
        height:45
    },
},

//nav Home
navHome:{
    
    marginTop:0,
    height:55,
    [theme.breakpoints.down("xs")]:{
        marginTop:0,
        height:40
    },
    [theme.breakpoints.down("sm")]:{
        marginTop:0,
        height:45
    },
},



//Nav Icon 

navicon:{
    marginLeft:250,
    [theme.breakpoints.down("xs")]:{
        marginLeft:10,
    },
},
//ItemNeed

itemneed: {
    paddingTop:10,
    [theme.breakpoints.down("xs")]:{
        marginTop:50,
    },
},

bookdonor:{
    marginLeft:1080,
    [theme.breakpoints.down("xs")]:{
        marginLeft:85,
    },
},


 //donor login
root: {
    minHeight: '100vh',
    backgroundImage : "url(/suwapeksha.jpg)",
    backgroundRepeat:'no-repeat',
    backgroundSize : 'cover',
    display:'flex',
    alighItems : 'center',
    justifyContent:'center',
  
  },
  paper: {
    backgroundColor: '#ffffff95',
    padding: 20,
    height: 640,
    width: 430,
    margin:"0 auto",
    [theme.breakpoints.down("xs")]:{
        height: 712,
        width: 318,
    },
  },
  paper3:{
    backgroundColor: '#ffffffff',
    margin:"0 auto",
    width:411,
    height:670,
  paddingTop:20,
  paddingLeft:60,
    [theme.breakpoints.down("xs")]:{
        height: 740,
        width: 325,
        paddingLeft:30,
        paddingTop:10,
    },
  },

  paper4:{
    backgroundColor: '#ffffff95',
    margin:"40px auto",
    width:460,
    height:370,
  paddingTop:20,
  paddingLeft:60,
    [theme.breakpoints.down("xs")]:{
        height: 440,
        width: 320,
        paddingLeft:30,
        paddingTop:10,
    },
  },


  paper5:{
    backgroundColor: '#ffffffff',
    margin:"0 auto",
    width:411,
    height:350,
  paddingTop:20,
  paddingLeft:60,
    [theme.breakpoints.down("xs")]:{
        height:300,
        width: 325,
        paddingLeft:30,
        paddingTop:10,
    },
  },



//tab login
paperStyle : {width:470, margin:"20px auto",
[theme.breakpoints.down("xs")]:{
    height: 800,
    width: 358,
},
},
tabSize:{
    width:"235px",
    [theme.breakpoints.down("xs")]:{
       
        width: 180,
    },
},

calpaper:{
    width:"450px",
     margin:"0 auto",
    [theme.breakpoints.down("xs")]:{
       
        width: "400px",
        margin:"0 auto"
    },
},
resetBtn: {
    backgroundColor:"#ffffff"
}


}))