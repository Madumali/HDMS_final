import { makeStyles } from "@material-ui/core";
import { blue, blueGrey } from "@material-ui/core/colors";
  import { createTheme } from '@material-ui/core/styles';
  import { Theme } from '@mui/material'
import { breakpoints, spacing } from "@mui/system";
import { useTheme } from '@mui/material/styles';


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
        marginTop:'150px',
       
    },
    //routes
    wrapper:{
        color: "#673ab7",
        borderRadius : 20,
        height:"150vh",
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