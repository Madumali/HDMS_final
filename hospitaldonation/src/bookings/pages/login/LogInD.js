import { Box } from "@mui/system";
import React from "react";
import LoginDonor from "./LoginDonor";
import { useStyles } from "../../../components/BodyStyles";
import BookingComponent from "../../BookingComponent";

const LogInD = () => {
    const classes = useStyles();
    return(

        <Box className = {classes.container} >
<LoginDonor/>

        </Box>
    );


}
export default LogInD;