import React, { useState, useEffect } from "react";
import Input from "../../../../components/controls/Input";
import Controls from "../../../../components/controls/Controls";
import { useForm } from "../../../../components/useForm";
import { Form } from "../../../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../../../components/BodyStyles";
import { validate } from "@material-ui/pickers";


  const idnm = [
    { id: "ML", title: "Meal Donation", code: "ML0001" },
    { id: "SP", title: "Soup Donattion", code: "SP0001" },
   
  ];
  
  const initialFValues = {
    
    reserved_date: new Date(),
    morning:false,
    evening:false,
    item_name:"",
    temp_donor:"",
    idnm:""
   
  };


export const BookingDonor = (props) => {

  const { addOrEdit, recordForEdit} = props;
  const [meal, setMeal] = useState();
  const [cdname, setCdname] = useState();
const [allcheck, setallcheck] = useState(false);


  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true,validate);

 
    
  const handleSubmit = (e) => {
    e.preventDefault();
      addOrEdit(values, resetForm);
  
  
  };

  const Check = (props) => {
    const  { value, name, label, onChange } = props
    return (
      <div>
        
        <Controls.Checkbox 
     name={name}
     label={label}
     value={value}
     onChange={onChange}
     />
  
      </div>
    );
  }





  
 const selectform = (val) => {
   if(val == "ML")
   {
     setMeal("ML0001");
     setCdname("ML");
     setallcheck(false)
   } else if (val == "SP")
   {
    setMeal("SP0001");
    setCdname("SP");
     setallcheck(true)
   }
 }
  
const sessionDonor = localStorage.getItem("donorname");


  return (
    <Box 
    direction="column"
    alignItems="center"
    justifyContent="center">
 

      <Form onSubmit={handleSubmit}>
      <Grid container spacing={1} >
    
<Grid item xs={12} md={12} >

         <Controls.RadioGroup2
              name="idnm"
              label="Select Your Donation"
              value={values.idnm || ""}
              onChange={(e)=>{selectform(e.target.value);handleInputChange(e);}}
              items={idnm}  
              
            />
           </Grid>
           
{allcheck &&
  <Grid item xs={12}  md={12}>
  <Check 
   name="morning"
     label="Morning"
     value={values.morning}
     onChange={handleInputChange}
/>
<Check 
   name="evening"
     label="Evening"
     value={values.evening}
     onChange={handleInputChange}
/>
</Grid>
}
   
         <Grid item xs={12} md={6}>
         <Controls.DatePicker
                        name="reserved_date"
                        label="Select Date"
                        value={values.reserved_date}
                        onChange={handleInputChange}
                        // error={errors.reserved_date}
                    />
           
         </Grid>
        
       
            <Controls.Input
            name="item_name"
            style={{display:"none"}}
            value={values.item_name = meal}
            />
  

<Controls.Input   value={values.temp_donor = sessionDonor}  style={{display: "none"}}/>

    
        
        {/* </Box> */}
        <Grid item xs={12}  md={12} >   
        <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
              <Controls.Button
                text="Reset"
                style = {{backgroundColor:"#ECEFF1"}}
                color='default'
                onClick={resetForm}
              />
              </Grid>
            
         
</Grid>

</Form>
     
     </Box>
    );
  
  };

export default BookingDonor;

