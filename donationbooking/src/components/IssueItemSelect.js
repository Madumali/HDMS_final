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
    const [selectedname, setselectedname] = useState([])



      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields1.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
      
        setInputFields1(newInputFields);
      }





    // const handleAddFields = () => {
    //     setInputFields1([...inputFields1, { id: uuidv4(),type_code:"",item_name :"",  itemqty: "" }])
    //   }
    
      // const handleRemoveFields = id => {
      //   const values  = [...inputFields1];
      //   values.splice(values.findIndex(value => value.id === id), 1);
      //   setInputFields1(values);
      // }


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
               console.log("my selectvalues",dataarray);
              //  JSON.parse(arr);
                setItemData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    }


    // useEffect(()=>{
    //     changeItem();
    //     // setUserData([]);
    // }, []);
    

    const changeItem = (e) => {
     
      // let num = i
      // console.log("input id is this", num);
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
          // console.log(response)
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
               // setUserData(arr);
               for (const key in data){
                   const donor = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(donor);
               }
               console.log("itemname",dataarray);
            //    setResponse(dataarray);
               setItemName(dataarray);

              //  inputFields1.push(...itemname);
               
            }
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

      // const result = Object.keys(inputFields1).map((key) => inputFields1[key]);
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

const handleChange = (e) => {
  // setsecnd(e.target.value  )
  // setfrst(e.target.value - secnd)
//   const val = e.item_qty.value
//   console.log("hhhhhhh",val)
// if(val == "0")
// {
// setavailability(true);
// } 
}
const handleChangerelease = (e) => {
//   setfrst(e.target.value)
//   setsecnd(e.target.value )
// }
}
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
                
                onChange={ e => {handleChangeInput(inputField.id,e); changeItem(e)}}
                // onChange={handleChange}
                >
                {/* // onChange={e => handleChange(inputField.id, e)}> */}
                
                <MenuItem defaultValue = "">None</MenuItem>
                {
                  record.map((item,i) => (
                   <MenuItem key = {i}   value={item.code} > {item.itemname}</MenuItem>))
                    
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
            style={{display:"none"}}
            value={inputField.type_code = code_id}
            onChange={e => handleChangeInput(inputField.id,e)}
          />
{itemname.map(availableqty => (
          <Controls.Input
          className={classes.input}
          // defaultValue="" 
            name="item_qty"
            label="Available Qty"
            // type="number"
            min = {0}
            size = "small"
            variant="outlined"
            value={inputField.qty = availableqty.qty}
            // onChange={e => {setfrst(availableqty)}}
            // value={frst}
          />
      
))}

<Controls.Input
          className={classes.input}
            name="itemqty"
            label="Item Qty"
            type="number"
            min = {0}
            required
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
                color="warning"
                onClick={resetForm}
              />
    </form>
  </Container>
);




  }
  export default IssueItemSelect;