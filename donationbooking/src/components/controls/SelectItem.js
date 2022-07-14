import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { TextField, InputBase } from "@mui/material";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  notchedOutline: {
    border:'1px solid #2196F3',
        borderRadius:18,
       
}
}))
export default function SelectItem(props) {
    const classes = useStyles()
    const { name, variant, label, value,error=null, onChange, options } = props;

    return (
        <TextField
        size="medium"
        select
        style={{width:300}}
        variant="outlined"
         label={label}
         name={name}
         value={value}
         onChange={onChange}
         {...(error && {error:true,helperText:error})}
         InputProps={{
                     classes: {
                       notchedOutline: classes.notchedOutline
                     }
                   }}  
        >
                <MenuItem ></MenuItem>
                {
                    options.map(
                       ( item,i) => (<MenuItem key={i} value={item.type_code}  onClick={() => localStorage.setItem("typecd", item.type_code)}>{item.type_name}</MenuItem>)
                    )
                }
                 
            </TextField>

            
        //     {error && <FormHelperText>{error}</FormHelperText>}
        // </FormControl>
    )
}
