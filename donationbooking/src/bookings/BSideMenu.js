import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { useStyles } from "../components/Header/HeaderStyle";

const BSideMenu = ({ item, keys, handleDrawerClose }) => {
  const classes = useStyles()

  const [subnav, setSubnav] = React.useState(false);

  const showSubnav = () => setSubnav(!subnav)

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <List
      key={keys}
        // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >


        <Link to={item.path} key={keys} style={{ textDecoration: "none", color: "#616161" }} onClick={item.subNav && showSubnav} >
          <ListItemButton key={keys} className={classes.navButton} onClick={handleDrawerClose} sx={{ py: 0 }}>
            <ListItem exact="true" key={keys} className={classes.navLinks} >
              <ListItemIcon style={{ color: "#616161" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.displayName} />
              {
                item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null

              }
            </ListItem>
          </ListItemButton>
          {/* <SideSubMenu key = {index} doc = {item} /> */}
        </Link>
      </List>
      </div>
  )
}

export default BSideMenu;