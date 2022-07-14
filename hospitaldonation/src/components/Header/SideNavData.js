import React from "react";
import SideSubMenu from "./SideSubMenu";
import routes from "../../utils/routes";

const SideNavData = ({ handleDrawerClose }) => {
  const roleName = localStorage.getItem("userrole");
  return (
    <>
      {routes.map((item, index) => {
        if (
          !item.roles ||
          (item.roles && item.roles.findIndex((el) => el === roleName) > -1)
        ) {
          return (
            <SideSubMenu
            key={index}
              keyss={index}
              item={item}
              handleDrawerClose={handleDrawerClose}
            />
          );
        }
      })}
    </>
  );
};
export default SideNavData;
