// import React, { useState, useEffect } from "react";
// import Input from "../../components/controls/Input";
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import { v4 as uuidv4 } from 'uuid';
// import { makeStyles } from '@material-ui/core';
// import Controls from "../../components/controls/Controls";
// import Grid from "@mui/material/Grid";
// import { useFormt } from "../../components/useFormt";
// import { Form } from "../../components/useFormt";
// import { Box, IconButton } from "@mui/material";

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


// const initialFValuest = {
//   id: uuidv4(),
//   donor_name: "",
//   address_line1: "",
//   contact_no: "",
//   email: "",
  
// };

// const initialFValues = {
// id: uuidv4(),
// national_idt: "",
// membername: "",
// address_line1t: "",
// address_line2t: "",
// contact_not: "",
// emailt: "",

// };
// // const initialFValues = {
// //   id: uuidv4(),
// //   donor_name: "",
// //   address_line1: "",
// //   contact_no: "",

// //   reg_date: Date(),
// //   email: "",
 

// //   // members
// //   inputFields: [
// //     {
// //   national_idt: "",
// //   membername: "",
// //   address_line1t: "",
// //   address_line2t: "",
// //   contact_not: "",
// //   emailt: "",

// //     }
// //   ], // {nic:'', email: '', }

// // };

// const MemberDetails = (props) => {
//   const  { val, onChange, errorem, errorct, errornic, disabled, onClick } = props
//   return (
//     <div>
//       <Input
//         name="national_idt"
//         label="NIC"
//         // variant="filled"
//         style={{ width: 173 }}
//         value={val.national_idt}
//         onChange={onChange}
//       error={errornic}
//       />

//       <Input
//         name="membername"
//         label="Member Name"
//         style={{ width: 173 }}
//         value={val.membername}
//         onChange={onChange}
//       />

//       <Input
//         name="address_line1t"
//         label="Address Line1"
//         style={{ width: 173 }}
//         value={val.address_line1t}
//         onChange={onChange}
//       />

//       <Input
//         name="address_line2t"
//         label="Address Line2"
//         style={{ width: 173 }}
//         value={val.address_line2t}
//         onChange={onChange}
//       />

//       <Input
//         name="contact_not"
//         label="Contact"
//         style={{ width: 173 }}
//         value={val.contact_not}
//         onChange={onChange}
//         error={errorct}
//       />

//       <Input
//         name="emailt"
//         label="Email"
//         style={{ width: 173 }}
//         value={val.emailt}
//         onChange={onChange}
//         error={errorem}
//       />

//       <IconButton disabled={disabled} onClick={onClick}>
//         <RemoveIcon style={{ width: 15 }} />
//       </IconButton>
//       <IconButton
//         onClick={props.handleAddFields}
//       >
//         <AddIcon style={{ width: 15 }} />
//       </IconButton>


//     </div>
//   );
// }
// /* <Input
//         name="membername"
//         label="Member Name"
//         style={{ width: 173 }}
//         value={props.membername}
//         onChange={event => handleChangeInput(inputField.id, event)}
//       /> */

// export const AddDonorTeam = (props) => {
//   const { addOrEditP, recordForEdiP } = props;
//   const classes = useStyles()

//   const validate = (fieldValues = values) => {
//     let temp = { ...errors };


//     if ("email" in fieldValues)
//       temp.email = /$^|.+@.+..+/.test(fieldValues.email)
//         ? ""
//         : "Email is not valid.";



//     if ('contact_no' in fieldValues)
//       temp.contact_no = /^([+]\d{2})?\d{10}$/.test(fieldValues.contact_no)
//         ? ""
//         : "Contact No is not valid.";


//     setErrors({
//       ...temp,
//     });
//     if (fieldValues == values) return Object.values(temp).every((x) => x == "");
//   };
//   const { values, setValues, inputFields, setInputFields, errors, handleChangeInput, handleInputChange, setErrors, resetForm, resetFormt } =
//     useFormt(initialFValuest, initialFValues, true, validate);

//     const alldata = {
//       ...values,
//       inputFields
//     }
//   // const [inputFields, setInputFields] = useState([
//   //   { id: uuidv4(), national_id: '', membername: '', address_line1:'', address_line2:'', contact_no:'', email:'' },
//   // ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("team", values);
//     console.log("InputFields", inputFields);
//     // values.push(inputFields);
//     if (validate()) {
//       addOrEditP(alldata, resetFormt);
//       // addOrEditT(inputFields, resetFormt);
//     }
//   };

//   // useEffect(() => {
//   //   if (recordForEdit != null)
//   //   setInputFields({
//   //       ...recordForEdit,
//   //     });
//   // }, [recordForEdit]);
//   // const handleChangeInput = (id, event) => {
//   //   const newInputFields = inputFields.map(i => {
//   //     if(id === i.id) {
//   //       i[event.target.name] = event.target.value
//   //     }
//   //     return i;
//   //   })

//   //   setInputFields(newInputFields);
//   // }

//   const handleAddFields = () => {
//     setInputFields([...inputFields, { id: uuidv4(), membername: "", national_idt: "", address_line1t: "", address_line2t: "", contact_not: "", emailt: "" }])
//   }

//   const handleRemoveFields = id => {
//     const values = [...inputFields];
//     values.splice(values.findIndex(value => value.id === id), 1);
//     setInputFields(values);
//   }






//   return (
//     <Box direction="column" alignItems="center" justifyContent="center" style={{border:"1px solid blue", paddingBottom:"10px"}}>
//     <Form className={classes.root} onSubmit={handleSubmit}>

//       <Input
//         name="donor_name"
//         label="Team/Company Name"
//         // variant="filled"
//         style={{ width: 250 }}
//         value={values.donor_name}
//         onChange={handleInputChange}
//       />
//       {/* event => handleChangeInput(id, event) */}
//       <Input
//         name="address_line1"
//         label="Team/Company Address"
//         // variant="filled"
//         style={{ width: 250 }}
//         value={values.address_line1}
//         onChange={handleInputChange}
//       />
//       <Input
//         name="contact_no"
//         label="Team/Company Contact"
//         // variant="filled"
//         style={{ width: 250 }}
//         value={values.contact_no}
//         onChange={handleInputChange}
//         error={errors.contact_no}
//       />
//       <Input
//         name="email"
//         label="Company Email"
//         // variant="filled"
//         style={{ width: 250 }}
//         value={values.email}
//         onChange={handleInputChange}
//         error={errors.email}
//       />
//       <Grid container spacing={1}>
//         <h6>Member Details</h6>
//         {inputFields.map((inputField, i) => {
//           return <MemberDetails 
//           key={i}
//           onChange={event => handleChangeInput(inputField.id, event)}
//           val = {inputField}
//            handleAddFields = {handleAddFields}
//            disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}/>
//         })}

//         {/* {inputFields.map((inputField, i) => (
//           <div key={i}> */}


//             {/* <Input
//               // type="hidden"  
//               // readOnly
//                name="donor_name"
//                style={{display:"none"}}
//                value={inputField.donor_name=values.donor_name}
//                onChange={event => handleChangeInput(inputField.id, event)}
//               />  */}
//             {/* <Input
//               name="national_idt"
//               label="NIC"
//               // variant="filled"
//               style={{ width: 173 }}
//               value={inputField.national_idt}
//               // onChange={event => handleChangeInput(inputField.id, event)}
//             // error={errors.national_id}
//             /> */}
// {/* 
//             <Input
//               name="membername"
//               label="Member Name"
//               style={{ width: 173 }}
//               value={inputField.membername}
//               onChange={event => handleChangeInput(inputField.id, event)}
//             />

//             <Input
//               name="address_line1t"
//               label="Address Line1"
//               style={{ width: 173 }}
//               value={inputField.address_line1t}
//               onChange={event => handleChangeInput(inputField.id, event)}
//             />

//             <Input
//               name="address_line2t"
//               label="Address Line2"
//               style={{ width: 173 }}
//               value={inputField.address_line2t}
//               onChange={event => handleChangeInput(inputField.id, event)}
//             />

//             <Input
//               name="contact_not"
//               label="Contact"
//               style={{ width: 173 }}
//               value={inputField.contact_not}
//               onChange={event => handleChangeInput(inputField.id, event)}
//               error={errors.contact_not}
//             />

//             <Input
//               name="emailt"
//               label="Email"
//               style={{ width: 173 }}
//               value={inputField.emailt}
//               onChange={event => handleChangeInput(inputField.id, event)}
//               error={errors.emailt}
//             />

//             <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
//               <RemoveIcon style={{ width: 15 }} />
//             </IconButton>
//             <IconButton
//               onClick={handleAddFields}
//             >
//               <AddIcon style={{ width: 15 }} />
//             </IconButton>


//           </div>

//         ))} */}
//         <Controls.Button type="submit" text="Submit" />
//         <Controls.Button
//           text="Reset"
//           color='warning'
//           style = {{backgroundColor:"#ECEFF1"}}
//           onClick={resetForm}
//         />
//       </Grid>
//     </Form>
// </Box>
//   );

// }
// export default AddDonorTeam;