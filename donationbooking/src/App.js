
import React, { Component } from "react";
// import Login from './loginPage/Login';
// import HeaderComponent from "./components/Header/HeaderComponent"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useHistory
} from "react-router-dom";

import { createTheme } from '@material-ui/core/styles';
import BookingComponent from "./bookings/BookingComponent";
import Home from "./bookings/pages/Home";
import LogInD from "./bookings/pages/login/LogInD";
import Donateus from "./bookings/pages/donateus/Donateus";
import LoginSignup from "./bookings/pages/container/LoginSignup";
import ConfirmPage from "./bookings/pages/login/ConfirmPage";
import SignUp from "./bookings/pages/signup/SignUp";
import ForgetPw from "./bookings/pages/login/ForgetPw";
import Footer from "./bookings/pages/footer/Footer.js"


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
      main: "#b9f6ca",
      light: "#ffe57f"
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
   
    
    <Router>
        <React.Suspense fallback={loading}> 
  
          <Switch>
      
            <Route exact path='/' component={()=> <Home/> } />
           <Route exact path='/bookings/home' component={()=> <Home/>} />
           <Route exact path='/bookings/donate' component={()=> <Donateus/>} />
           <Route exact path='/bookings/main' component={()=> <LoginSignup/>} />
           <Route exact path='/bookings/signin' component={()=> <LogInD/>} />
           <Route exact path='/bookings/signin/id' component={()=> < ForgetPw/>} />
           <Route exact path='/bookings/verify/:token_mail' component={()=> <ConfirmPage/>} />
           <Route exact path='/bookings/signup' component={()=> <SignUp/>} />
           
          
        
            <BookingComponent/>
             </Switch>
             
             </React.Suspense>
          
      </Router> 
    <Footer/>


     
         
        

     {/* </ThemeProvider> */}
      </>
  );
}
// }

export default App;



