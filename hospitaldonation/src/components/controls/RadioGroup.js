import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';

export default function RadioGroup(props) {
 
    const { name, label, value,error=null, onChange, onClick, items, size } = props;

    return (
        <FormControl
        {...(error && {error:true})}>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
            size={size || "small"}
                name={name}
                value={value}
                onChange={onChange}
                onClick={onClick}>
                {
                    items.map(
                        (item,i) => (
                            <FormControlLabel key={i} value={item.type_code} control={<Radio />} label={item.type_code}  onClick={() => localStorage.setItem("codeid", item.type_code)}/>
                        )
                    )
                  
                }
                 
                
            </MuiRadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
