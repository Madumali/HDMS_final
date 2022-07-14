
import React, { useState, useEffect } from "react";
import Controls from "../components/controls/Controls";
import { useFormt } from "../components/useFormt";
import { Form } from "../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Popup from "../components/Popup";
import IssueItemSelect from "../components/IssueItemSelect";
import * as systemusers from "../systemuser/services/systemusers";
import { Select as MuiSelect, MenuItem } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Typography } from "@material-ui/core";


//INITIAL VALUES 
const initialFValues = {
  user_department: "",
  to_whom: "",
};
const initialFValuest = {};

const IssuanceForm = (props) => {
  const { addOrEditI,  recordForEdit } = props;
  const [roleItems, setItemsData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [nameselected, setNameSelecte] = useState("");
  const [department, setDepartment] = useState([]);

//VALIDATIONS
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("user_department" in fieldValues)
      temp.user_department = fieldValues.user_department
        ? ""
        : "Department is required.";

    if ("to_whom" in fieldValues)
      temp.to_whom = fieldValues.to_whom ? "" : "Person is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
//USEFORMT COMPONENT
  const {
    values,
    setValues,
    inputFieldsd,
    setInputFieldsd,
    errors,
    handleChangeInputd,
    handleInputChange,
    setErrors,
  } = useFormt(initialFValues, initialFValuest, true, validate);

  const alldata = {
    ...values,
    inputFieldsd,
  };
//DATA SUBMIT FUNCTION OF FORM WHICH SENDS DATA TO ADDOREDIT FUNCTION
  const handleSubmitrequest = (e) => {
    e.preventDefault();
    console.log("s", values);
    if (validate()) {
      addOrEditI(alldata, resetFormt);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
//RETRIEVE ALL CATEGORY 
  const getCategory = () => {
    const token = localStorage.getItem("authToken");
    // console.log(token, 'token');
    fetch("http://localhost:4000/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const dataarray = [];
        for (const key in data) {
          const category = {
            id: key,
            ...data[key],
          };
          dataarray.push(category);
        }
        setItemsData(dataarray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
//FUNCTION TO GET DEPARTMENTS
  useEffect(() => {
    getDep();
  }, []);
  const getDep = () => {
    systemusers
      .getDepartments()

      .then((data) => {
        if (data.msg == "No data available") {
          // setResponse(data);
        } else {
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

  const resetFormt = () => {
    setInputFieldsd([]);
    setValues(initialFValues);
  };

  let sessionUser = localStorage.getItem("name");
// FUNCTION TO GET SELECTED ISSUE ITEMS
  const addDataTableR = (dataset) => {
    inputFieldsd.push(...dataset);
    setOpenPopup(false);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  // FUNCTION TO REMOVE ADDED FIELDS
  const handleRemoveFields = (id) => {
    const values = [...inputFieldsd];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFieldsd(values);
  };

  return (
    <Box
      direction="column"
      alignItems="center"
      marginLeft={5}
      marginTop={3}
      justifyContent="center"
      style={{ paddingBottom: "10px" }}
    > 
    {/* form component  */}
      <Form onSubmit={handleSubmitrequest}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <Controls.Input
              select
              name="user_department"
              label="Department"
              value={values.user_department || ""}
              onChange={handleInputChange}
              error={errors.user_department}
            >
              <MenuItem defaultValue="">None</MenuItem>
              {department.map((item, i) => (
                <MenuItem key={i} value={item.dep_id}>
                  {item.dep_name}
                </MenuItem>
              ))}
            </Controls.Input>

            <Controls.Input
              label="To Person"
              name="to_whom"
              value={values.to_whom}
              onChange={handleInputChange}
              error={errors.to_whom}
            />

            <Controls.RadioGroup
              name="type_code"
              label="Select Items"
              value={values.type_code}
              items={roleItems}
              onChange={(e) => {
                setOpenPopup(true);
                setNameSelecte(e.target.value);
                handleInputChange();
              }}
            />
          </Grid>
          <Controls.Input
            value={(values.enteredby = sessionUser)}
            style={{ display: "none" }}
          />
{/* ITEMS WITH QTY FIELD SELECTED BY ISSUITEMSELECT FORM IS ADDED TO ISSUANCEFORM  */}
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "20px" }}>
            {inputFieldsd.map((items, i) => (
              <div key={i}>
                {" "}
                <Controls.Input
                  value={(items.enteredby = sessionUser)}
                  style={{ display: "none" }}
                />{" "}
                <Controls.Input
                  value={items.type_code}
                  style={{ display: "none" }}
                />{" "}
                <Controls.Input
                  value={items.item_name}
                  size="small"
                  style={{ width: 120 }}
                />{" "}
                <Controls.Input
                  type="number"
                  name="item_qty"
                  size="small"
                  style={{ width: 60 }}
                  value={items.itemqty}
                  onChange={(event) => handleChangeInputd(items.id, event)}
                />
                <Controls.ActionButton
                  // style={{pading:60}}
                  color="error"
                  disabled={items.length === 1}
                  onClick={() => handleRemoveFields(items.id)}
                >
                  <IndeterminateCheckBoxIcon
                    style={{ width: 30, height: 30 }}
                  />
                </Controls.ActionButton>
              </div>
            ))}
          </Grid>

          <Grid marginLeft={1}>
            <Controls.Button
              type="submit"
              text="Submit"
              style={{ marginRight: 5 }}
            />
            <Controls.Button
              text="Reset"
              color='default'
              style={{ backgroundColor: "#ECEFF1" }}
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
        title={nameselected}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        style={{ width: 250 }}
      >
        {/* ISSUEITEM SELECTED BY ISSUE ITEMFORM */}
        <IssueItemSelect addDataTableR={addDataTableR} />
      </Popup>
    </Box>
  );
};

export default IssuanceForm;
