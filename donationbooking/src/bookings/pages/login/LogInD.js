import { Box } from "@mui/system";
import React from "react";
import LoginDonor from "./LoginDonor";
import { useStyles } from "../../../components/BodyStyles";
import { makeStyles} from "@material-ui/core";
import bgimg from "../../../components/images/suwapeksha.jpg";

const useStyless = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage : `url(${bgimg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize : 'cover',
    display:'flex',
    alighItems : 'center',
    justifyContent:'center'
  },
  paper: {
    backgroundColor: '#673ab7'
  }
}))

const LogInD = () => {
    const classes = useStyles();
    const classess = useStyless();
    return(
<div className={classess.root}>
        <Box className = {classes.container} >
<LoginDonor/>

        </Box>
        </div>
    );


}
export default LogInD;