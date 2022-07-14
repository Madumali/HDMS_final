import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/material/Grid";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import Input from "../../components/controls/Input";

import {
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
  } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0.5),
      },
    },
    button: {
      margin: theme.spacing(0.2),
    }
  }))


const initialFValues = {
    id: uuidv4(),
    donor_name: "",
    national_idt: "",
   membername:"",
    address_line1t: "",
    address_line2t: "",
    contact_not: "",
    emailt: "",
    reg_datet:Date(),
  
   
  
  };
  

const EditMember = (props)=>{
    const classes = useStyles();
    const { addOrEditTM, recordForEditT } = props;
   


    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        
    
        if ("national_idt" in fieldValues)
        temp.national_idt = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.national_idt)
          ? ""
          : "NIC is not valid.";

    if ("emailt" in fieldValues)
      temp.emailt = /$^|.+@.+..+/.test(fieldValues.emailt)
        ? ""
        : "Email is not valid.";


      
    if ('contact_not' in fieldValues)
    temp.contact_not = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_not)
    ? ""
    : "Contact No is not valid.";
    
       
    
        setErrors({
          ...temp,
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
      };
      const {values, setValues, errors, handleInputChange,  setErrors, resetForm } =
      useForm( initialFValues, true, validate);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("datateam", values);
        // console.log("InputFields", inputFields);
        if (validate()) {
          // addOrEditP(values, resetForm);
          addOrEditTM(values, resetForm);
        }
      };

 useEffect(() => {
      if (recordForEditT != null)
      setValues({
          ...recordForEditT,
        });
    }, [recordForEditT]);





    return(
        <Form className={classes.root} onSubmit={handleSubmit}>
        <Input
        // type="hidden"  
        // readOnly
         name="donor_name"
         style={{display:"none"}}
         value={values.donor_name}
         onChange={handleInputChange}
        /> 
         <Input
          name="national_idt"
          label="NIC"
          // variant="filled"
          style={{width:173}}
          value={values.national_idt}
          onChange={handleInputChange}
          // error={errors.national_id}
        /> 
       
         <Input
          name="membername"
          label="Member Name"
          style={{width:173}}
          value={values.membername}
          onChange={handleInputChange}
        /> 
        
         <Input
          name="address_line1t"
          label="Address Line1"
          style={{width:173}}
          value={values.address_line1t}
          onChange={handleInputChange}
        /> 
        
        <Input
          name="address_line2t"
          label="Address Line2"
          style={{width:173}}
          value={values.address_line2t}
          onChange={handleInputChange}
        /> 
         
         <Input
          name="contact_not"
          label="Contact"
          style={{width:173}}
          value={values.contact_not}
          onChange={handleInputChange}
          error={errors.contact_not}
        /> 
       
         <Input
          name="emailt"
          label="Email"
          style={{width:173}}
          value={values.emailt}
          onChange={handleInputChange}
          error={errors.emailt}
        /> 

<Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
        </Form>
    );
}
export default EditMember;