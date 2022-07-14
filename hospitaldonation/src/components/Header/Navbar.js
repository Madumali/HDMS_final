import  React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RightNav from './Navtabs/RightNav';
import Notification from './Navtabs/Notification';
import { useStyles } from './HeaderStyle';
import Avatar from '@mui/material/Avatar';
import nciNew2  from "../../components/images/nciNew2.svg"
import hdms from "../../components/images/hdms logo5.png";


 const Navbar = ({handleDrawerToggle})=> {
     const classes = useStyles()
     const [opens, setOpen] = useState(false);
     const anchorRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};
const prevOpen = useRef(open);
useEffect(() => {
    if (prevOpen.current === true && opens === false) {
        anchorRef.current.focus();
    }
    prevOpen.current = opens;
}, [opens]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    //   <div>
    <Box flexDirection="column" sx={{ flexGrow: 1 }}> 
      <AppBar position="fixed" style={{background:"#ffffff", borderBottom:"10px solid blue "}}>
        <Toolbar>
        {/* background:"#e8eaf6",#03a9f4 */}
<img src={nciNew2} style = {{maxHeight:65, maxWidth: 200, margin: "auto  0 auto -7px", paddingBottom:1}}/>
<Box
                sx={{
                    ml: 2,
                    mr: 3,
                    // [theme.breakpoints.down('md')]: {
                    //     ml: 1
                    // }
                }}
            >

                    <Avatar
                        variant="rounded"
                        sx={{
                          
                            transition: 'all .2s ease-in-out',
                            background: '#ede7f6',
                            color: '#5e35b1',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: '#5e35b1',
                                color: '#ede7f6'
                            }
                        }}
                         ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                         onClick={handleToggle}
                        color="inherit"
                    >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
            onClick={()=>handleDrawerToggle()}
          >
            <MenuIcon stroke={1.5} size="1.3rem" style={{marginLeft:"30px"}}/>
          </IconButton>
          </Avatar>
       
                </Box>



          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.logo}>
          <img src={hdms} style = {{maxHeight:65, maxWidth: 200, margin: "auto  0 auto 450px", paddingBottom:1}}/>
          </Typography>
          <Box style={{display:"flex", marginRight:0}}>
          <Notification/>
              <RightNav/>
              
      </Box>
         
        
     
        </Toolbar>
      </AppBar>
     </Box> 
    /* </div> */
  );
}
export default Navbar;