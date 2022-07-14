import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material'
import { useStyles } from '../components/Header/HeaderStyle';
import BSideData from './BSideData';

const drawerWidth = 270;
const BookSide = ({mobileOpen, handleDrawerToggle,handleDrawerClose},props)=> {

const classes = useStyles();

    const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  // const paper = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
        flexDirection="row"
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={paper}
          // style={{backgroundColor:"blue"}}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          classes={{
            drawerPaper:classes.drawerPaper,
        }}
        >
          {/* {drawer} */}
         <BSideData handleDrawerClose={handleDrawerClose}/>
        </Drawer>



{/* FOR DESKTOP */}

        <Drawer
            // style={{backgroundColor:"blue"}}
          variant="permanent"
          open
          // onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor:"#004D40" },
            
          }}
         
          classes={{
              paper:classes.drawerPaper2,
          }}
          
        >
            <Toolbar/>
       
          {/* {drawer} */}
          <BSideData handleDrawerClose={handleDrawerClose}/>
          
        </Drawer>
      </Box>
    );
}

export default BookSide;