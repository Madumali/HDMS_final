import React, { useState, useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { useForm } from "../../components/useForm";
import { Form } from "../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Select as MuiSelect, MenuItem, InputAdornment} from '@mui/material';
import * as systemusers from "../services/systemusers";
import { useStyles } from "../../components/BodyStyles";        
              
  const roleItems = [
    { id: "admin", title: "Admin" },
    { id: "front user", title: "User" },
    { id: "receiver", title: "Receiver" },
    { id: "other", title: "Other" },
  ];
  
  const initialFValues = {
    user_nic: "",
    user_full_name: "",
    user_department: "",
    designation: "",
    user_role: "other",
    username: "",
    user_password: "",
    user_email: "",
    user_contact:"",
    confirmpassword:"",
    changePW:false,
   
  };


export const EditUserForm = (props) => {
  const { addOrEdit, recordForEdit} = props;
  const [response, setResponse] = useState([]);
  const [department, setDepartment] = useState([]);
const [designation, setDesignation] = useState([]);
const [check, setCheck]= useState(false);
  //const required = (value) => (value ? undefined : "Required");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("user_email" in fieldValues)
    {
      const emptyMail = fieldValues.user_email.length;
      const validEmail = /$^|.+@.+..+/.test(fieldValues.user_email);
      if (emptyMail === 0)
      {
        temp.user_email = "Email is required";
      } else if (!validEmail)
      {
        temp.user_email = "Email is not valid";
      } else {
        temp.user_email = "";
      }
    }

    if ("user_nic" in fieldValues)
    {
      const emptyNic = fieldValues.user_nic.length;
      const validNic = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.user_nic);
      if (emptyNic === 0)
      {
        temp.user_nic = "NIC is required."
      } else if (!validNic)
      {
        temp.user_nic = "NIC is not valid.";
      }else {
        temp.user_nic = "";
      }
       
    }

    if ("user_full_name" in fieldValues)
    {
    const emptyName = fieldValues.user_full_name.length;
    const validName = /^[a-zA-Z\s]+(([',. -][a-zA-Z\s])?[a-zA-Z\s])$/.test(fieldValues.user_full_name);
    if (emptyName === 0)
    {
      temp.user_full_name = "Name is required."
    } else if (!validName)
    {
      temp.user_full_name = "Name is not valid.";
    }else {
      temp.user_full_name = "";
    }
  }
      
    if ('user_contact' in fieldValues)
    {
      const emptyCon = fieldValues.user_contact.length;
      const validCon = /^([+]\d{2})?\d{10}$/.test(fieldValues.user_contact);
      if(emptyCon === 0)
      {
        temp.user_contact = "Contact number is required";
      } else if(!validCon)
      {
        temp.user_contact = "Contact number is not valid";
      }else {
        temp.user_contact = "";
      }
     
    }

   
    if ("user_department" in fieldValues)
        temp.user_department =
          fieldValues.user_department.length !== 0 ? "" : "Department is required.";
    
          if ("designation" in fieldValues)
          temp.designation =
            fieldValues.designation.length !== 0 ? "" : "Designation is required.";
    
            if ("username" in fieldValues)
            temp.username =
            fieldValues.username.length !== 0 ? "" : "Username is required.";


            if("changePW" in fieldValues == "1"){
              if ("user_password" in fieldValues)
              {
              const empty = fieldValues.user_password.length;
              const upper = /[A-Z]/.test(fieldValues.user_password);
              const intege = /[0-9]/.test(fieldValues.user_password) ;
              // const notvow =  !/[aeiou]/.test(fieldValues.user_password) ;
              const lenth =  /^[A-Za-z0-9]{7,13}$/.test(fieldValues.user_password);
              if(empty===0){
                temp.user_password = "Password is required"
              }
              else if(!upper)
              {
                temp.user_password = "Password should contain at least one uppercase"
              } else if (!intege)
              {
                temp.user_password = "Password should contain at least one integer"
              } else if(!lenth)
              {
                temp.user_password = "Password should be between range 8-14"
              }else{
                temp.user_password = ""
              }
              if ("confirmpassword" in fieldValues || "user_password" in fieldValues)
              {
          
                const confrm = fieldValues.confirmpassword.length
                if ( confrm > 0)
                {
                  if (fieldValues.confirmpassword !== fieldValues.user_password )
                    {
                  temp.confirmpassword = "Confirm password is not matched";
                    } else {
                      temp.confirmpassword = "";
                    }
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
      console.log("edited", values)
      addOrEdit(values, resetForm);
      
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  
  useEffect(() => {
    getDep();
  }, []);
  const getDep = () => {
    systemusers
      .getDepartments()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const dep = {
            id: key,
            ...data[key],
          };
          dataarray.push(dep);
        }

        setDepartment(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };





  useEffect(() => {
    getDes();
  }, []);
  const getDes = () => {
    systemusers
      .getDesignation()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        // setUserData(arr);
        for (const key in data) {
          const dep = {
            id: key,
            ...data[key],
          };
          dataarray.push(dep);
        }
      
        setDesignation(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };





  return (
    <Box  direction="column" alignItems="center" justifyContent="center" marginTop={3} style={{paddingBottom:"10px"}}>
      <Form onSubmit={handleSubmit}>
       
             <Grid container spacing={1}>
                <Grid item xs={6}>
           <Controls.Input
           type="text"
             name="user_nic"
             label="NIC"
             value={values.user_nic}
             onChange={handleInputChange}
             error={errors.user_nic}
            
           />
        
           <Controls.Input
              type="text"
             label="Full Name"
             name="user_full_name"
             value={values.user_full_name}
             onChange={handleInputChange}
             error={errors.user_full_name}
           
           
           />
      
           <Controls.Input
              type="text"
             label="Email"
             name="user_email"
             value={values.user_email}
             onChange={handleInputChange}
             error={errors.user_email}
          
           />
        
           <Controls.Input
             label="Contact"
             name="user_contact"
             value={values.user_contact}
             onChange={handleInputChange}
             error={errors.user_contact}
          
           />
      
       <Controls.Input
              select
              name="user_department"
              label="Department"
              value={values.user_department}
              onChange={handleInputChange}
              error={errors.user_department} 
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  department.map((item ,i)=> (
                   <MenuItem key = {i}   value={item.dep_id} >{item.dep_name}</MenuItem>))
                    
                }
            </Controls.Input> 
         
                  
                    <Controls.Input
              select
              label="Designation"
              name="designation"
              value={values.designation}
              onChange={handleInputChange}
              error={errors.designation}
           
              
                
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  designation.map((item,i) => (
                   <MenuItem key = {i}   value={item.desig_id} >{item.desig_name}</MenuItem>))
                    
                }
            </Controls.Input> 
        
      </Grid>
                <Grid item xs={6}>
     
          <Controls.RadioGroup2
              name="user_role"
              label="Role"
              value={values.user_role}
              onChange={handleInputChange}
              items={roleItems}  
             
            />
            
            {check ? (
                <>
            <Controls.Input
        
              name="username"
              label="Username"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
            />
         
            <Controls.Input
        
              name="user_password"
              label="Password"
              type="password"
              value={values.user_password}
              onChange={handleInputChange}
              error={errors.user_password}
            
            />
         
            <Controls.Input
     
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              value={values.confirmpassword}
              onChange={handleInputChange}
              error={errors.confirmpassword}
            />
            </>
            ):  (     <>
            <Controls.Input
            disabled
              name="username"
              label="Username"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
            />
         
            <Controls.Input
                disabled
              name="user_password"
              label="Password"
              type="password"
              value={values.user_password}
              onChange={handleInputChange}
           
            
            />
            </>)}
         <Controls.Checkbox
                      name="changePW"
                      label="Wanna Change Password?"
                      value={values.changePW || ""}
                      onChange={(e) => {
                        setCheck(!check);
                        handleInputChange(e);
                      }}
                    />

         <div style={{marginLeft:9, marginTop:15}}>
        <Controls.Button type="submit" text="Submit" style={{marginRight:5}} />
              <Controls.Button
                text="Reset"
                color='default'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              />
              </div>
           </Grid>
           </Grid>


      </Form>
     </Box>
    );
  
  };

export default EditUserForm;

