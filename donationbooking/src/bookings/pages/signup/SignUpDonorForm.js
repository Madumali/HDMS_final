import React, { useState, useEffect } from "react";
import Input from "../../../components/controls/Input";
import Controls from "../../../components/controls/Controls";
import { useForm } from "../../../components/useForm";
import { Form } from "../../../components/useForm";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../../components/BodyStyles";


const roleItems = [
  { id: "THERO", title: "Thero." },
  { id: "REV", title: "Rev." },
  { id: "MR", title: "Mr." },
  { id: "MRS", title: "Mrs." },
  { id: "MS", title: "Ms." },
  { id: "DR", title: "Dr." },
  { id: "PROF", title: "Prof." },
];
const initialFValues = {
  title:"",
    national_id: "",
    donor_name: "",
    contact_no: "",
    donor_password:"",
    email: "",
    cpassword:""
  };

const SignUpDonorForm = (props) => {
    const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;
 
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("donor_name" in fieldValues)
    {
      const emptyNm = fieldValues.donor_name.length;
      const validNm = /^[a-zA-Z\s]+(([',. -][a-zA-Z\s])?[a-zA-Z\s])$/.test(fieldValues.donor_name);
      if(emptyNm === 0)
      {
        temp.donor_name = "Donor name is required";
      } else if (!validNm)
      {
        temp.donor_name = "Name is not valid.";
      }else {
        temp.donor_name = "";
      }
    }
    if ("national_id" in fieldValues)
   {
      var emptyNic = fieldValues.national_id.length;
      const validnic =  /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.national_id)
      if (emptyNic === 0)
      {
        temp.national_id = "NIC is required."
      }
        
      else if (!validnic)
      {
        temp.national_id = "NIC is not valid.";
      }
        
      else {
        temp.national_id = "";
      }
     
   }
    
        if ("email" in fieldValues)
        {
          const emptyMail = fieldValues.email.length;
          const validEmail = /$^|.+@.+..+/.test(fieldValues.email);
          if (emptyMail === 0)
          {
            temp.email = "Email is required";
          } else if (!validEmail)
          {
            temp.email = "Email is not valid";
          } else {
            temp.email = "";
          }
        }
       
      
    if ("contact_no" in fieldValues)
    {
      const emptyCon = fieldValues.contact_no.length;
      const validCon = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no);
      if(emptyCon === 0)
      {
        temp.contact_no = "Contact number is required";
      } else if(!validCon)
      {
        temp.contact_no = "Contact number is not valid";
      }else {
        temp.contact_no = "";
      }
     
    }
      
    if ("donor_password" in fieldValues)
    {
    const empty = fieldValues.donor_password.length;
    const upper = /[A-Z]/.test(fieldValues.donor_password);
    const intege = /[0-9]/.test(fieldValues.donor_password) ;
    // const notvow =  !/[aeiou]/.test(fieldValues.user_password) ;
    const lenth =  /^[A-Za-z0-9]{7,13}$/.test(fieldValues.donor_password);
    if(empty===0){
      temp.donor_password = "Password is required"
    }
    else if(!upper)
    {
      temp.donor_password = "Password should contain at least one uppercase"
    } else if (!intege)
    {
      temp.donor_password = "Password should contain at least one integer"
    } else if(!lenth)
    {
      temp.donor_password = "Password should be between range 8-14"
    }else{
      temp.donor_password = ""
    }
    if ("cpassword" in fieldValues || "donor_password" in fieldValues)
    {

      const confrm = fieldValues.cpassword.length
      if ( confrm > 0)
      {
        if (fieldValues.cpassword !== fieldValues.donor_password )
          {
        temp.cpassword = "Confirm password is not matched";
          } else {
            temp.cpassword = "";
          }
      }
    }
    }
   
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
      console.log("donors",values)
      addOrEdit(values, resetForm);
      
    }
   
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);



    return( <Form onSubmit={handleSubmit}>
      
     
           <Grid container spacing={0}>
           <Grid  item  xs={12} md={12}>
             <Controls.RadioGroup2
              name="title"
              label="Title"
              value={values.title}
              onChange={handleInputChange}
              items={roleItems}  
             
            />
            </Grid>
             <Grid  item  xs={12} md={12}>
            
               <Input
               fullWidth
               variant="filled"
                 name="national_id"
                 label="NIC"
                 value={values.national_id}
                 onChange={handleInputChange}
                 error={errors.national_id}
                
               />
             </Grid>
           
   
             <Grid  item  xs={12} md={12}>
             <Input
             variant="filled"
                 name="donor_name"
                 label="Name"
                 value={values.donor_name}
                 onChange={handleInputChange}
                 error={errors.donor_name}
               />
             </Grid>
           
             {/* <Grid>
               <Input
                 name="address_line1"
                 label="Address Line1"
                 value={values.address_line1}
                 onChange={handleInputChange}
                 style={{width:400}}
                 // error={errors.username}
               />
             </Grid>
            
             <Grid>
             <Input
                           name="address_line2"
                           label="Address Line2"
                           value={values.address_line2}
                           onChange={handleInputChange}
                           style={{width:400}}
                           // options={}
                           // error={errors.user_department}
                       />
                       </Grid>
                   */}
   
             
                <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
                 name="contact_no"
                 label="Contact"
                maxLength={10}
                 value={values.contact_no}
                 onChange={handleInputChange}
                 error={errors.contact_no}
                 
               />
             </Grid>
           
           
             
             <Grid item  xs={12} md={12}>
               <Controls.Input
               variant="filled"
                 name="email"
                 label="Email"
                 type="email"
                 value={values.email}
                 onChange={handleInputChange}
                 error={errors.email}
                 
           
               />
             </Grid>
             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Password"
                 name="donor_password"
                 value={values.donor_password}
                 onChange={handleInputChange}
                 error={errors.donor_password}
                 
               />
             </Grid>

             <Grid item  xs={12} md={12}>
               <Input
               variant="filled"
               type="password"
                 label="Confirm Password"
                 name="cpassword"
                 value={values.cpassword}
                 onChange={handleInputChange}
                 error={errors.cpassword}
                 
               />
             </Grid>
             <Grid item  xs={12} md={12}>
             <Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
                 <Controls.Button
                   text="Reset"
                   color="default"
                   onClick={resetForm}
                 />
                    </Grid>
           </Grid>
         
              
             
  
   
                  
         </Form>
   );

}
export default SignUpDonorForm;