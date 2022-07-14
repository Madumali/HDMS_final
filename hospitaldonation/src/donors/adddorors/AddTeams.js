// import React, { useState, useEffect } from "react";


// import {
//   Paper,
//   TableBody,
//   TableRow,
//   TableCell,
//   Toolbar,
//   InputAdornment,
// } from "@mui/material";
// import useTable from "../../components/useTable";
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import { makeStyles} from "@material-ui/core";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import * as donors from "../services/donors";
// import ConfirmDialog from "../../components/ConfirmDialog";
// import Notification from "../../components/Notification";
// import Controls from "../../components/controls/Controls";
// import AddDonorTeam from "./AddDonorTeam";
// import Popup from "../../components/Popup";
// import { IconButton } from "@mui/material";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MemberTable from "./MemberTable";
// import EditDonorTeam from "./EditDonorTeam";
// // import EditMember from "./EditMember";
// const paperStyle = {
//   variant: "outlined",
//   padding: 20,
//   width: 500,
//   margin: "auto",
//   backgroundColor: "#EEEEEE",
// };
// const paperStyle2 = {
//   variant: "outlined",
//   padding: 20,
//   height: "auto",
//   width: "auto",
//   margin: "10px auto",
// };
// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     margin: theme.spacing(2),
//     padding: theme.spacing(5),
//     // color: theme.palette.primary.main,
//     // backgroundColor: theme.palette.primary.light,
//   },
//   table: {
//     marginTop: theme.spacing(1),
//         fontWeight: '200',
//         color: theme.palette.primary.main,
//         backgroundColor: theme.palette.primary.light,
    
// },
//   searchInput: {
//     width: "80%",
//   },
//   newButton: {
//     position: "absolute",
//     right: "2px",
//   },
// }));

// const headCells = [
 
//   { id: "donor_name", label: "Team Name" },
//   { id: "address_line1", label: "Address1" },
//   { id: "email", label: "Email" },
//   { id: "contact_no", label: "Telephone" },
//   { id: "actions", label: "Actions", disableSorting: true },
// ];

// const AddTeams = () =>{
//   const classes = useStyles();
//   // const history = useHistory()
    
//     // const [recordForEdit, setRecordForEdit] = useState(null)
//     const [check, setCheck] = useState(false);
//     // const [records, setRecords] = useState([]);
//     const [response, setResponse] = useState([]);
//     const [filterFn, setFilterFn] = useState({
//       fn: (items) => {
//         return items;
//       },
//     });
//     const [openPopup, setOpenPopup] = useState(false);
//     const [openPopup2, setOpenPopup2] = useState(false);
//     const [donorData, setDonorData] = useState([]);
//     // const [donorTeam, setDonorTeam] = useState([]);
//     const [expanding, setExpanding] = useState(false);
//     const [notify, setNotify] = useState({
//       isOpen: false,
//       message: "",
//       type: "",
//     });
//     const [confirmDialog, setConfirmDialog] = useState({
//       isOpen: false,
//       title: "",
//       subTitle: "",
//     });
//     const [recordForEdit, setRecordForEdit] = useState(null);
//     const [recordForEditP, setRecordForEditP] = useState(null);
//     // const [recordForEditT, setRecordForEditT] = useState(null);
   
  
//     const {
//       TblContainer,
//       TblHead,
//       TblPagination,
//       donorDataAfterPagingAndSorting,
//     } = useTable(donorData, headCells, filterFn);
  
//     const handleSearch = (e) => {
//       let target = e.target;
//       setFilterFn({
//         fn: (items) => {
//           if (target.value == "") return items;
//           else
//             return items.filter(
//               (x) =>
//                 x.donor_name.toLowerCase().includes(target.value) ||
//                 x.national_id.toLowerCase().includes(target.value)
//             );
//         },
//       });
//     };

//     const handleExpand = () => {
// setExpanding(!expanding)
//     }


//     useEffect(() => {
//         getAllTeams();
//       }, []);
//       const getAllTeams = () => {
//         donors.getDonorTeams()
    
//           .then((data) => {
//             if(data.msg == "No data available")
//         {
//           setResponse(data);
          
//         }
//         else {
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
    
//             setDonorData(dataarray);
//           };
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//       };


//       const addOrEditP = (tname, resetFormt) => {
//         if (tname.donor_id == null) {
//         donors
//           .insertDonorTeam("http://localhost:4000/donors/teamp", tname)
//           .then((data) => { 
//             if (data.status == 200) {
//               setNotify({
//                 isOpen: true,
//                 message: "Successfully Added",
//                 type: "success",
//               });
//             } else if (data.status == 400) {
//               setNotify({
//                 isOpen: true,
//                 message: "Something Wrong!",
//                 type: "warning",
//               });
//             }
//             getAllTeams();
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//           setOpenPopup(false);
//         } else
//           donors.updateDonorPerson(tname.donor_id, tname)
//           .then((data) => {
//             if (data.status == 200) {
//             } else if (data.status == 400) {
//               setNotify({
//                 isOpen: true,
//                 message: "Something Wrong!",
//                 type: "warning",
//               });
//             }
  
//             getAllTeams();
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
  
//           setRecordForEditP(null);
//           setOpenPopup2(false);
//           resetFormt();
    
//       };
     

//       const openInPopup = (item) => {
//         console.log("this", item);
//         setRecordForEditP(item);
//         setOpenPopup2(true);
//       };
    
      
    
//       const onDeleteP = (donor) => {
//         setConfirmDialog({
//           ...confirmDialog,
//           isOpen: false,
//         });
//         donors
//           .deleteDonor(donor.donor_id, donor)
//           .then((data) => {
//             getAllTeams();
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
    
//         setNotify({
//           isOpen: true,
//           message: "Deleted Successfully",
//           type: "error",
//         });
//       };
    

     

//     return(
//         <div>
         
//              <Paper
//             className={classes.pageContent}
//             style={{ width: "auto", margin: "20px auto" }}
//           >
//             <Toolbar>
//               <Controls.Input
//                 label="Search "
//                 className={classes.searchInput}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 onChange={handleSearch}
//               />
//                {/* <Controls.Button
//                 text="Add New"
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 className={classes.newButton}
//                 onClick={() => {
//                   setOpenPopup(true);
//                   setRecordForEdit(null);
//                 }}
//               /> */}
//             </Toolbar>
//             <TblContainer >
//               <TblHead />
//               <TableBody>
//                 {response.msg}
//                 {
//                   donorDataAfterPagingAndSorting().map((item,i) => (
//                     <TableRow key={i}  onClick={() =>  localStorage.setItem("id", item.donor_id)}  >
                      
//                       <TableCell >
//                       <IconButton onClick = {handleExpand}>
//                           <ExpandMoreIcon /></IconButton>
//                         {item.donor_name}
//                          </TableCell>
                         
//                       <TableCell>{item.address_line1}</TableCell>
//                       <TableCell>{item.email}</TableCell>
//                       <TableCell>{item.contact_no}</TableCell>
                   
//                       <TableCell>
//                         <Controls.ActionButton
//                           color="primary"
//                           onClick={() => {
//                             openInPopup(item);
//                             // localStorage.setItem("donid", item.donor_id);
//                           }}
//                         >
//                           <EditOutlinedIcon fontSize="small" />
//                         </Controls.ActionButton>
//                         <Controls.ActionButton
//                           color="error"
//                           onClick={() => {
//                             setConfirmDialog({
//                               isOpen: true,
//                               title: "Are you sure to delete this record?",
//                               subTitle: "You can't undo this operation",
//                               onConfirm: () => {
//                                 onDeleteP(item);
//                               },
//                             });
//                           }}
//                         >
//                           <CloseIcon fontSize="small" />
                         
//                         </Controls.ActionButton>
//                       </TableCell>
//                     </TableRow>
//                     ))
//                 }
                   
//                    {expanding && <MemberTable  /> }
               
//               </TableBody>
              
//             </TblContainer>
//             <TblPagination />
//           </Paper>

//           <Popup
//             title="Add Donor Form"
//             openPopup={openPopup}
//             setOpenPopup={setOpenPopup}
//           >
//           <Paper
//             elevation={10}
//             className={classes.pageContent}
//             style={paperStyle2}
//           >
//             <AddDonorTeam addOrEditP={addOrEditP}   />
//             </Paper>
//           </Popup>

//           <Popup
//           title="Edit Donor Form"
//            openPopup={openPopup2}
//            setOpenPopup={setOpenPopup2}>
//            <EditDonorTeam addOrEditP={addOrEditP}  recordForEditP={recordForEditP}/> </Popup>

//           <Notification notify={notify} setNotify={setNotify} />
//           <ConfirmDialog
//             confirmDialog={confirmDialog}
//             setConfirmDialog={setConfirmDialog}
//           />
//         </div>
//     );

// }
// export default AddTeams;