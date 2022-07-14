

import React, { useState, useEffect } from "react";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box,
  TextField,
} from "@material-ui/core";
import useTable from "../components/useTable";
import CloseIcon from '@mui/icons-material/Close';
import * as issuance from "./service/issuanceadd";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";
import Controls from "../components/controls/Controls";
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from "../components/BodyStyles";
import { PageHeader } from "../components/controls/Common";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";






const headCells = [
  { label: "Issue No", id: "issuance_id"},
  { label: "Issued By", id: "issued_by"},
  { label: "Issued For(dep)", id: "dep_name" },
  { label: "Issued To", id: "to_whom" },
  { label: "Issued Items", id: "itemname" },
  { label: "Item Qty", id: "issue_itemqty" },
  { label: "Date", id: "issue_date"  },

  { id: "actions", label: "Actions", disableSorting: true },
];

export const IssueList = (props) => {
 

  const classes = useStyles();
  const [record, setRecords] = useState([]);
  const [response, setResponse] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
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
  const id = localStorage.getItem("userrole");
const [auth, setAuth] = useState(true);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.issued_by.toLowerCase().includes(target.value) ||
              x.to_whom.toLowerCase().includes(target.value) ||
              x.itemname.toLowerCase().includes(target.value)
              
               
          );
      },
    });
  };

  
  useEffect(() => {
    getAllIssues();
  }, []);
  const getAllIssues = () => {
    issuance
      .getIssuanceAll()

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const donations = {
            id: key,
            ...data[key],
          };
          dataarray.push(donations);
        }
        console.log(dataarray);

        setRecords(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };

  useEffect(()=>{
    if(id == "admin")
    {
      setAuth(true);
    } else {
      setAuth(false);
    }
   
    }, []);

  const onDeleteP = (donation) => {
  setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    issuance
      .deleteDonationIssue(donation.issueId, donation)
      .then((data) => {
        getAllIssues();
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



  return (
   <>
  <Box className={classes.section} style={{marginTop:3}} >
    <PageHeader  title="All Issuances"
                subTitle="List of all issues"
                icon={<LocalShippingTwoToneIcon fontSize="large" />}/>
  <Paper className={classes.mainpaper} style={{width: "auto",borderRadius:5}}>
             
            <Toolbar>
            <TextField
               variant = "outlined"
               size="small"
                label="Search "
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
            
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {response.msg}
                {
                  recordAfterPagingAndSorting().map((item,i) => (
                    <TableRow key={i}>
                      <TableCell>{item.issuance_id}</TableCell>
                      <TableCell>{item.issued_by}</TableCell>
                      <TableCell>{item.dep_name}</TableCell>
                      <TableCell>{item.to_whom}</TableCell>
                      <TableCell>{item.itemname}</TableCell>
                      <TableCell>{item.issue_itemqty}</TableCell>
                      <TableCell>{item.issue_date}</TableCell>
                      {auth && (
                      <TableCell>
                        <Controls.ActionButton
                          color="error"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              onConfirm: () => {
                                onDeleteP(item);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                      </TableCell>
                      )}
                    </TableRow>
                  ))
                }
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>

      </Box>
           <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />

          
     </>
   
  );
};

export default IssueList;




