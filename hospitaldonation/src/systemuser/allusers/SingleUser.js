import  React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/controls/Input";
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
    confirmpassword: "",
    user_email: "",
    user_contact:"",
   
  };




const SingleUser = (props) => {
    
    let { id }  = useParams();
  
    const { addOrEdit, recordForEdit} = props;
    const [response, setResponse] = useState([]);
    const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [userData, setUserData] = useState([]);
const[nic,setnic] = useState("")
    const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ('user_nic' in fieldValues)
          temp.user_nic = fieldValues.user_nic ? "" : "NIC is required."
      if ("user_email" in fieldValues)
        temp.user_email = /$^|.+@.+..+/.test(fieldValues.user_email)
          ? ""
          : "Email is not valid.";
  
      if ("user_nic" in fieldValues)
        temp.user_nic = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.user_nic)
          ? "": "NIC is not valid.";
      if ('user_contact' in fieldValues)
          temp.user_contact = /^([+]\d{2})?\d{10}$/.test(fieldValues.user_contact)
          ? ""
          : "Contact No is not valid." ;
  
      if ("username" in fieldValues)
        temp.username =
          fieldValues.username.length != 0 ? "" : "Username is required.";
  
      if ("user_department" in fieldValues)
          temp.user_department =
            fieldValues.user_department.length != 0 ? "" : "Department is required.";
      
            if ("designation" in fieldValues)
            temp.designation =
              fieldValues.designation.length != 0 ? "" : "Designation is required.";
  
      if ("user_password" in fieldValues)
        temp.user_password = fieldValues.user_password ? "": "Password is required.";
        temp.confirmpassword = (fieldValues.confirmpassword == fieldValues.user_password ) ? "" : "Passwords don't match."
          if ("confirmpassword" in fieldValues){
        temp.confirmpassword = fieldValues.confirmpassword ? "": "Confirm Password is required.";
       
          }
     
      setErrors({
        ...temp,
      });
  
      if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };
  
    const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
    useForm(initialFValues, true, validate);

   
console.log("pppppp", id)
   const getAll = ()=> {
    console.log("param",id);
            const token = localStorage.getItem("authToken");
            fetch("http://localhost:4000/system-user/list/"+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     'Authorization': "Bearer " + token,
    
                },
            })
            .then((response) => {
               console.log("ffff",response)
              return response.json()})
            .then(data => {
              console.log("single user",data)
               
                  const dataarray = [];
                  // setUserData(arr);
                  for (const key in data){
                      const user = {
                          id:key,
                          ...data[key]
                      };
                      dataarray.push(user);
                    }
                    setUserData(data);
                    setValues({
                      ...userData
                    })
                              })
            .catch((error) => {
              console.error("Error:", error);
            });
   }
      
        useEffect(() => {
          getAll()
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        addOrEdit(values, resetForm);
        
      }
    };
  


    return (
      <Box  direction="column" alignItems="center" justifyContent="center" marginTop={3} style={{paddingBottom:"10px"}}>
    {/* {userData.map((item,i) => {
     return ( */}
     {/* <input defaultValue={userData.user_full_name}/> */}
       
     
    
      <Form onSubmit={handleSubmit}>
    <Grid container spacing={1}>
                <Grid item xs={6}>           
  <Controls.Input
  type="text"
    name="user_nic"
    label="NIC"
    // defaultValue = {userData.user_nic}
    value={userData.user_nic}
  onChange={(e)=>setnic(e.target.value)}
    // error={errors.user_nic}
   
  />
           <Controls.Input
              type="text"
             label="Full Name"
             name="user_full_name"
             value= {userData.user_full_name}
             onChange={handleInputChange}
           
           
           />
      
        
           <Controls.Input
              type="text"
             label="Email"
             name="user_email"
             value={userData.user_email}
             onChange={handleInputChange}
             error={errors.user_email}
          
           />
        
           <Controls.Input
             label="Contact"
             name="user_contact"
             value={userData.user_contact}
             onChange={handleInputChange}
             error={errors.user_contact}
          
           />
      
       <Controls.Input
              select
              name="user_department"
              label="Department"
              value={userData.user_department}
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
              value={userData.designation }
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
              value={userData.user_role }
              onChange={handleInputChange}
              items={roleItems}  
             
            />
            
         
            <Input
         
              name="username"
              label="Username"
              value={userData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
         
            <Input
          
              name="user_password"
              label="Password"
              type="password"
              value={userData.user_password}
              onChange={handleInputChange}
              error={errors.user_password}
            
            />
         
            <Controls.Input
           
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              value={userData.confirmpassword }
              onChange={handleInputChange}
              error={errors.confirmpassword}

            />
         
         <div style={{marginLeft:9, marginTop:15}}>
        <Controls.Button type="submit" text="Submit" style={{marginRight:5}} />
              <Controls.Button
                text="Reset"
                color='warning'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              />
              </div>
           </Grid>
           </Grid>
             
      </Form>
     {/* )})} */}
     </Box>
    );

};

export default SingleUser;

// 