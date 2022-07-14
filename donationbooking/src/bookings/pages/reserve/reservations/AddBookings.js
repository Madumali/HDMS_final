import React, { useState, useEffect } from "react";
import { Paper, Box, Button, Grid } from "@material-ui/core";
import BookingDonor from "./BookingDonor";
import * as bookingServices from "../../../bookservice/bookingServices";    
import Notification from "../../../../components/Notification";
import Controls from "../../../../components/controls/Controls";
import CloseIcon from '@mui/icons-material/Close';
import Popup from "../../../../components/Popup"

const AddBookings = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [display3, setDisplay3] = useState(false);
  const[ show, setShow] = useState(true);
  const [response, setResponse] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    const addOrEdit = (donitems, resetForm) => {
       console.log("this is do  items", donitems);
  
        bookingServices.insertDonor("http://localhost:4000/bookings/soupreserve",donitems )
        .then((data) =>  {
          console.log("bookdata",data)
          if (data.status == 200) {
            setNotify({
              isOpen: true,
              message: "Your reservation has been submitted!",
              type: "success",
            });
            setOpenPopup(true);
               setDisplay3(true);
               setResponse("Your reservation has been submitted.Once the reservation approved you will receive the Ingrediant List via mail.Thank You!");
          } else if (data.status == 400) {
            setNotify({
              isOpen: true,
              message: "This date can not be reserved!",
              type: "error",
            });
          }else if (data.status == 500) {
            console.log("select data please")
            setNotify({
              isOpen: true,
              message: "Please select donation",
              type: "error",
            });
          }
            })
    .catch((error) => {
      console.error("Error:", error);
    });

    resetForm()
       
    }


    


    return(
    <>
    
        <Paper >
        { display3 &&

          <Paper  style={{backgroundColor:"lightblue"}} >
          {response}
          <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setDisplay3(false); localStorage.setItem("codeid2","")}}>
                        <CloseIcon />
                    </Controls.ActionButton>
        </Paper> 
      
        }

 <BookingDonor addOrEdit={addOrEdit}/>
 <Notification
          notify={notify}
          setNotify={setNotify} />
   </Paper>
    </>
    );


}

export default AddBookings;