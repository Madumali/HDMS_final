import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import {  Select as MuiSelect, MenuItem, Checkbox } from '@mui/material';




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

   const IssueItemSelect = (props) => {

    // const { code } = props.match.params;
    const {addDataTableR,handleAddFieldsnew} = props
    const classes = useStyles()
    const [inputFields1, setInputFields1 ] = useState([{ id: uuidv4(),type_code:"",item_name :"",  itemqty: "" }]);
    
    const [record, setItemData] = useState([])
    const [response, setResponse] = useState([])
    const [itemname, setItemName] = useState([])
    const [errors, setErrors] = useState([]);

   
  //   const validate = (fieldValues = inputFields1) => {
  //     { inputFields1.map(inputField => {
  //     let temp = { ...errors };
      
  //     if ("item_name" in fieldValues)
  //     {
  //       const emptyMail = fieldValues.item_name.length;
  //       const validEmail = /$^|.+@.+..+/.test(fieldValues.user_email);
  //       if (emptyMail === 0)
  //       {
  //         temp.user_email = "Email is required";
  //       } else if (!validEmail)
  //       {
  //         temp.user_email = "Email is not valid";
  //       } else {
  //         temp.user_email = "";
  //       }
  //     }
  //  setErrors({
  //       ...temp,
  //     });
  
  //     if (fieldValues === inputField) return Object.values(temp).every((x) => x === "");
  //   })
  // }
  //   };
  
   
      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields1.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
      
        setInputFields1(newInputFields);
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
               const dataarray = [];
               for (const key in data){
                   const donor = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(donor);
               }
               console.log("my selectvalues",dataarray);
                setItemData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    }




    const changeItem = (e) => {
     
        let id = e.target.value
        console.log("this is selected item",id);
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        fetch("http://localhost:4000/stock/"+id,
        {
          method: "GET",
          headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
          return response.json();
         
        })
            .then(data => {
              console.log("mydonors ", data);
               if(data.msg == "No data available")
               {
                 setResponse(data);
                 const dataaa = [{qty: 0}];
                 console.log("mydonors ", dataaa);
                 setItemName(dataaa);
              
               }
               else {
               const dataarray = [];
               for (const key in data){
                   const donor = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(donor);
               }
               console.log("itemname",dataarray);
               setItemName(dataarray);

               
            }
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    
    }


    const handleSubmit = (e) => {
      e.preventDefault();
console.log("RRR",inputFields1);

   addDataTableR(inputFields1);

   
    };

   
const releaseQty = (inputvalue,e) => {
  let input = parseInt(inputvalue);
  let available = {itemname};
  console.log("available", available)
  console.log("release", input)
  setsecnd(e.target.value )
  setfrst(e.target.value - secnd)
 
}
const [availability, setavailability] =useState(false);
const [frst, setfrst]= useState()
const [secnd,setsecnd] = useState(0);


return (
    <Container>

    <form className={classes.root} onSubmit={handleSubmit}>
    { inputFields1.map(inputField => (
        <div key={inputField.id}>
            <Controls.Input
              select
              // required
              size = "small"
                label="Item Name"
                name ="item_name"
                style={{width:130}}
                value={inputField.item_name || ''}
                onChange={ e => {handleChangeInput(inputField.id,e); changeItem(e)}}
                error={errors.item_name}
          
                >
   
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  record.map((item,i) => (
                   <MenuItem key = {i}   value={item.code} > {item.itemname}</MenuItem>))
                    
                }
            </Controls.Input> 
        
            <Controls.Input
            name="type_code"
            label="code"
            min = {0}
            style={{display:"none"}}
            value={inputField.type_code = code_id}
            onChange={e => handleChangeInput(inputField.id,e)}
          />
{itemname.map(availableqty => (
          <Controls.Input
          className={classes.input}
            name="qty"
            label="Available Qty"
            min = {0}
            size = "small"
            variant="outlined"
            value={inputField.qty = availableqty.qty}
        
          />
      
))}

<Controls.Input
          className={classes.input}
            name="itemqty"
            label="Item Qty"
            type="number"
            min = {0}
            // required
            size = "small"
            value={inputField.itemqty}
            onChange={e => {handleChangeInput(inputField.id,e)}}
            onClick = {(e)=> releaseQty(inputField.itemqty,e)}
            style={{width:120}}
          />

{/* {inputField.itemqty} */}
          {/* <Controls.ActionButton
                          color="error"
                         
                          disabled={inputFields1.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
         
            <IndeterminateCheckBoxIcon  style={{width:30, height:30}} />
           </Controls.ActionButton>
           <Controls.ActionButton
                          color="primary"
            onClick={handleAddFields}
          >
            <AddBoxIcon  style={{width:30, height:30}}/>
            </Controls.ActionButton> */}
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
  export default IssueItemSelect;