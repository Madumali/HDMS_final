import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { Select as MuiSelect, MenuItem } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    margin: theme.spacing(0.2),
  },
  input: {
    width: 100,
  },
  formcontrol: {
    minWidth: 200,
  },
}));
const styles = {
  container: (base) => ({
    ...base,
    width: "max-content",
    minWidth: "8%",
    // flex : 1
  }),
};

const ItemSelectFields = (props) => {
 
  const { addDataTable,handleAddFieldsnew} = props;
  const classes = useStyles();
  const [inputFields1, setInputFields1] = useState([
    {
      id: uuidv4(),
      added_by: "",
      type_code: "",
      item_name: "",
      item_qty: "",
      item_description: "",
    },
  ]);

  const [record, setItemData] = useState([]);
//common function to get input values
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields1.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields1(newInputFields);
  };

  //when click on add icon field adding dynamically
  const handleAddFields = () => {
    setInputFields1([
      ...inputFields1,
      {
        id: uuidv4(),
        added_by: "",
        type_code: "",
        item_name: "",
        item_qty: "",
        item_description: "",
      },
    ]);
  };
//when click on minus icon dynamically added fields will be removed
  const handleRemoveFields = (id) => {
    const values = [...inputFields1];
    values.splice(
      values.findIndex((value) => value.id === id),1);
    setInputFields1(values);
  };

  const resetForm = () => {
    setInputFields1([]);
  };

  useEffect(() => {
    getItems();
  }, []);

  const code_id = localStorage.getItem("codeid");
  let sessionUser = localStorage.getItem("name");

  const getItems = () => {
    const id = localStorage.getItem("codeid");
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/items/" + id, {//fetch API communicate with the backend via GET method
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {//if there is any response it will returned as json
        return response.json();
      })

      .then((data) => {//if data is retrieved those data set to the array

        const dataarray = [];
        for (const key in data) {
          const donor = {
            id: key,
            ...data[key],
          };
          dataarray.push(donor);
        }
        console.log(dataarray);
        
        setItemData(dataarray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputFields1 != "") {
      addDataTable(inputFields1)
    } else {
      alert("fields are empty");
    }

  };



  return (
    <Container>

      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields1.map((inputField, index) => (
          <div key={index}>
            <Controls.Input
              select
              size="small"
              label="Item Name"
              name="item_name"
              style={{ width: 130 }}
              value={inputField.item_name || ""}
              required
              onChange={(event) => handleChangeInput(inputField.id, event)}
              
            >

              <MenuItem defaultValue="">None</MenuItem>
              {record.map((item, index) => (
                <MenuItem key={index} value={item.code}>
                  {item.itemname}
                </MenuItem>
              ))}
            </Controls.Input>

            <Controls.Input
              name="added_by"
              style={{ display: "none" }}
              value={(inputField.added_by = sessionUser)}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />

            <Controls.Input
              name="type_code"
              label="code"
              min={0}
              variant="outlined"
              style={{ display: "none" }}
              value={(inputField.type_code = code_id)}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />

            <Controls.Input
              className={classes.input}
              required
              name="item_qty"
              label="Item Qty"
              type="number"
              min={0}
              size="small"
              style={{ width: 120 }}
              value={inputField.item_qty}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />

            <Controls.Input
              className={classes.input}
              size="small"
              name="item_description"
              label="Description"
              style={{ width: 120 }}
              value={inputField.item_description}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <Controls.ActionButton
              color="error"
              disabled={inputFields1.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <IndeterminateCheckBoxIcon style={{ width: 30, height: 30 }} />
            </Controls.ActionButton>
            <Controls.ActionButton color="primary" onClick={handleAddFields}>
              <AddBoxIcon style={{ width: 30, height: 30 }} />
            </Controls.ActionButton>
          </div>
        ))}
        <Controls.Button
          type="submit"
          text="Add"
          className={classes.button}
          onClick={handleAddFieldsnew}
        />
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
};
export default ItemSelectFields;
