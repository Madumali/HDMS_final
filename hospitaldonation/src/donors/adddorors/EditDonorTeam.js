// import React, { useState, useEffect } from "react";
// import Container from '@mui/material';
// import Input from "../../components/controls/Input";
// import { v4 as uuidv4 } from 'uuid';
// import { makeStyles } from '@mui/styles';
// import Controls from "../../components/controls/Controls";
// import { useForm } from "../../components/useForm";
// import { Form } from "../../components/useForm";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(0.5),
//     },
//   },
//   button: {
//     margin: theme.spacing(0.2),
//   }
// }))



// const initialFValues = {
//   national_id:uuidv4(),
//   donor_name: "",
 
//  address_line1: "",
 
//   contact_no: "",
  
//   reg_date:Date(),
//   email: "",
 

// };

// const EditDonorTeam = (props)=> {
//     const { addOrEditP, recordForEditP} = props;
//     const classes = useStyles()

//     const validate = (fieldValues = values) => {
//       let temp = { ...errors };
      
  
//       if ("email" in fieldValues)
//         temp.email = /$^|.+@.+..+/.test(fieldValues.email)
//           ? ""
//           : "Email is not valid.";
  
  
        
//       if ('contact_no' in fieldValues)
//       temp.contact_no = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no)
//       ? ""
//       : "Contact No is not valid.";
     
  
//       setErrors({
//         ...temp,
//       });
//       if (fieldValues == values) return Object.values(temp).every((x) => x == "");
//     };
//     const {values, setValues, inputFields, setInputFields, errors, handleInputChange,  setErrors, resetForm } =
//     useForm(  initialFValues, true, validate);

//     // const [inputFields, setInputFields] = useState([
//     //   { id: uuidv4(), national_id: '', membername: '', address_line1:'', address_line2:'', contact_no:'', email:'' },
//     // ]);
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log("team", values);
     
//       if (validate()) {
//         addOrEditP(values, resetForm);
        
//       }
//     };
// useEffect(() => {
//       if (recordForEditP != null)
//       setValues({
//           ...recordForEditP,
//         });
//     }, [recordForEditP]);

//     return (
      
//         <Form className={classes.root} onSubmit={handleSubmit}>
        
//           <Input
//                 name="donor_name"
//                 label="Team/Company Name"
//                 // variant="filled"
//                 style={{width:250}}
//                 value={values.donor_name}
//                 onChange={handleInputChange}
//               />
//               {/* event => handleChangeInput(id, event) */}
//               <Input
//                 name="address_line1"
//                 label="Team/Company Address"
//                 // variant="filled"
//                 style={{width:250}}
//                 value={values.address_line1}
//                 onChange={handleInputChange}
//               />
//               <Input
//                 name="contact_no"
//                 label="Team/Company Contact"
//                 // variant="filled"
//                 style={{width:250}}
//                 value={values.contact_no}
//                 onChange={handleInputChange}
//                 error={errors.contact_no}
//               />
//               <Input
//                 name="email"
//                 label="Company Email"
//                 // variant="filled"
//                 style={{width:250}}
//                 value={values.email}
//                 onChange={handleInputChange}
//                 error={errors.email}
//               />

// <Controls.Button type="submit" text="Submit" />
//               <Controls.Button
//                 text="Reset"
//                 color="warning"
//                 onClick={resetForm}
//               />         
//         </Form>
//     );
// }

// export default EditDonorTeam;