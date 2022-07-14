import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import emblem from "../components/images/emblem.png";
import nci  from "../components/images/nciNew2.png";
import hdms from "../components/images/hdms logo5.png";
import { useStyles } from "../components/BodyStyles";
import Nav from './Nav';
import Nav1 from './Nav1';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = ({handleDrawerToggle}) => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
<Typography variant='h6' className={classes.emblem}>
<img src={emblem} style = {{maxHeight:100, maxWidth: 100, margin: "auto  1px auto -10px"}}/>
</Typography>
<Typography variant='h6' className={classes.emblemres}>
<img src={emblem} style = {{maxHeight:50, maxWidth: 50, margin: "auto  1px auto -10px"}}/>
</Typography>
<div className={classes.mid}>
<Typography variant='h6' className={classes.hdms}>
<img src={hdms} style = {{maxHeight:65, maxWidth: 200, margin: "auto  0px auto -80px"}}/>
</Typography>
<Typography variant='h6' className={classes.hdmsres}>
<img src={hdms} style = {{maxHeight:35, maxWidth: 100, margin: "auto  0px auto -80px"}}/>
</Typography>
</div>
<div className={classes.mid}>
<Typography variant='h6' className={classes.nci}>
<img src={nci} style = {{maxHeight:90, maxWidth: 180, margin: "auto  0px auto -80px"}}/>
</Typography>
<Typography variant='h6' className={classes.ncires}>
<img src={nci} style = {{maxHeight:35, maxWidth: 100, margin: "auto  0px auto -80px"}}/>
</Typography>
</div>
      </Toolbar>
      {/* <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography  component="div"
            sx={{ display: { xs: 'none', md: 'flex' } }}>
<img src={emblem} style = {{maxHeight:400, maxWidth: 790, margin: "auto  1px auto -80px"}}/>
          </Typography>

          <Typography  component="div"
            sx={{  display: { xs: 'none', md: 'flex' } }}>
          <img src={hdms} style = {{maxHeight:65, maxWidth: 200, margin: "auto  -70px auto 600px"}}/>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 40,mt:5, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  sx={{mt:5}} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Typography    variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <img src={hdms} style = {{maxHeight:65, maxWidth: 200, margin: "auto  -70px auto 600px"}}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Typography>
          <img src={nciNew2} style = {{maxHeight:65, maxWidth: 200, margin: "auto  -70px auto -80px"}}/>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
           
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>  */}
    </AppBar>
    <Nav1/>
   <Nav handleDrawerToggle = {handleDrawerToggle}/>
    </>
  );
};
export default NavBar;
