import React, { useState, useEffect } from "react";
import { Paper, Box } from "@material-ui/core";
import { PageHeader } from "../components/controls/Common";
import { useStyles } from "../components/BodyStyles";
import { sum, sumBy } from "lodash";
import BasicTable from "../components/materialTable/BasicTable"
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import InventoryTable from "./InventoryTable";
import CategoryItemInventory from "./CategoryItemInventory";  
import ItemDetails from "./ItemDetails";


const Inventory = () => {
    const classes = useStyles();
   


    return (
       <Box className={classes.section} style={{marginTop:3}} >
      <PageHeader
                title="Inventory"
                subTitle="Inventory details"
                icon={<StorefrontTwoToneIcon fontSize="large" />}
            />
  {/* <Paper style={{borderRadius:5, height:"auto", padding:3}}> */}
  <InventoryTable/>
      
      <CategoryItemInventory/>
        {/* </Paper> */}

        <ItemDetails/>
    </Box>
  );

}
export default Inventory;