import React from 'react'
// import MAppBar from './MAppBar';
import { SideMenu } from './SideMenu';
import { CssBaseline } from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
    palette: {
      primary: {
        main: "#2196F3",
        light: '#E3F2FD',
        200:'#90CAF9',
      },
      secondary: {
        main: "#673ab7",
        light: '#ede7f6'
      },
      warning: {
        main: "#ffe57f",
        light: "#b9f6ca"
      },
      error: {
        main: "#f44336",
        light: "#ef9a9a"
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      paddingLeft: '240px',
      width: '100%',
      color:"secondary"
    }
  })
  

const Layout = () => {

    const classes = useStyles();

  return (

    <ThemeProvider theme={theme}>
          <SideMenu />
         
        <div >
      {/* <MAppBar />  */}
     
      </div>
      <CssBaseline />
    </ThemeProvider>
    // <div className="c-app c-default-layout">
    //   <TheSidebar/>
    //   <div className="c-wrapper">
    //     <TheHeader/>
    //     <div className="c-body">
    //       <TheContent/>
    //     </div>
    //     <TheFooter/>
    //   </div>
    // </div>
  )
}

export default Layout;