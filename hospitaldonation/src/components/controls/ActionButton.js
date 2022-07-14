import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 1,
        margin: theme.spacing(0.5),
       
    },
    error: {
        backgroundColor: theme.palette.error.light,
        '& .MuiButton-label': {
            color: theme.palette.error.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary[200],
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    warning: {
        backgroundColor: theme.palette.warning.light,
        '& .MuiButton-label': {
            color: theme.palette.warning.main,
        }
    },
    success: {
        backgroundColor: theme.palette.success.light,
        '& .MuiButton-label': {
            color: theme.palette.success.main,
        }
    },
    
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
           style={{width:30, height:30,marginTop:17}}
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    )
}
