import React, {useState, useEffect} from "react";
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { Box, Grid } from "@material-ui/core";
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import BloodtypeTwoToneIcon from '@mui/icons-material/BloodtypeTwoTone';
import CustomBtn from "../components/CustomBtn";
import { Link } from "react-router-dom";

const ReportsMain = () => {
    const classes = useStyles()

    return (
        <div>
          <Box className={classes.section} style={{marginTop:3}} >
<PageHeader
                title="Reports"
                subTitle="All kinds of reports"
                icon={<AssessmentTwoToneIcon fontSize="large" />}
            />
 <Grid container spacing={1}>   

<Grid item xs={3}>
<Link to ="/reports/donor" style={{textDecoration:"none"}}>
<CustomBtn
 title="Donor Reports"
 subTitle="All details of donors"
 icon={<AssessmentTwoToneIcon fontSize="large" style={{color:"#FF8A65"}} />}
style ={{borderRadious:20, backgroundColor:"#FF3D00", marginLeft:45}}
 />
 </Link>
 </Grid>
<Grid item xs={3}>
<Link to ="/reports/blooddonors" style={{textDecoration:"none"}}>
<CustomBtn
 title="Blood Donors"
 subTitle="All details of blood donors"
 icon={<AssessmentTwoToneIcon fontSize="large" style={{color:"#B39DDB"}} />}
style ={{borderRadious:20, backgroundColor:"#D500F9", marginLeft:25}}
 />
  </Link>
</Grid>
<Grid item xs={3}>
<Link to ="/reports/donations" style={{textDecoration:"none"}}>
<CustomBtn
 title="Donation Reports"
 subTitle="All donation reports"
 icon={<AssessmentTwoToneIcon fontSize="large" style={{color:"#F8BBD0"}} />}
style ={{borderRadious:20, backgroundColor:"#F50057", marginLeft:20}}
 />
  </Link>
</Grid>
<Grid item xs={3}>
<Link to ="/reports/needs" style={{textDecoration:"none"}}>
<CustomBtn
 title="Requests"
 subTitle="donation requests"
 icon={<AssessmentTwoToneIcon fontSize="large" style={{color:"#D1C4E9"}} />}
style ={{borderRadious:20, backgroundColor:"#6200EA", marginLeft:25}}
 />
  </Link>
</Grid>
</Grid>


            </Box>
        </div>
    );
}
export default ReportsMain;