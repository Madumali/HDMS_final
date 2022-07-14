import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@material-ui/core'
import Controls from "./controls/Controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { makeStyles } from '@material-ui/core';
// import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: theme.spacing(3),
        width:300,
        height:300
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        background: theme.palette.error.light,
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '4.5rem',
        },
        
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }} >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon  />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                size="small"
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
               
                size="small"
                    text="Yes"
                    // color = "#f44336"
                    style = {{backgroundColor:"#f44336"}}
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}