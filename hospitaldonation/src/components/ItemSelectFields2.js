import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import {  Select as MuiSelect, MenuItem } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';



const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0.5),
      },
    },
    button: {
      margin: theme.spacing(0.2),
    },
    input: {
      width:100
    },
    formcontrol: {
      minWidth:200
    }

  }))
  const styles = {
    container : base => ({
      ...base,
      width : "max-content",
      minWidth : "8%",
      // flex : 1
    }),
  };

   const ItemSelectFields2 = (props) => {

    // const { code } = props.match.params;
    const {addDataTableR,handleAddFieldsnew} = props
    const classes = useStyles()
    const [ inputFields1, setInputFields1 ] = useState([
        { id: uuidv4(),type_code:"",item_name :"", item_qty: "" },
    ]);
    
    const [record, setItemData] = useState([])
    const [result,ddlvalue] = useState([record.itemname]);
    
      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields1.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
      
        setInputFields1(newInputFields);
      }




    const handleAddFields = () => {
        setInputFields1([...inputFields1, { id: uuidv4(),type_code:"",item_name :"",  item_qty: "" }])
      }
    
      const handleRemoveFields = id => {
        const values  = [...inputFields1];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields1(values);
      }


      const resetForm = () => {
        setInputFields1([]);
        
    }



      useEffect(()=>{
        getItems();
        // setUserData([]);
    }, []);

    const code_id = localStorage.getItem('codeid');
    let sessionUser = localStorage.getItem("name");

      const getItems = () => {
        const id = localStorage.getItem('codeid');
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        fetch("http://localhost:4000/items/"+id,
        {
          method: "GET",
          headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
          console.log(response)
          return response.json();
         
        })
            
            .then(data => {
               console.log("newdata",data);
              //  setItemData(data);
               const dataarray = [];
               // setUserData(arr);
               for (const key in data){
                   const donor = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(donor);
               }
               console.log(dataarray);
              //  JSON.parse(arr);
                setItemData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    }



// const options = record.map(d => ({
//   "value" : d.code,
//   "label" : d.itemname
// }))
// console.log("hhhhhh",options)

    const handleSubmit = (e) => {
      e.preventDefault();

      addDataTableR(inputFields1);
      console.log("RRR",inputFields1);
   
    };

   


// const [result,ddlvalue] = useState([record.itemname]);
// const handleChange = (e) => {
//   ddlvalue([ e.label])
  // const values = [...inputFields]
  // values.findIndex(value => value.id === id);
  // setInputFields(values);
//  inputFields.push(...result,{id: uuidv4(),itemname : e.label,code: e.value });
//   setInputFields([...inputFields,{itemname : e.label,code: e.value }])
// }

return (
    <Container>
    {/* <h1>Add New Member</h1> */}
    <form className={classes.root} onSubmit={handleSubmit}>
      { inputFields1.map(inputField => (
        <div key={inputField.id}>
            <Controls.Input
              select

              required
              size = "small"
                label="Item Name"
                name ="item_name"
               style={{width:130}}
                value={inputField.item_name || ''}
                
                onChange={event => handleChangeInput(inputField.id, event)}
                // onChange={handleChange}
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  record.map(item => (
                   <MenuItem key = {item.code}   value={item.code} >{item.itemname}</MenuItem>))
                    
                }
            </Controls.Input> 
         
           {/* <Controls.Input
            name="added_by"
            size = "small"
            variant="outlined"
            style={{display:"none"}}
            value={inputField.added_by = sessionUser}
            onChange={event => handleChangeInput(inputField.id, event)}
          /> */}
        
            <Controls.Input
            name="type_code"
            label="code"
            min = {0}
            required
            size = "small"
            style={{display:"none"}}
            value={inputField.type_code = code_id}
            onChange={event => handleChangeInput(inputField.id, event)}
          />

          <Controls.Input
          className={classes.input}
          // defaultValue="" 
            name="item_qty"
            label="Item Qty"
            type="number"
            min = {0}
            required
            style={{width:120}}
            size = "small"
            value={inputField.item_qty}
            onChange={event => handleChangeInput(inputField.id, event)}
          />

          <Controls.ActionButton
                          color="error"
                         
                          disabled={inputFields1.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
         
            <IndeterminateCheckBoxIcon  style={{width:30, height:30}} />
           </Controls.ActionButton>
           <Controls.ActionButton
                          color="primary"
            onClick={handleAddFields}
          >
            <AddBoxIcon  style={{width:30, height:30}}/>
            </Controls.ActionButton>
        </div>
      )) }
       <Controls.Button type="submit" text="Add"  className={classes.button}  onClick={handleAddFieldsnew}/>
              <Controls.Button
              className={classes.button}
                text="Reset"
                color='warning'
                style = {{backgroundColor:"#ECEFF1"}}
                onClick={resetForm}
              />
    </form>
  </Container>
);




  }
  export default ItemSelectFields2;