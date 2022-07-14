import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function RadioGroup2(props) {
   
    const { name, label, value, onChange, onClick, items, size } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
            size="small"
                name={name}
                value={value}
                onChange={onChange}
                onClick={onClick}>
                {
                    items.map(
                        (item,i) => (
                            <FormControlLabel key={i} value={item.id} control={<Radio />} label={item.title}  onClick={() => localStorage.setItem("codeid2", item.id)}/>
                        )
                    )
                  
                }
                 
                
            </MuiRadioGroup>
        </FormControl>
    )
}
