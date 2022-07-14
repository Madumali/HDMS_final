
import React, { useState, useEffect } from "react";
import Controls from "../components/controls/Controls";
import { useForm } from "../components/useForm";
import { Form } from "../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as systemusers from "../systemuser/services/systemusers";
import { Select as MuiSelect, MenuItem } from "@mui/material";


//INITIAL VALUES 
const initialFValues = {
  department: "",
  requestBy: "",
  issue_itemqty:"",
  availableqty:"",
  accept_by:""
};

const IssueRelease = (props) => {
  const { addOrEditI,  recordForEdit, roleItems } = props;
  const [roleItem, setItemsData] = useState([]);
  const [department, setDepartment] = useState([]);

//VALIDATIONS
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("department" in fieldValues)
      temp.department = fieldValues.department
        ? ""
        : "Department is required.";

    if ("requestBy" in fieldValues)
      temp.requestBy = fieldValues.requestBy ? "" : "Person is required.";

      if ("issue_itemqty" in fieldValues )
        {
          const emptyissue = fieldValues.issue_itemqty.length;
          const issueval = fieldValues.issue_itemqty;
        
            if(!issueval)
            {
              temp.issue_itemqty = "Issue amount is required.";
            }else if(0 >= issueval )
            {
              temp.issue_itemqty = "Issue amount is not valid.";
            }else {
              temp.issue_itemqty = "";
            }
             if("availableqty" in fieldValues)
          {
            // const availablelen = fieldValues.availableqty.length;

            const availableval = fieldValues.availableqty;
            if(availableval == null)
            {
              temp.issue_itemqty = "Item is not available.";
            }
            else if(issueval > availableval )
            {
              temp.issue_itemqty = "Issue amount is not valid.";
            }else {
              temp.issue_itemqty = "";
            }
          }
         
         
        }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
//USEFORM COMPONENT
  const {
    values,
    setValues,
    errors,
    handleInputChange,
    setErrors,
  } = useForm(initialFValues, true, validate);

 
//DATA SUBMIT FUNCTION OF FORM WHICH SENDS DATA TO ADDOREDIT FUNCTION
  const handleSubmitrequest = (e) => {
    e.preventDefault();
    console.log("issuerequest", values);
    if (validate()) {
      addOrEditI(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);



  useEffect(() => {
    getCategory();
  }, []);
//RETRIEVE ALL CATEGORY 
  const getCategory = () => {
    const token = localStorage.getItem("authToken");
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

  const resetForm = () => {
    setValues(initialFValues);
  };

  let sessionUser = localStorage.getItem("name");


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
          readOnly
              select
              name="department"
              label="Department"
              value={values.department || ''}
              onChange={handleInputChange}
              error={errors.department}
           
                >
           
            <MenuItem defaultValue = "">None</MenuItem>
                {
                  department.map(item => (
                   <MenuItem key = {item.dep_id}   value={item.dep_id} >{item.dep_name}</MenuItem>))
                    
                }
            </Controls.Input> 

            <Controls.Input
              label="To Person"
              name="requestBy"
              value={values.requestBy || ""}
              onChange={handleInputChange}
              error={errors.requestBy}
            />

          </Grid>
          <Controls.Input
            value={values.accept_by = sessionUser}
            style={{ display: "none" }}
          />
{/* ITEMS WITH QTY FIELD SELECTED BY ISSUITEMSELECT FORM IS ADDED TO ISSUANCEFORM  */}
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "20px" }}>

          <div>
 <Controls.Input
  label="Item Name"
  readOnly
                  value={values.itemname}
                  size="small"
                  style={{ width: 150 }}
                />{" "}
                <Controls.Input
                readOnly
                 label="Requested Qty"
                  type="number"
                  name="request_qty"
                  size="small"
                  style={{ width: 80 }}
                  value={values.request_qty || ""}
                />
                {roleItems.map((item,i)=>{
                  return <Controls.Input
                  key = {i}
                readOnly
                 label="Available Qty"
                  name="availableqty"
                  size="small"
                  style={{ width: 85 }}
                  value={(values.availableqty = item.availableqty) || ""}
                />
                })   
              } 
                 <Controls.Input
                readOnly
                 label="Issue Qty"
                  type="number"
                  name="issue_itemqty"
                  size="small"
                  style={{ width: 80 }}
                  value={values.issue_itemqty || ""}
                  onChange = {handleInputChange}
                  error = {errors.issue_itemqty}
                />
 </div>
           
          </Grid>

          <Grid marginLeft={1}>
            <Controls.Button
              type="submit"
              text="Issue Now"
              style={{ marginRight: 5 }}
            />
            {/* <Controls.Button
              text="Issue Later"
              color="default"
              style={{ backgroundColor: "#ECEFF1" }}
              onClick={resetForm}
            /> */}
          </Grid>
        </Grid>
     
      </Form>


    </Box>
  );
};

export default IssueRelease;
