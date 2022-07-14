import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import mypic from "./mypic.jpg";
import { useStyles } from '../HeaderStyle';
import { useHistory } from 'react-router-dom';
import Controls from '../../controls/Controls';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';

export default function RightNav() {

const classes = useStyles()
const history = useHistory();
const [anchorEl, setAnchorEl] = React.useState(null);
const [auth, setAuth] = React.useState(true);

let user = localStorage.getItem("name");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout= () => {
    // localStorage.setItem("isLoggedIn", false);
    // localStorage.setItem("authToken", '');
    // localStorage.setItem("name", '');
    // localStorage.setItem("userrole", '');
    localStorage.clear();
    history.push('/login');
  }
 
  return (
   
  
  <div>
     {auth && (
       <>
    
    {/* <Badge badgeContent={user} color="secondary"/>  */}
      {/* </Badge> */}
     

      <Button
    //   color='inherit'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        
        startIcon = {<> <Avatar className={classes.navAvatar} style={{width:"30px",height:"30px"}} src={mypic}></Avatar></>}
  
      >
      {/* className={classes.nameLog}  */}
      </Button>
      </>
    )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
   <MenuItem  component = {ListItem} onClick={handleClose}>
 <Badge badgeContent={user} color="secondary" className={classes.nameLog}/>

  </MenuItem>
  <MenuItem  component = {ListItem} onClick={handleClose}>
  
  <ListItemIcon><SettingsIcon/></ListItemIcon>

  <ListItemText>My Account</ListItemText>
  </MenuItem>
  <MenuItem  component = {ListItem}  onClick={logout}>
  <ListItemIcon><LogoutIcon/></ListItemIcon>
  <ListItemText>Logout</ListItemText>
  </MenuItem>
      </Menu>

     
    </div>
  );
}
