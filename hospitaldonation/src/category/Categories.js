import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import {
  Paper,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box,
  TextField,
} from "@mui/material";
import useTable from "../components/useTable";
import { makeStyles } from "@mui/styles";
import Controls from "../components/controls/Controls";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../components/Popup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import * as CategoryServise from "./seviceCategory/CategoryService";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';

const useStylesv = makeStyles((theme) => ({
  notchedOutline: {
    border: "1px solid #add8e6",
    borderRadius: 20,
  },
}));


const headCells = [

  { id: "type_code", label: "Code" },
  { id: "type_name", label: "Name" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Categories = () => {
  const classes = useStyles();
  const classess = useStylesv();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [record, setUserData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [responseData, setResponseData] = useState([]);
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
  const { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting } =
    useTable(record, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.type_name.toLowerCase().includes(target.value)||
            x.type_code.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    getCategory();
  }, []);
//THIS WILL GET ALL CATEGORY DETAILS
  const getCategory = () => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    fetch("http://localhost:4000/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
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
        console.log(dataarray);
        setUserData(dataarray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
///////THIS WILL ADD AND UPDATE CATEGORY DETAILS
  const addOrEdit = (category, resetForm) => {
    if (category.type_id == null) {
      CategoryServise.insertCategory(
        "http://localhost:4000/category/",
        category
      )
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
          getCategory();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else
      CategoryServise.updateCategory(category.type_id, category)
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

          getCategory();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    setRecordForEdit(null);
    setOpenPopup(false);

    resetForm();
  };
//DATA WILL POPUP IN FORM
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
//THIS WILL DELETE CATEGORY DETAILS
  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    CategoryServise.deleteCategory(item.type_id, item)
      .then((data) => {
        setResponseData(data);
        getCategory();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <Box className={classes.section} style={{ marginTop: 3 }}>
     
   <PageHeader
                title="New Category"
                subTitle="Create new category of donation"
                icon={<LibraryBooksTwoToneIcon fontSize="large" />}
            />
      <Paper
        className={classes.mainpaper}
        style={{ borderRadius: 5, width: "650px", margin: "0 auto" }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ paddingBottom: 15, marginTop: -10, textAlign: "center" }}
        >
          Category Details
        </Typography>
        <Divider />
        
        <Toolbar>
          <TextField
            label="Search "
            variant="outlined"
            size="small"
            className={classes.searchInput}
            InputProps={{
              classes: {
                notchedOutline: classess.notchedOutline,
              },
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

        <TblContainer>
          <TblHead />
          <TableBody>
            {
             
              recordAfterPagingAndSorting().map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.type_code}</TableCell>
                  <TableCell>{item.type_name}</TableCell>
                
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
                            onDelete(item);
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
          </TableBody>
        </TblContainer>
        <TblPagination />
        <Popup
          title="Category Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Paper className={classes.paper2}>
            <CategoryForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </Paper>
        </Popup>

        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Paper>
    </Box>
  );
};
export default Categories;
