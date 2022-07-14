import * as React from 'react';
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';

import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  
    paperstyle: {
    //    border:'1px solid lightBlue',
    //    borderRadius:10,
       width:'55vh',
       height:'30vh',
      margin:'0 auto'
    }
  }))



export default function ItemsList(props) {
    const classes = useStyles();
    const { text, keys } = props;


    return (
        // <div>
        <List key =  {keys} >  
<ListItem disablePadding>
  <ListItemButton>
    <ListItemText primary=  {text.itemname} />
    <ListItemText primary= {text.required } />
    </ListItemButton>
    </ListItem>

       </List>
       /* </div> */
    );

}