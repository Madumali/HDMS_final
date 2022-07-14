import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useStyles } from "./HeaderStyle";
import SideNavData from "./SideNavData";

const drawerWidth = 255;
const SideNav = (
  { mobileOpen, handleDrawerToggle, handleDrawerClose },
  props
) => {
  const classes = useStyles();
  const { window } = props;
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        classes={{
          drawerPaper: classes.drawerPaper,
        }}
      >
        {/* {drawer} */}
        <SideNavData handleDrawerClose={handleDrawerClose} />
      </Drawer>

      {/* FOR DESKTOP */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#004D40",
          },
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* {drawer} */}
        <SideNavData handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </Box>
  );
};

export default SideNav;
