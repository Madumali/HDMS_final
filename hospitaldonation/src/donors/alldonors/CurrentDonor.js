
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "../../components/controls/Input";
import Controls from "../../components/controls/Controls";
import { useFormt } from "../../components/useFormt";
import * as donors from "../services/donors"
import Grid from "@mui/material/Grid";

import { Form } from "../../components/useFormt";


const initialFValues = {
  national_id: "",
  donor_name: "",
 
  address_line1: "",
  address_line2: "",
  contact_no: "",
  contact_no2: "",
  rer_date:Date(),
  email: "",

};



export const CurrentDonor = (props) => {

  const { addOrEditlast } = props;
// const  { donorData } = props;
    const [ donorData, setDonorData ] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ("national_id" in fieldValues)
          temp.national_id = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(fieldValues.national_id)
            ? ""
            : "NIC is not valid.";
  
      if ("email" in fieldValues)
        temp.email = /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
  
  
        
      if ('contact_no' in fieldValues)
      temp.contact_no = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no)
      ? ""
      : "Contact No is not valid.";
      if ('contact_no2' in fieldValues)
      temp.contact_no2 = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no2)
      ? ""
      : "Contact No is not valid.";
      // if ("contact_no" in fieldValues)
      //   temp.contact_no =
      //     fieldValues.contact_no.length != 0 ? "" : "Contact no is required.";
     
      setErrors({
        ...temp,
      });
  
      if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };
  
    const {values, setValues, inputFields, setInputFields, errors, handleChangeInput,  handleInputChange,  setErrors, resetForm, resetFormt } =
    useFormt(  initialFValues, true, validate);

    const handleSubmitdonorEdit = (e) => {
      e.preventDefault();
    e.stopPropagation();
    if (validate()) {
      addOrEditlast(values, resetForm);
    }
    };


    useEffect(() => {
      if (recordForEdit != null)
        setValues({
          ...recordForEdit,
        });
    }, [recordForEdit]);

    
  //   useEffect(()=>{
    
  //  donors.getLastDonor()
   
  //   .then(data => {
  //     console.log(data);
  //     const dataarray = [];
  //     // setUserData(arr);
  //     for (const key in data){
  //         const category = {
  //             id:key,
  //             ...data[key]
  //         };
  //         dataarray.push(category);
  //     }
  //     console.log(dataarray);
  //    //  JSON.parse(arr);
  //      setDonorData(dataarray);
  //    })
  //    .catch((error) => {
  //      console.error('Error:', error);
  //    })
  //   }, []);
   
    return(
    <div>
  <Form onSubmit={handleSubmitdonorEdit}>
  <Box sx = {{pl:5, py:5, pr:-15}}>
        <Grid container spacing={1}>
          
          {donorData.map((values) => ( 
            <div key={values.id}>
              <Grid item xs={6}>
            <Input
              name="national_id"
              label="NIC"
              value={values.national_id}
              onChange={event => setValues(event.target.national_id)}
              error={errors.national_id}
              style={{width:400}}
            />
          </Grid>
          <Grid item xs={1}>
            </Grid>
          

          <Grid item xs={6}>
          <Input
              name="donor_name"
              label="Name"
              value={values.donor_name}
              onChange={event => handleChangeInput(values.id, event)}
              style={{width:400}}
            />
          </Grid>
          <Grid item xs={1}>
            </Grid>
            
          <Grid item xs={6}>
            <Input
              name="address_line1"
              label="Address Line1"
              value={values.address_line1}
              onChange={event => handleChangeInput(values.id, event)}
              style={{width:400}}
              // error={errors.username}
            />
          </Grid>
          <Grid item xs={1}>
            </Grid>

          <Grid item xs={6}>
          <Input
                        name="address_line2"
                        label="Address Line2"
                        value={values.address_line2}
                        onChange={event => handleChangeInput(values.id, event)}
                        style={{width:400}}
                        // options={}
                        // error={errors.user_department}
                    />
                    </Grid>
                    <Grid item xs={1}>
            </Grid>

          
             <Grid item xs={6}>
            <Input
              name="contact_no"
              label="Contact"
             maxLength={10}
              value={values.contact_no}
              onChange={event => handleChangeInput(values.id, event)}
              error={errors.contact_no}
              style={{width:400}}
            />
          </Grid>
          <Grid item xs={1}>
            </Grid>
          <Grid item xs={6}>
            <Input
              label="Contact"
              name="contact_no2"
              value={values.contact_no2}
              onChange={event => handleChangeInput(values.id, event)}
              error={errors.contact_no2}
              style={{width:400}}
            />
          </Grid>
          <Grid item xs={1}>
            </Grid>

          <Grid item xs={6}>
            <Controls.Input
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={event => handleChangeInput(values.id, event)}
              error={errors.email}
              style={{width:400}}
        
            />
          </Grid>
          <Grid item xs={1}>
          {/* <Input
              name="reg_date"
              
              value={values.reg_date}
              onChange={handleInputChange}
              type="hidden"
            /> */}
            </Grid>
            </div>
              )
              )

}
        </Grid>
        </Box>
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
               {/* </Box> */}
            
            


  </Form>

    </div>);
}

export default CurrentDonor;