import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { useStyles } from '../components/Header/HeaderStyle';
import BSideData from './BSideData';

const drawerWidth = 270;
const BookSide = ({mobileOpen, handleDrawerToggle,handleDrawerClose},props)=> {

const classes = useStyles();


    return (
        <Box
        flexDirection="row"
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
      
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor:"#004D40" },
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
         
          variant="permanent"
          open
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