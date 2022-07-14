// import React, { useState, useEffect } from "react";
// // import { useHistory, useLocation, useParams, withRouter } from 'react-router-dom';
// import * as donors from "../services/donors";
// import ConfirmDialog from "../../components/ConfirmDialog";
// import Notification from "../../components/Notification";
// import Controls from "../../components/controls/Controls";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import CloseIcon from '@mui/icons-material/Close';
// import Popup from "../../components/Popup";
// import {
//   Paper,
//   TableBody,
//   TableRow,
//   TableCell,
//   Toolbar,
//   InputAdornment,
// } from "@mui/material";
// import { makeStyles } from "@material-ui/core";
// import useTable from "../../components/useTable";
// import { set } from "lodash";
// import EditMember from "./EditMember";


// const paperStyle = {
//     variant: "outlined",
//     padding: 20,
//     width: 500,
//     margin: "auto",
//     backgroundColor: "#EEEEEE",
//   };
//   const paperStyle2 = {
//     variant: "outlined",
//     padding: 20,
//     height: "auto",
//     width: "auto",
//     margin: "10px auto",
//   };
//   const useStyles = makeStyles((theme) => ({
//     pageContent: {
//       margin: theme.spacing(2),
//       padding: theme.spacing(5),
//       // color: theme.palette.primary.main,
//       // backgroundColor: theme.palette.primary.light,
//     },
//     table: {
//       marginTop: theme.spacing(1),
//           fontWeight: '200',
//           color: theme.palette.primary.main,
//           backgroundColor: theme.palette.primary.light,
      
//   },
//     searchInput: {
//       width: "80%",
//     },
//     newButton: {
//       position: "absolute",
//       right: "2px",
//     },
//   }));

  
  

// const headCells = [
//     { id: "national_idt", label: "NIC" },
//     { id: "membername", label: "Member Name" },
//     { id: "address_line1t", label: "Address1" },
//     { id: "address_line2t", label: "Address2" },
//     { id: "contact_not", label: "Telephone" },
//     { id: "emailt", label: "Email" },
   
//     { id: "actions", label: "Actions", disableSorting: true },
//   ];
// const MemberTable = () => {
 

//     const classes = useStyles();
//     const [recordForEditT, setRecordForEditT] = useState(null);
//     const [response, setResponse] = useState([]);
//     const [donorTeam, setDonorTeam] = useState([]);
//     const [openPopup, setOpenPopup] = useState(false);
//     const [notify, setNotify] = useState({
//       isOpen: false,
//       message: "",
//       type: "",
//     });
//     const [confirmDialog, setConfirmDialog] = useState({
//         isOpen: false,
//         title: "",
//         subTitle: "",
//       });
//       // const [recordForEditT, setRecordForEditT] = useState(null);
//     const {
//         TblContainer,
//         TblHead,
//         TblPagination,
//         donorDataAfterPagingAndSorting,
//       } = useTable(donorTeam, headCells);

//       const openInPopup = (item) => {
//         console.log("this is a member", item);
//         setRecordForEditT(item);
//         setOpenPopup(true);
//       };

//       useEffect(() => {
//         getMembers();
//       }, []);


//       const getMembers = () => {  
//         const token = localStorage.getItem('authToken');
//         const id = localStorage.getItem('id');
//         console.log(token, 'token');
//         return fetch("http://localhost:4000/donors/"+id,
//         {
//           method: "GET",
//           headers:  {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization' : 'Bearer ' + token
//           }
//         })
//         .then((response) =>
//            response.json()
         
//         )
//           .then((data) => {
//             console.log(data);
//             if(data.msg == "No data available")
//             {
//               setResponse(data);
//               // setDonorTeam(data);
//             }
//             else {
//             const dataarray = [];
//             // setUserData(arr);
//             for (const key in data) {
//               const category = {
//                 id: key,
//                 ...data[key],
//               };
//               dataarray.push(category);
//             }
//             console.log(dataarray);
    
//             setDonorTeam(dataarray);
//           }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
     
//         }

//         const addOrEditTM = (team, resetFormt) => {
//           if(team.teamid != null)
//           {
//             donors
//             .updateDonorTeam(team.teamid, team)
//             .then((data) => {
//               if (data.status == 200) {
//                 setNotify({
//                   isOpen: true,
//                   message: "Successfully Added",
//                   type: "success",
//                 });
//               } else if (data.status == 400) {
//                 setNotify({
//                   isOpen: true,
//                   message: "Something Wrong!",
//                   type: "warning",
//                 });
//               }
    
//               getMembers();
             
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//           }
//             setRecordForEditT(null);
//         setOpenPopup(false);
//         resetFormt();
    
//           }
        
//         //   setNotify({
//         //     isOpen: true,
//         //     message: "Successfull",
//         //     type: "success",
//         //     //show:{msg}
//         //   });
    
      
//         //  setRecords()
   

//     // const addOrEditT = (team, resetFormt) => {
//     //   if(team.teamid != null) {
//     //     donors
//     //     .updateDonorTeam(team.teamid, team)
//     //     .then((data) => {
//     //       if (data.status == 200) {
//     //         setNotify({
//     //           isOpen: true,
//     //           message: "Successfully Added",
//     //           type: "success",
//     //         });
//     //       } else if (data.status == 400) {
//     //         setNotify({
//     //           isOpen: true,
//     //           message: "Something Wrong!",
//     //           type: "warning",
//     //         });
//     //       }

//     //       getMembers();
         
//     //     })
//     //     .catch((error) => {
//     //       console.error("Error:", error);
//     //     });
//     //     setRecordForEditT(null);
//     // setOpenPopup(false);
//     // resetFormt();
//     //   }
//     //   }
//     //   // else
//     //   // employeeService.updateEmployee(employee)
  
//     //   setNotify({
//     //     isOpen: true,
//     //     message: "Successfull",
//     //     type: "success",
//     //     //show:{msg}
//     //   });
//     //   //  setRecords()
//     // };

//     const onDeleteP = (donor) => {
//       setConfirmDialog({
//         ...confirmDialog,
//         isOpen: false,
//       });
//       donors
//         .deleteDonorMember(donor.teamid, donor)
//         .then((data) => {
//           getMembers();
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
  
//       setNotify({
//         isOpen: true,
//         message: "Deleted Successfully",
//         type: "error",
//       });
//     };



//       return(
//         <>
        
//       <Paper
      
//       className={classes.pageContent}
//       style={{ width: "auto", margin: "20px auto" }}
//     >
    
//       <TblContainer>
//         <TblHead />
//         <TableBody>
  
//           {
//             donorTeam.map((item,i) => (
              
//                 <TableRow key={i}>
              
//                 <TableCell>{item.national_idt}</TableCell>
//                 <TableCell>{item.membername}</TableCell>
//                 <TableCell>{item.address_line1t}</TableCell>
//                 <TableCell>{item.address_line2t}</TableCell>
//                 <TableCell>{item.contact_not}</TableCell>
//                 <TableCell>{item.emailt}</TableCell>
//                 <TableCell>
//                   <Controls.ActionButton
//                     color="primary"
//                     onClick={() => {
//                       openInPopup(item);
//                     }}
//                   >
//                     <EditOutlinedIcon fontSize="small" />
//                   </Controls.ActionButton>
//                   <Controls.ActionButton
//                     color="error"
//                     onClick={() => {
//                       setConfirmDialog({
//                         isOpen: true,
//                         title: "Are you sure to delete this record?",
//                         subTitle: "You can't undo this operation",
//                         onConfirm: () => {
//                           onDeleteP(item);
//                         },
//                       });
//                     }}
//                   >
//                     <CloseIcon fontSize="small" />
//                     {item.teamid}
//                   </Controls.ActionButton>
//                 </TableCell>
//               </TableRow>
//             ))
//           }
//                 {response.msg}
//         </TableBody>
//       </TblContainer>
//       {/* <TblPagination /> */}
//     </Paper>
   
//     <Popup
//           title="Edit mEMBER Form"
//            openPopup={openPopup}
//            setOpenPopup={setOpenPopup}>
//            <EditMember addOrEditTM={addOrEditTM}   recordForEditT={recordForEditT}/> </Popup>



//            {/* addOrEditT={addOrEditT} */}
//            <Notification notify={notify} setNotify={setNotify} />
//           <ConfirmDialog
//             confirmDialog={confirmDialog}
//             setConfirmDialog={setConfirmDialog}
//           />
//     </>
//     );



// }
// export default  MemberTable;


// {/* <TblContainer >
// <TableRow className={classes.table}>
// <TableCell>
// <TableHead >NIC</TableHead></TableCell><TableCell><TableHead >Member Name</TableHead></TableCell> <TableCell>
// <TableHead >Address1</TableHead></TableCell><TableCell><TableHead >Address2</TableHead></TableCell> <TableCell>
// <TableHead >Contact</TableHead></TableCell><TableCell><TableHead >Email</TableHead></TableCell></TableRow>
// <TableBody>
// {/* {donorTeam.map((item)=> ( */}
// {/* <TableRow key={item.teamid}>
// <TableCell>{item.national_id}</TableCell>
// <TableCell>{item.membername}</TableCell>
// <TableCell>{item.address_line1t}</TableCell>
// <TableCell>{item.address_line2t}</TableCell>
// <TableCell>{item.contact_not}</TableCell>
// <TableCell>{item.emailt}</TableCell> */}

