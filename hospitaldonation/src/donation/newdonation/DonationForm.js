import React, { useState, useEffect } from "react";
import Controls from "../../components/controls/Controls"; //import common components
import { useFormt } from "../../components/useFormt";
import { Form } from "../../components/useForm";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Popup from "../../components/Popup";
import ItemSelectFields from "../../components/ItemSelectFields"; //import ItemSelectFields form component
import DonorList from "./DonorList"; //import donorlist component
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Typography } from "@material-ui/core";

//initial values defined
const initialFValues = {
  donor_name: "",
  type_code: "",
};
const initialFValuest = {};

export const DonationForm = (props) => {
  // start functional component

  const { addOrEdit, recordForEdit } = props; // receives the functional argument(properties) from AddDonation.js
  const [record, setUserData] = useState([]);
  const [type_code, setItemsData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [nameselected, setNameSelecte] = useState("");
  const [allDonors, setAllDonors] = useState([]);
  const [response, setResponse] = useState([]);

  //validations
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("donor_name" in fieldValues)
      temp.donor_name = fieldValues.donor_name ? "" : "Donor Name is required.";

    if ("type_code" in fieldValues)
      temp.type_code = fieldValues.type_code ? "" : "code is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

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

  //values submitted from form is passed to addOrEdit function
  const handleSubmitdonation = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(alldata, resetForm);
    }
  };

  useEffect(() => {
    //useEffect hook used to fetch data  from api
    getCategory(); //getcategory function is called
  }, []);

  //getCategory function defined.this will get donation category data
  const getCategory = () => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/category/", {
      //fetch API communicate with the backend via GET method
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        //if there is any response it will returned as json
        return response.json();
      })

      .then((data) => {
        //if data is retrieved those data set to the array

        const dataarray = [];

        for (const key in data) {
          const category = {
            id: key,
            ...data[key],
          };
          dataarray.push(category);
        }

        setItemsData(dataarray); //data array is set to the state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getDonors();
  }, []);
  //this function will get donor data
  const getDonors = () => {
    const token = localStorage.getItem("authToken");
    // console.log(token, 'token');
    fetch("http://localhost:4000/donors/", {
      //fetch API communicate with the backend via GET method
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        //if there is any response it will returned as json
        return response.json();
      })
      .then((data) => {
        //if data is retrieved those data set to the array
        const dataarray = [];
        for (const key in data) {
          const donor = {
            id: key,
            ...data[key],
          };
          dataarray.push(donor);
        }

        setUserData(dataarray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const resetForm = () => {
    setValues(initialFValues);
    setInputFieldsd([]);
    localStorage.setItem("donor", "");
  };

  let sessionUser = localStorage.getItem("name");

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  useEffect(() => {
    onChangeDonor();
  }, []);
  //when donor is selected his/her relevant data is retrieved
  const onChangeDonor = () => {
    let id = localStorage.getItem("donor");
    console.log(id);
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    fetch("http://localhost:4000/donors/all/" + id, {
      //fetch API communicate with the backend via GET method
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        //if there is any response it will returned as json
        return response.json();
      })

      .then((data) => {
        //if data is retrieved those data set to the array
        if (data.msg == "No data available") {
          setResponse(data);
        } else {
          const dataarray = [];
          for (const key in data) {
            const donor = {
              id: key,
              ...data[key],
            };
            dataarray.push(donor);
          }

          setResponse(dataarray);
          setAllDonors(dataarray);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //data coming from itemSelectFields component is pushed to inputfield array
  const addDataTable = (dataset) => {
    inputFieldsd.push(...dataset);
    setOpenPopup(false);
  };
  //remove fields
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
      justifyContent="center"
      marginTop={3}
      marginLeft={5}
      style={{ paddingBottom: "10px" }}
    >
      <Form onSubmit={handleSubmitdonation}>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "10px" }}>
            <Controls.Select
              name="donor_name"
              label="Donor Name"
              value={values.donor_name || ""}
              options={record}
              onChange={(e) => {
                handleInputChange(e);
                onChangeDonor(e);
              }}
              variant="outlined"
              error={errors.donor_name}
            ></Controls.Select>

            {allDonors.map(
              (donor) => (
                (<DonorList key={donor.id} text={donor} />),
                (
                  <Controls.Input
                    style={{ display: "none" }}
                    value={(values.email = donor.email)}
                  />
                )
              )
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Controls.RadioGroup
              name="type_code"
              label="Select Items"
              value={values.type_code}
              items={type_code}
              onChange={(e) => {
                setOpenPopup(true);
                handleInputChange(e);
                setNameSelecte(e.target.value);
              }}
              style={{ width: "600px" }}
              error={errors.type_code}
            />
          </Grid>
         
          <Controls.Input
            value={(values.added_by = sessionUser)}
            style={{ display: "none" }}
          />

          <Controls.Input
            value={values.donor_name}
            style={{ display: "none" }}
          />

          <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "20px" }}>
            {inputFieldsd.map((items, i) => (
              <div key={i}>
                {" "}
                <Controls.Input
                  value={items.type_code}
                  style={{ display: "none" }}
                />
                <Controls.Input
                  value={(items.codeid = items.type_code)}
                  size="small"
                  style={{ display: "none" }}
                />
                <Controls.Input
                  value={items.item_name}
                  size="small"
                  error={errors.item_name}
                  style={{ width: 120 }}
                />
                <Controls.Input
                  type="number"
                  name="item_qty"
                  required
                  style={{ width: 60 }}
                  size="small"
                  error={errors.item_qty}
                  value={items.item_qty}
                  onChange={(event) => handleChangeInputd(items.id, event)}
                />{" "}
                <Controls.Input
                  name="item_description"
                  value={items.item_description}
                  size="small"
                  onChange={(event) => handleChangeInputd(items.id, event)}
                  style={{ width: 173 }}
                />
                <Controls.ActionButton
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

          <Grid marginLeft={2}>
            <Controls.Button
              type="submit"
              text="Submit"
              style={{ marginRight: 5 }}
            />
            <Controls.Button
              text="Reset"
              color='default'
              style = {{backgroundColor:"#ECEFF1"}}
              onClick={resetForm}
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
        {/* //addDataTable function is passing */}
        <ItemSelectFields addDataTable={addDataTable} />
      </Popup>
    </Box>
  );
};

export default DonationForm;
