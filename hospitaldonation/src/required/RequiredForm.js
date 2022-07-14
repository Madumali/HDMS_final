import React, { useState, useEffect } from "react";

// import Input from "../components/controls/Input";
import Controls from "../components/controls/Controls";

import { useFormt } from "../components/useFormt";
import { Form } from "../components/useForm";
// import * as employeeService from "../../services/employeeService";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Popup from "../components/Popup";
// import { makeStyles } from "@material-ui/core";
import ItemSelectFields2 from "../components/ItemSelectFields2";
import { DataSaverOnTwoTone } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
// import { Paper } from "@material-ui/core";
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import RemoveIcon from '@material-ui/icons/Remove';
// import {useHistory} from "react-router-dom";
import * as systemusers from "../systemuser/services/systemusers";
import { Select as MuiSelect, MenuItem } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useStyles } from "../components/BodyStyles";
import { Typography } from "@material-ui/core";


// const initialFValuesd = {
//   id:uuidv4(),
//   added_by:"",
//   item_description: "",
//   item_name: "",
//   item_qty: "",
//   type_code: ""
// };

  const initialFValues = {
   request:uuidv4(),
    user_department:"",
    designation:"",
   
  };
  const initialFValuest = {
    // id:uuidv4(),
    //   added_by:"",
    //   item_description: "",
    //   item_name: "",
    //   item_qty: "",
    //   type_code: ""
  };






const RequiredForm = (props) => {

  const { addOrEditR, recordForEdit} = props;
  const [roleItems, setItemsData] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [nameselected, setNameSelecte ]= useState("");
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
const [response, setResponse] = useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("user_department" in fieldValues)
    temp.user_department =
      fieldValues.user_department ? "" : "Department is required.";

      if ("designation" in fieldValues)
      temp.designation =
        fieldValues.designation ? "" : "Designation is required.";
   
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {values, setValues,inputFields, setInputFields, inputFieldsd, setInputFieldsd, errors,handleChangeInputd,  handleInputChange,  setErrors } =
    useFormt( initialFValues,initialFValuest, true, validate);

  const alldata = {
    ...values,
    inputFieldsd
  }
    
  const handleSubmitrequest = (e) => {
    console.log("VALUES REQUEST", values)
    e.preventDefault();
    if (validate()) {
     
      addOrEditR(alldata, resetFormt);
      
     
    }
    
  };




useEffect(()=>{
  getCategory();
}, []);

const getCategory = () => {
 
    const token = localStorage.getItem('authToken');
    fetch("http://localhost:4000/category/",
    {
      method: "GET",
      headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.json()
     
    })
        .then(data => {
           const dataarray = [];
           for (const key in data){
               const category = {
                   id:key,
                   ...data[key]
               };
               dataarray.push(category);
           }
            setItemsData(dataarray);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
}



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

const resetFormt = () => {
  setInputFieldsd([]);
  setValues(initialFValues);
 
}

let sessionUser = localStorage.getItem("name");
const addDataTableR = (dataset) => {

inputFieldsd.push(...dataset)
setOpenPopup(false);
}


  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  

  

const handleRemoveFields = id => {
  const values  = [...inputFieldsd];
  values.splice(values.findIndex(value => value.id === id), 1);
  setInputFieldsd(values);
}



  return (
    <Box  direction="column" alignItems="center" marginTop={3} marginLeft={5} justifyContent="center" style={{ paddingBottom:"10px"}}>
      <Form onSubmit={handleSubmitrequest}>
    

          <Grid container spacing={1} >
          <Grid item xs={12}  >
          <Controls.Input
              select
              name="user_department"
              label="Department"
              value={values.user_department || ''}
              onChange={handleInputChange}
              error={errors.user_department}
          
              
                
                >
           
            <MenuItem defaultValue = "">None</MenuItem>
                {
                  department.map(item => (
                   <MenuItem key = {item.dep_id}   value={item.dep_id} >{item.dep_name}</MenuItem>))
                    
                }
            </Controls.Input> 
                      
         
              <Controls.Input
              select
              label="Designation"
              name="designation"
              value={values.designation || ''}
              onChange={handleInputChange}
              error={errors.designation}
    
                >
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  designation.map(item => (
                   <MenuItem key = {item.desig_id}   value={item.desig_id} >{item.desig_name}</MenuItem>))
                    
                }
            </Controls.Input> 
           
          <Controls.RadioGroup
              name="type_code"
              label="Select Items"
              value={values.type_code}
              // onChange={handleInputChange}
              items={roleItems}  
              onChange={(e) => {setOpenPopup(true); setNameSelecte(e.target.value)}} 
      
            />
        </Grid>
         <Controls.Input   value={values.enteredby = sessionUser}  style={{display: "none"}}/> 
         <Controls.Input   value={values.department = values.user_department}  style={{display: "none"}}/>
         <Controls.Input value={values.designation = values.designation}  style={{display: "none"}}/>
    
            <Grid item xs={12} sm={12} md={12} style={{ marginBottom:"20px"}}>
         
          {inputFieldsd.map(items => (<div key= {items.id}>  <Controls.Input   value={items.type_code}  style={{display: "none"}}/>  <Controls.Input  value={items.item_name}  size = "small" style={{width:120}}/> <Controls.Input type="number" required name = "item_qty"  size = "small" style={{width:60}}  value={items.item_qty}  onChange={event => handleChangeInputd(items.id, event)}/> 
          <Controls.ActionButton
          // style={{pading:60}}
                          color="error"
                          disabled={items.length === 1} onClick={() => handleRemoveFields(items.id)}>
         
            <IndeterminateCheckBoxIcon style={{width:30, height:30}} />
           </Controls.ActionButton></div>),
   
          )}
         

          
            </Grid>

       
<Grid marginLeft={1}>
<Controls.Button type="submit" text="Submit" style={{marginRight:5}}/>
              <Controls.Button
                text="Reset"
                color='default'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetFormt}
              />
              </Grid>
  </Grid>    
  <Box border={"1px solid lightBlue"}  direction="column" alignItems="center" justifyContent="center" padding={1} marginTop={3}>
<Typography>
 
  SC - Surgical Consumable
  SI - Surgical Items
  CI - Consumable Items
  DR - Drugs
  GI - General Items
  FD - Foods
  ML - Meal 
  SP - Soup

 
</Typography>

</Box>
            
             
      </Form>
      
<Popup
  title = {nameselected}
  openPopup={openPopup}
  setOpenPopup={setOpenPopup}
  style={{width:250}}
>

  <ItemSelectFields2
  addDataTableR = {addDataTableR}
  />        
 </Popup>

          
</Box>
    );
}

export default RequiredForm;