import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStyles } from "../BodyStyles";

export const PageHeader = ({label}) => {
    const classes = useStyles()
    return(
    <Grid container>
            <Grid item xs={12} sm={12}>
<Typography variant="body2" className={classes.pageTitle}>{label}</Typography>
            </Grid>
        </Grid>
    );
}
