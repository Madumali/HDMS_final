import { makeStyles } from "@material-ui/core";
import { blue, blueGrey } from "@material-ui/core/colors";
  import { createTheme } from '@material-ui/core/styles';
  import { Theme } from '@mui/material'
import { breakpoints, spacing } from "@mui/system";
import { useTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#2196F3",
//         light: '#E3F2FD',
//         200:'#90CAF9',
//       },
//       secondary: {
//         main: "#673ab7",
//         light: '#ede7f6'
//       },
//       warning: {
//         main: "#ffe57f",
//         light: "#b9f6ca"
//       },
//       error: {
//         main: "#f44336",
//         light: "#ef9a9a"
//       },
//       background: {
//         default: "#f4f5fd"
//       },
//     },
//     overrides:{
//       MuiAppBar:{
//         root:{
//           transform:'translateZ(0)'
//         }
//       }
//     },
//     props:{
//       MuiIconButton:{
//         disableRipple:true
//       }
//     }
//   })



export const useStyles = makeStyles(theme => ({
    logo:{
        color:'red'
    },
    navlist: {
        minWidth:'250px',
        maxWidth:'300px'
    },
    notiAvatar:{
        backgroundColor: blue["200"],
        color:"white",
    },
    navAvatar:{
        width:'10px',
        height:'10px',
        [theme.breakpoints.down("xs")]:{
            width:'5px',
        height:'5px',
        }
    },
    //SideNav
    drawerPaper:{
      backgroundColor:"#B388FF",
        marginTop:'85px',
       
    },
    drawerPaper2:{
      background:"blue",
        marginTop:'143px',
       
    },
    //routes
    wrapper:{
        color: "#673ab7",
        // backgroundColor:blue["A200"],
        borderRadius : 20,
        height:"150vh",
        // background:"#efefef",
        padding:theme.spacing(15,5,0,34),
        [theme.breakpoints.down("xs")]:{
            padding:theme.spacing(2,2)
        }
    },
    navLinks:{
        color:blueGrey["A400"],
        "&:hover, &:hover div":{
            color:blue["A200"],
        },
        "& div":{
            color:blueGrey["A400"],
        },
    },
    activeNavlinks : {
        color:blue["A700"],
        "& div":{
            color:blue["A700"],
        },
    },
    navButton:{
        width:'100%',

    },
    nameLog:{
      marginLeft:'60px',
      width:'auto',
      height:'10px',
      marginTop:'12px',
      // padding:'20px'
    }
    
  }))