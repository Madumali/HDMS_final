import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { TextField, InputBase } from "@mui/material";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  notchedOutline: {
    border:'1px solid #2196F3',
        borderRadius:10,
       
}
}))

export default function Select(props) {
    const classes = useStyles()
    const history = useHistory();
    const { name, variant, label, value,error=null, onChange, options } = props;

    return (
    //     <FormControl variant={variant} size = "large"  InputProps={{
    //         classes: {
    //           notchedOutline: classes.notchedOutline
    //         }
    //       }}  
    //     {...(error && {error:true})}
    //    >
    //         <InputLabel>{label}</InputLabel>
            <TextField
               select
               size="medium"
               style={{width:400}}
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
                <MenuItem onClick={()=> {
          localStorage.setItem('donor', '');
        
          } }> Select</MenuItem>
                {
                    options.map(
                        (item,i) => (<MenuItem key={i} value={item.donor_id} onClick={() => localStorage.setItem("donor", item.donor_id)} >{item.donor_name}</MenuItem>)
                    )
                }
                 
            </TextField>

           
            // {/* {error && <FormHelperText>{error}</FormHelperText>} */}
        // {/* </FormControl> */}
    )
}
