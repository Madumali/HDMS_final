import React from 'react'
import { Button as MuiButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    },
    error: {
        backgroundColor: theme.palette.error.light,
        '& .MuiButton-label': {
            color: theme.palette.error.main,
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

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "small"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}
