import React, { useState, useEffect } from "react";
import Input from "../../components/controls/Input";
import Controls from "../../components/controls/Controls";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import RadioGroup2 from "../../components/controls/RadioGroup2";
import { Typography } from "@mui/material";

const paperStyle = { variant:"outlined", padding: 20, height: '75vh', width: 500, margin: "10px auto" }
const paperStyle2 = { variant:"outlined", padding: 20, height: 'auto', width: 'auto', margin: "10px auto" }
const useStyles = makeStyles(theme => ({
  pageContent: {
   
      margin: theme.spacing(2),
      padding: theme.spacing(5),
      color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          
    
  },
  searchInput: {
      width: '80%'
  },
  newButton: {
      position: 'absolute',
      right: '2px'
  }
}))

const roleItems = [
    { id: "A+", title: "A+" },
    { id: "A-", title: "A-" },
    { id: "B+", title: "B+" },
    { id: "B-", title: "B-" },
    { id: "AB+", title: "AB+" },
    { id: "AB-", title: "AB-" },
    { id: "O+", title: "O+" },
    { id: "O-", title: "O-" },
  ];
  
  
  const initialFValues = {
    weight: "",
    age: "",
    bloodGroup:"",
   tattoo:false,
   hiv:false,
   hepatitis:false,
   std:false,
   cardiac:false,
   cancer:false,
  
  };


export const BloodDonor = (props) => {
  const classes = useStyles();
  const { bloodDonData, recordForEdit } = props;
 
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("weight" in fieldValues)
        temp.weight =  fieldValues.weight.length != 0 ? "" : "weight is required.";
        if ("bloodGroup" in fieldValues)
        temp.bloodGroup =  fieldValues.bloodGroup.length != 0 ? "" : "Blood Group is required.";
   
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true, validate);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        bloodDonData(values);
      
    }
   
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);



  return (
    <Box  direction="column" alignItems="center" justifyContent="center" style={{ paddingBottom:"10px"}}>
      <Form onSubmit={handleSubmit}>
    
      <Grid container spacing={0.1}>
                <Grid item xs={6}>
            <Input
            disabled
              name="age"
              label="Age"
              value={values.age}
              onChange={handleInputChange}
           
            />
            </Grid>
           <Grid item xs={6}>
          <Input
              name="weight"
              label="Weight"
              value={values.weight}
              onChange={handleInputChange}
              error={errors.weight}
            />
            </Grid>
           
            <Typography   style={{marginTop:10, textAlign : "center", color:"blue"}}>
            Do You Have Any of the Followings?
            </Typography>
            <Grid item xs={6}>
            <Controls.Checkbox
                        name="tattoo"
                        label="Piercing/Tattooing"
                        value={values.tattoo}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="hiv"
                        label="HIV AID"
                        value={values.hiv}
                        onChange={handleInputChange}
                    />
                      <Controls.Checkbox
                        name="hepatitis"
                        label="Hepatitis B/C"
                        value={values.hepatitis}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Controls.Checkbox
                        name="std"
                        label="STD"
                        value={values.std}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="cardiac"
                        label="Cardiac disease"
                        value={values.cardiac}
                        onChange={handleInputChange}
                    />
                      <Controls.Checkbox
                        name="cancer"
                        label="Cancer"
                        value={values.cancer}
                        onChange={handleInputChange}
                    />
       </Grid>
      
       <Box style={{border:"1px solid #b0bec5", width:"430px"}}>
        <Controls.RadioGroup2
              name="bloodGroup"
              label="Blood Group"
              value={values.bloodGroup}
              onChange={handleInputChange}
              items={roleItems}  
              error={errors.bloodGroup}
             
            />
         
         </Box>
         <div style={{marginTop:5}}>
         {/* <Controls.Button type="submit" text="Confirm" style={{marginRight:5}}/> */}
         </div>
             </Grid>

            

               
      </Form>

      </Box>

    );
  
  };

export default BloodDonor;