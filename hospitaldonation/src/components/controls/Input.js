import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';  



export default function Input(props) {

  const { name, label, value,error=null,type, onChange,variant,size,placeholder,defaultValue, ...other } = props;

  const [passwordeye, setPasswordEye] = useState(false);
  const handlePasswordClick = ()=> {
    setPasswordEye(!passwordeye)
  }
  


  return (
      <TextField
          label={label}
          type={passwordeye ? "text": type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          // defaultValue={defaultValue}
          {...other}
          {...(error && {error:true,helperText:error})}
          InputProps={{
           
            endAdornment:
            type === "password" ? (
            <InputAdornment position="end">
             {passwordeye === false ? (<VisibilityOffIcon  onClick = {handlePasswordClick}/>) : (<RemoveRedEyeIcon onClick = {handlePasswordClick}/>) } 
            </InputAdornment>
          ): null
            }}
            inputProps={{
              // style: {textTransform: "uppercase"},
            }}
            variant ="outlined"
      />
  )
}

