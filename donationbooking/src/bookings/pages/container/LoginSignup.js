import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoginDonor from "../login/LoginDonor";
import SignUp from "../signup/SignUp";
import { Paper } from "@mui/material";
import { useStyles } from "../../../components/BodyStyles";
import { makeStyles} from "@material-ui/core";
import bgimg from "../../../components/images/suwapeksha.jpg";
import SignUpDonorForm from "../signup/SignUpDonorForm";

const useStyless = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage : `url(${bgimg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize : 'cover',
    display:'flex',
    alighItems : 'center',
    justifyContent:'center'
  },
  paper: {
    backgroundColor: '#673ab7'
  }
}))

const LoginSignup = () => {
  const classes = useStyles();
  const classess = useStyless();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

// const paperStyle = {width:470, margin:"20px auto"}

      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

    return(
      <div className={ classess.root}>
        <Paper  className={classes.paperStyle}>
         
<Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" >
      <Tab label="SignIn" className={classes.tabSize}/>

      <Tab label="SignUp" className={classes.tabSize}/>
    </Tabs>

<TabPanel value={value} index={0}>
<LoginDonor handleChange={handleChange}/>
</TabPanel>
<TabPanel value={value} index={1}>
<SignUp/>
</TabPanel>

</Paper>
</div>
    );

}
export default LoginSignup;