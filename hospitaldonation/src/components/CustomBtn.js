import React from 'react'
import { Paper, Card, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#B2DFDB95',
        width:250,
    },
    pageHeader:{
        padding:theme.spacing(1),
        display:'flex',
        marginTop:theme.spacing(5),
        marginBottom:theme.spacing(2),
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(1),
        // color:'#B2DFDB95'
    },
    pageTitle:{
        paddingLeft:theme.spacing(1),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function CustomBtn(props) {

    const classes = useStyles();
    const { title, subTitle, icon,style } = props;
    return (
        <Paper elevation={0}  square className={classes.root} style={style}>
            <div className={classes.pageHeader} >
                <Card className={classes.pageIcon} >
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
