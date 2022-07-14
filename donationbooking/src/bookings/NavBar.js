import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import emblem from "../components/images/emblem.png";
import nci  from "../components/images/nciNew2.png";
import hdms from "../components/images/hdms logo5.png";
import { useStyles } from "../components/BodyStyles";
import Nav from './Nav';
import Nav1 from './Nav1';


const NavBar = () => {
  const classes = useStyles();


  return (
    <>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
<Typography variant='h6' className={classes.emblem}>
<img src={emblem} style = {{maxHeight:100, maxWidth: 100, margin: "auto  1px auto -10px"}}/>
</Typography>
<Typography variant='h6' className={classes.emblemres}>
<img src={emblem} style = {{maxHeight:50, maxWidth: 55, margin: "10px  2px auto -10px"}}/>
</Typography>
<div className={classes.mid}>
<Typography variant='h6' className={classes.hdms}>
<img src={hdms} style = {{maxHeight:65, maxWidth: 200, margin: "auto  0px auto -80px"}}/>
</Typography>
<Typography variant='h6' className={classes.hdmsres}>
<img src={hdms} style = {{maxHeight:45, maxWidth: 120, margin: "6px  0px auto -80px"}}/>
</Typography>
</div>
<div className={classes.mid}>
<Typography variant='h6' className={classes.nci}>
<img src={nci} style = {{maxHeight:90, maxWidth: 180, margin: "auto  0px auto -80px"}}/>
</Typography>
<Typography variant='h6' className={classes.ncires}>
<img src={nci} style = {{maxHeight:45, maxWidth: 120, margin: "6px  0px auto -85px"}}/>
</Typography>
</div>
      </Toolbar>
     
    </AppBar>
    <Nav1/>
 
    </>
  );
};
export default NavBar;
