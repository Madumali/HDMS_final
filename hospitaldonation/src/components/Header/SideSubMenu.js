import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

import { Link } from "react-router-dom";
import { useStyles } from "./HeaderStyle";

const SideSubMenu = ({ item, keyss, handleDrawerClose }) => {
  const classes = useStyles();
  const [subnav, setSubnav] = React.useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List
        key={keyss}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Link
          to={item.path}
          key={keyss}
          style={{ textDecoration: "none", color: "#616161" }}
          onClick={item.subNav && showSubnav}
        >
          <ListItemButton
            key={keyss}
            className={classes.navButton}
            onClick={handleDrawerClose}
            sx={{ py: 0 }}
          >
            <ListItem exact="true" key={keyss} className={classes.navLinks}>
              <ListItemIcon style={{ color: "#616161" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.displayName} />
              {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </ListItem>
          </ListItemButton>
        </Link>
      </List>

      {subnav &&
        item.subNav.map((item, index) => (
          <Collapse key={index} in={subnav} timeout="auto" unmountOnExit>
            <List disablePadding key={index}>
              <Link
                to={item.path}
                key={index}
                style={{ textDecoration: "none", color: "#616161" }}
              >
                <ListItemButton
                  key={index}
                  sx={{ pl: 4, py: 0 }}
                  className={classes.navButton}
                  onClick={handleDrawerClose}
                >
                  <ListItem
                    exact="true"
                    key={index}
                    className={classes.navLinks}
                  >
                    <ListItemIcon style={{ color: "#616161" }}>
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText primary={item.displayName} />
                  </ListItem>
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
  );
};

export default SideSubMenu;
