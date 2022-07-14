import React, { useState, useEffect } from "react";
import Input from "../../../../components/controls/Input";
import Controls from "../../../../components/controls/Controls";
import { useForm } from "../../../../components/useForm";
import { Form } from "../../../../components/useForm";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Select as MuiSelect, MenuItem, InputAdornment} from '@mui/material';
import { useStyles } from "../../../../components/BodyStyles";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';         
import * as bookingServices from "../../../bookservice/bookingServices";     
import { Checkbox } from "@mui/material";

  const roleItems = [
    { id: "ML", title: "Meal Donation", code: "ML0001" },
    { id: "SP", title: "Soup Donattion", code: "SP0001" },
   
  ];
  
  const initialFValues = {
    id:"ML",
    reserved_date: new Date(),
    morning:false,
    evening:false,
    code:"",
    temp_donor:""
    // user_role: "",
    // username: "",:""
    // user_password: "",
    // confirmpassword: "",
    // user_email: "",
    // user_contact:"",
   
  };


export const BookingDonor = (props) => {
  const classes = useStyles();
  const { addOrEdit, recordForEdit} = props;
  const [response, setResponse] = useState([]);
  const [meal, setMeal] = useState();
const [allcheck, setallcheck] = useState(false);
  //const required = (value) => (value ? undefined : "Required");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
   
    if ("user_email" in fieldValues)
      temp.user_email = /$^|.+@.+..+/.test(fieldValues.user_email)
        ? ""
        : "Email is not valid.";

        if ("reserved_date" in fieldValues)
        temp.reserved_date = fieldValues.reserved_date.length !=0 
          ? ""
          : "Date is Required.";



    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  // (fieldValues.confirmpassword === fieldValues.user_password)
  const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
  useForm(initialFValues, true, validate);

 
    
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("checked", values);
    if (validate()) {
      addOrEdit(values, resetForm);
      
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);




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
     setallcheck(false)
   } else if (val == "SP")
   {
    setMeal("SP0001");
     setallcheck(true)
   }
 }
  
const sessionDonor = localStorage.getItem("donorname");


  return (
    <Box  style={{border:"1px solid #ffffff", padding:"0px auto", margin:"0px auto"}} >
      <Form onSubmit={handleSubmit}>
      
     <Grid container spacing={1} >

<Grid item xs={12} md={12} >

         <Controls.RadioGroup2
              name="id"
              label="Select Your Donation"
              value={values.id || ""}
              onChange={(e)=>{selectform(e.target.value);handleInputChange(e);}}
              items={roleItems}  
              // style={{width:500}}
            />
           </Grid>
         <Grid item xs={6} md={6}>
         <Controls.DatePicker
                        name="reserved_date"
                        label="Select Date"
                        value={values.reserved_date}
                        onChange={handleInputChange}
                        error={errors.reserved_date}
                    />
           
         </Grid>
        
       
            <Controls.Input
            name="code"
            style={{display:"none"}}
            value={values.code = meal}
            // onChange={handleInputChange}
            />


<Controls.Input   value={values.temp_donor = sessionDonor}  style={{display: "none"}}/>


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
       
        
        {/* </Box> */}
        <Grid item xs={12}  md={12} >   
        <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
              <Controls.Button
                text="Reset"
                color="warning"
                onClick={resetForm}
              />
              </Grid>
           
</Grid>


      </Form>
     </Box>
    );
  
  };

export default BookingDonor;

