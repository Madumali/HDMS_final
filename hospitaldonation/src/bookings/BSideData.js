import React from "react";
import BSideMenu from "./BSideMenu";
import bookroutes from "../utils/bookroutes";

const BSideData = ({ handleDrawerClose }) => {

  return (<>
    {bookroutes.map((item, index) => {
        return(
<BSideMenu key={index} item={item} handleDrawerClose={handleDrawerClose} />
        );
        
      
    })}
  </>
  );
}
export default BSideData;