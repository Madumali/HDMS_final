
import React from "react";
import Login from './loginPage/Login';
import HeaderComponent from "./components/Header/HeaderComponent"
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: '#E3F2FD',
      200:'#90CAF9',
  mainp: "#333996",
  lightp: '#3c44b126'
    },
    secondary: {
      main: "#673ab7",
      light: '#ede7f6',
  mains: "#f83245",
  lights: '#f8324526'
    },
    warning: {
      main: "#ffc400",
      light: "#ffe57f"
    },
    success:{
      light:'#69f0ae',
      main:'#00e676'
    },
    default:"#ffffff",
    error: {
      main: "#f44336",
      light: "#ef9a9a"
    },
    background: {
      default: "#f4f5fd"
    },
  },
  // #b9f6ca
  // #ffe57f
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




const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App(){
  


  
  return (
  <>
     <ThemeProvider theme={theme}>
   
    <Router>
        <React.Suspense fallback={loading}> 
      
          <Switch>
       
            <Route exact path='/login' component={()=><Login/>} />
            
          <HeaderComponent/>
        
             </Switch>
             
             </React.Suspense>
          
      </Router> 
    


     

        

     </ThemeProvider>
      </>
  );
}
// }

export default App;



