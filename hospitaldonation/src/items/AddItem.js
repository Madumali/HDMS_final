import React, {useState, useEffect} from "react";
import AddItemForm from "./AddItemForm";
import {
    Box,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    TextField,
    InputAdornment,
  } from "@mui/material";
  import { makeStyles } from "@material-ui/core";
  import useTable from "../components/useTable";
  import SearchIcon from '@mui/icons-material/Search';
  import AddIcon from '@mui/icons-material/Add';
  import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
  import CloseIcon from '@mui/icons-material/Close';
  import * as items from "../items/itemservice/items";
  import ConfirmDialog from "../components/ConfirmDialog";
  import Notification from "../components/Notification";
  import Controls from "../components/controls/Controls";
  import Popup from "../components/Popup";
  import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
  import Divider from '@mui/material/Divider';
  import Typography from '@mui/material/Typography';
  import { useStyles } from "../components/BodyStyles";
  import { PageHeader } from "../components/controls/Common";

  const useStylesv = makeStyles(theme => ({
    notchedOutline: {
      border:'1px solid #add8e6',
      borderRadius:20,
       
         
  },
  }))


  
  const headCells = [
   
    { id: "code", label: "Item Code" },
    { id: "name", label: "Item Name" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  

const AddItem = ()=> {
    const classes = useStyles();
    const classess = useStylesv();
    const [openPopup2, setOpenPopup2] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
   
    const [nameselected, setNameSelected ]= useState('');
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
          return items;
        },
      });
      const [openPopup, setOpenPopup] = useState(false);
      const [record, setData] = useState([]);
      const [categoryData, setCategoryData ] = useState([]);
      const [response, setResponse] = useState([]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
      });
      const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
      });


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordAfterPagingAndSorting,
      } = useTable(record, headCells, filterFn);

  

      useEffect(()=>{
        getCategory();
        // setUserData([]);
    }, []);

    const getCategory = () => {
     
        const token = localStorage.getItem('authToken');
        // console.log(token, 'token');
        fetch("http://localhost:4000/category/",
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
          return response.json()
         
        })
            
            .then(data => {
              //  console.log(data);
               const dataarray = [];
               // setUserData(arr);
               for (const key in data){
                   const category = {
                       id:key,
                       ...data[key]
                   };
                   dataarray.push(category);
               }
              //  console.log(dataarray);
              //  JSON.parse(arr);
                setCategoryData(dataarray);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
    }

  useEffect(()=>{
        getItems();
        // setUserData([]);
    }, []);
  


const getItems = () => {
  const token = localStorage.getItem('authToken');
  // console.log(token, 'token');
  fetch("http://localhost:4000/items/",
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
   
  }) .then(data => {
        //  console.log("myitems", data);
         if(data.msg == "No data available")
         {
           setResponse(data);
           // setDonorTeam(data);
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
          setData(dataarray);
          setResponse(dataarray);
      }
        })
        .catch((error) => {
          console.error('Error:', error);
        })

}

    const addOrEdit = (item, resetForm) => {
        if (item.id == null) {
            items
              .insertItems("http://localhost:4000/items", item)
              .then((data) => {
                if (data.status == 200) {
                  setNotify({
                    isOpen: true,
                    message: "Successfully Added",
                    type: "success",
                  });
                } else if (data.status == 400) {
                  setNotify({
                    isOpen: true,
                    message: "Something Wrong!",
                    type: "warning",
                  });
                }
              //  changeCategory();
              getItems()
              })
              .catch((error) => {
                console.error("Error:", error);
              });
              setOpenPopup(false);
            } else
              items.updateItems(item.id, item)
              .then((data) => {
                if (data.status == 200) {
                  setNotify({
                    isOpen: true,
                    message: "Successfully Updated",
                    type: "success",
                  });
                } else if (data.status == 400) {
                  setNotify({
                    isOpen: true,
                    message: "Something Wrong!",
                    type: "warning",
                  });
                }
                // changeCategory(item);
                // getItems();
              })
              .catch((error) => {
                console.error("Error:", error);
              });
      
              setRecordForEdit(null);
              setOpenPopup(false);
              resetForm();
        
    }


      const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
          fn: (items) => {
            if (target.value == "") return items;
            else
              return items.filter(
                (x) =>
                  x.itemname.toLowerCase().includes(target.value) ||
                  x.code.toLowerCase().includes(target.value)
              );
          },
        });
      };
  
      const openInPopup = (item) => {
        console.log("this", item);
        setRecordForEdit(item);
        setOpenPopup(true);
      };
       
      const onDeleteP = (item) => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        items
          .deleteItem(item.id, item)
          .then((data) => {
            getItems();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });


      }



      
    return(
      <Box className={classes.section} style={{marginTop:3}} >

    <PageHeader
                title="New Item"
                subTitle="Create new item to donate"
                icon={<ListAltTwoToneIcon fontSize="large" />}
            />
  <Paper className={classes.mainpaper} style={{borderRadius:5, width:"650px", margin:"0 auto"}}>
      <Typography variant="h5" component="div"  sx={{ flexGrow: 1 }} style={{paddingBottom:15,marginTop:-10, textAlign : "center"}}>
        Add Items
        </Typography>
       <Divider /> 
         
         
  



{/* <Controls.SelectItem
                 name="type_code"
                 label="Item Category"
                 value={values.type_code || ''}
                 options={categoryData}
                 onChange={changeCategory}
             >
           
               </Controls.SelectItem> */}
               
            
               
{/* <AddItemForm addOrEdit={addOrEdit}/> */}


  

             

              {/* <Paper  className={classes.paper2} style={{width:"550px",marginLeft:"70px" , marginTop:"20px"}}  > */}
            
            <Toolbar>
           
           
              <TextField
                label="Search "
                variant = "outlined"
                size="small"
                className={classes.searchInput}
                InputProps={{
      
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            
            <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />   
            </Toolbar>
         
            <TblContainer >
              <TblHead />
              <TableBody>
            
                {
                  recordAfterPagingAndSorting().map((item) => (
                    <TableRow key={item.id} >
                      
                      <TableCell >
                      
                        {item.code}
                         </TableCell>
                         
                      <TableCell>{item.itemname}</TableCell>
                   
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            openInPopup(item);
                          
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="error"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDeleteP(item);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                         
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                    ))
                }
                   
                   {response.msg}
               
            </TableBody>  
            </TblContainer>
            <TblPagination />

          <Popup
            title="Add Items Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}  
          >
          <Paper
            className={classes.paper2}
          >
        <AddItemForm addOrEdit={addOrEdit}  recordForEdit={recordForEdit}/>

            </Paper>
          </Popup>

          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          {/* </Box> */}
           </Paper>
          </Box>
   );

}

export default AddItem;