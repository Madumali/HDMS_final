import React, {useState, useEffect} from "react";
import Input from "../components/controls/Input";
import Controls from "../components/controls/Controls";

import { useForm } from "../components/useForm";
import { Form } from "../components/useForm";
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";

// const paperStyle = { variant:"outlined", padding: 20, height: '75vh', width: 500, margin: "10px auto" }
// const paperStyle2 = { variant:"outlined", padding: 20, height: 'auto', width: 'auto', margin: "10px auto" }
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
  },
}))


const initialFValues = {
  code: "",
  itemname: ""
};



const AddItemForm = (props)=> {

    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props;
    const [openPopup, setOpenPopup] = useState(false)
    const [showCurrent,setShowCurrent] = useState(false);
    const [record, setData] = useState([]);
    const [categoryData, setCategoryData ] = useState([]);
    const [response, setResponse] = useState([]);
    const [countid, setCount] = useState([]);
    const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ("code" in fieldValues)
          temp.code = fieldValues.code? "" : "Code is required.";
          if ("itemname" in fieldValues)
          temp.itemname = fieldValues.itemname?"" : "Name is required.";
     
      setErrors({
        ...temp,
      });
  
      if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };
  
    const { values, setValues, errors, handleInputChange, setErrors, resetForm } =
    useForm( initialFValues,true, validate);
  
    const onClickbtn =()=>{
      setOpenPopup(true)
    }
      
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("itemValues", values);
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

const category = localStorage.getItem("typecd");


useEffect(()=>{
  getCategory();

}, []);
useEffect(()=>{
 
 getCount();
}, []);
 const getCategory = () => {
     
        const token = localStorage.getItem('authToken');
        // console.log(token, 'token');
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
          // console.log(response)
          return response.json()
         
        })
            
            .then(data => {
              //  console.log(data);
               const dataarray = [];
               // setUserData(arr);
               for (const key in data){
                   const category = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(category);
               }
              //  console.log(dataarray);
              //  JSON.parse(arr);
                setCategoryData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    }

    const getCount = () => {
     
      const token = localStorage.getItem('authToken');
      fetch("http://localhost:4000/items/count/",
      {
        method: "GET",
        headers:  {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      })
      .then((response) => {
        // console.log(response)
        return response.json()
       
      }) .then(data => {
        
            const dataarray = [];
            for (const key in data){
                const category = {
                    id:key,
                    ...data[key]
                };
                dataarray.push(category.recCount);
                console.log("COUNT DATA",dataarray);
              
            }
            setCount(dataarray);
            localStorage.setItem('cnt',countid.recCount);
            })
            .catch((error) => {
              console.error('Error:', error);
            })
  }
  const num1 = parseInt(countid);
  const num2 = 1;
  let cnt;
  const tot = num1+num2;
  const front = '000';
  cnt = front + tot;
  // if(tot <=8)
  // {
  //   const front = '000';
  //   return cnt = front + tot;
  // } else if (tot <= 98)
  // {
  //   const front = '00';
  //   return cnt = front + tot;
  // }
 
 
    return (
        <Box  direction="column" alignItems="center" justifyContent="center" style={{paddingBottom:"10px"}}>
         <Form onSubmit={handleSubmit}>
 
         <Grid container spacing={1}>
                <Grid item xs={12}>
        <Controls.SelectItem
                 name="type_cd"
                 label="Item Category"
                 value={values.type_cd || ''}
                 options={categoryData}
                 onChange={ handleInputChange}
                 style={{width:370}}
             >
          
               </Controls.SelectItem>
         {/* <Input
           name="type_cd"
           label="Item Category"
           value={values.type_cd  }
           onChange={handleInputChange}
          //  error={errors.code}
           style={{width:370}}
         /> */}
      
         
            <Input
              disabled
              name="code"
              label="Item Code"
              value={values.code = cnt }
              onChange={handleInputChange}
              error={errors.code}
            
            />
          
          <Input
              name="itemname"
              label="Item Name"
              value={values.itemname}
              onChange={handleInputChange}
              error={errors.itemname}
            />
          </Grid>
        
         
              
       
            
        </Grid>
        <Grid marginLeft={1} marginBottom={5} marginTop={2}> 
                 <Controls.Button type="submit" text="Submit" onClick = {onClickbtn} style={{marginRight:5}}/>
              <Controls.Button
                text="Reset"
                color='default'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              /> </Grid>
          
              {/* </Box> */}

               
      </Form>
</Box>
    );
}

export default AddItemForm;