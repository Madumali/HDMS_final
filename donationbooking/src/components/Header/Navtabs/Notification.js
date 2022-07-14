import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton,ListItemIcon } from '@mui/material';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import{ useStyles} from "../HeaderStyle"
import { blue } from '@mui/material/colors';
import Controls from '../../controls/Controls';


export default function Notification() {
    const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menu = [
      {
          label:"Settitngs", des:"msg from...."
      },
      {
          label:"Log Out", des:"msg from...."
      }
  ]

  return (
    <div>
      
      <IconButton
      // color='inherit'
        id="basic-button"
        aria-controls={open ? 'Notification' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
       
      >
       
      <Badge badgeContent={4} color="error" sx={{"& .MuiBadge-badge":{backgroundColor:"red"}}} >
      <NotificationsIcon style ={{color:blue["A400"]}} />
     </Badge>
   
      </IconButton>
    

      <Menu
        id="Notification"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          <List className= {classes.navlist}>
          {menu.map((item,i) =>(
  <ListItem key={i} onClick={handleClose}>
  <ListItemIcon> <Avatar className={classes.notiAvatar} sx={{ bgcolor:blue["A400"]}}>{item.label[0].toUpperCase()}</Avatar> </ListItemIcon>
  <ListItemText primary = {item.label} secondary={item.des}>  </ListItemText>
  </ListItem>
          ))}
      </List>
      </Menu>
    </div>
  );
}
