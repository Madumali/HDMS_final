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
import routes from "../utils/routes";
import { Link } from "react-router-dom";



const SideSubMenu = ({item, key}) => {

    const [subnav, setSubnav] = React.useState(false);

    const showSubnav = ()=> setSubnav(!subnav)

    const [ open, setOpen ] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    
    return (
        <div>
            <List
      // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     >
    
       
            <Link to = {item.path} style={{textDecoration:"none", color:"#616161"}}  onClick={item.subNav && showSubnav } >
          <ListItemButton key={key} >
            <ListItemIcon style={{color:"#616161"}}>
              {item.icon}
            </ListItemIcon>
            
            <ListItemText  primary={item.displayName}  /> 
            {
              item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null

            }
          </ListItemButton> 
          {/* <SideSubMenu key = {index} doc = {item} /> */}
          </Link>
          </List>
      
      {subnav && item.subNav.map((item,index) => (
 <Collapse
 key={index}
 in={subnav}
 timeout='auto'
 unmountOnExit
>
  <List component='li' disablePadding>
          <Link to = {item.path} key ={index}  style={{textDecoration:"none", color:"#616161",}}>
            <ListItemButton key ={index} sx={{ pl: 4 }}>
            <ListItemIcon style={{color:"#616161"}}>
              {item.icon}
            </ListItemIcon>
            
            <ListItemText  primary={item.displayName}  /> 
            </ListItemButton> 
          </Link>
          </List>
          </Collapse>
      ))}
            {/* <ListItem button key={doc.Id} onClick={handleClick}>
                <ListItemText primary={doc.displayName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                key={doc.Sheets.Id}
                in={open}
                timeout='auto'
                unmountOnExit
            > */}
                {/* <List component='li' disablePadding key={doc.Id}>
                    {routes.map(sheet => {
                        return (
                            <ListItem button key={sheet.Id}>
                                <ListItemIcon>
                                {sheet.icon}
                                    {/* <InsertDriveFileTwoToneIcon /> */}
                                {/* </ListItemIcon>
                                <ListItemText key={sheet.Id} primary={sheet.displayName} />
                    //         </ListItem> */}
                    {/* //     )
            //         // })} */}
               {/* </List> */}
             {/* </Collapse> */}
             {/* <Divider />  */}
             
        </div>
    )
}

export default SideSubMenu;