const db_connection = require("../routes/config/database");
var dt = require("./date");
const nodemailer = require("nodemailer");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const datenow = dt.date();
const bcrypt = require("bcryptjs"); //package for hashing the password

module.exports = {
  registerDonors,
  verifyEmail,
  authenticationDonor,
  registerBooking,
  selectBookDate,
  selectBookings,
  updateBookingDelete,
  selectBookingsForApproval,
  updateApprove,
  updateApproveReject,
  updatePassword,
  selectApprovedBookings,
  confirmDonationReceive,
  confirmDonationNotReceive,
  selectAllBookingsForDash,
  getapproveBookingsForPass,
};

let hashedPass = "";

//THIS WILL UPDATE PASSWORD
const updateforgetpass = (con, id, payload) => {
  console.log(payload, "ASDADASDASDADS");
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `donor_all` SET `donor_password`= ? WHERE `email`= ? ";

    con.query(sql, [hashedPass, payload.email], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};

async function updatePassword(id, payload) {
  try {
    const conn = await db_connection();
    hashedPass = await bcrypt.hash(payload.donor_password, 10);
    const response = await updateforgetpass(conn, id, payload);
    console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Password Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: " already exist" };
    }
    return { status: 400, msg: "Something rrrrr" };
  }
}
//THIS WILL UPDATE PASSWORD

//email sender detail
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nadeeshamadumalihettiarachchi@gmail.com",
    pass: "qiuqwymsqnsbnvzr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
////////////////////////////SIGNUP BOOKING DONOR////////////////////////////////
const saveReserveDonors = (con, payload) => {
  console.log("booking", payload);
  var mail = {
    email: payload.email,
  };
  const token_mail = jwt.sign(mail, config.secret, { expiresIn: "1d" });
  var url = "http://localhost:3001/bookings/verify/" + token_mail;

  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT COUNT(`donor_id`) as idct FROM `donor_all`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].idct + 1;
      const query =
        "INSERT INTO `donor_all`(`donor_id`, `R/D`, `donor_type`, `title`, `national_id`, `donor_name`, `email`, `contact_no`, `reg_date`, `donor_password`, `isVerified`, `isBloodDon`, `delete_status`) VALUES (" +
        iddd +
        ",?) ";
      var val = [
        "B",
        "person",
        payload.title,
        payload.national_id,
        payload.donor_name,
        payload.email,
        payload.contact_no,
        datenow,
        hashedPass,
        "0",
        "0",
        "0",
      ];
      con.query(query, [val], function (err, result) {
        if (err) return reject(err);
        console.log(result);
        resolve(result);

        //send verification email to donor
        var mailOptions = {
          from: '"Verify your email" <nadeeshamadumalihettiarachchi@gmail.com>',
          to: payload.email,
          subject: "Account Verification",
          html: `<p><b>${payload.donor_name}</b>! Thanks for registering on our site, kindly use this <a href=${url}>link</a> to verify your email address</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return reject(error);
          } else {
            console.log("Email sent: " + info.response);
            resolve(info);
          }
        });
      });
    });
  });
};

async function registerDonors(payload) {
  try {
    const conn = await db_connection();
    hashedPass = await bcrypt.hash(payload.donor_password, 10);
    const response = await saveReserveDonors(conn, payload);
    if (response.donor_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return {
        status: 200,
        msg: "Please Check Your Email Id to Confirm Registration",
        response,
      };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}
////////////////////////////END OF SIGNUP BOOKING DONOR////////////////////////////////

///////////////////////////////VERIFY SIGNUP EMAIL////////////////////////////////
const verifymail = (con, token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, config.secret, (e, decoded) => {
        if (e) {
          console.log(e);
        } else {
          email = decoded.email;
          const selectQuery =
            "SELECT isVerified FROM donor_all WHERE email='" + email + "'";
          con.query(selectQuery, function (err, resultt) {
            if (err) return reject(err);
            if (resultt[0].isVerified == "0") {
              const sqlqry =
                "UPDATE donor_all SET isVerified = 1 WHERE email='" +
                email +
                "'";
              console.log(sqlqry);
              con.query(sqlqry, function (err, result) {
                if (err) return reject(err);
                if (result.length < 1) {
                  return resolve([]);
                } else {
                  resolve(result);
                }
              });
            } else {
              console.log("2");
              resolve(resultt[0]);
              console.log("elsepart", resultt[0]);
            }
          });
        }
      });
    }
  });
};

async function verifyEmail(token) {
  try {
    const conn = await db_connection();
    const response = await verifymail(conn, token);
    const r = response;
    console.log("this is verification", r);
    if (response.length < 1) {
      return { statusTxt: "", msg: "No data available" };
    } else {
      if (response.isVerified == 1) {
        return {
          response,
          statusTxt: "true",
          msg: "Email has Already Verified!",
        };
      } else {
        return {
          response,
          statusTxt: "success",
          msg: "Email Verification Success!",
        };
      }
    }
  } catch (e) {
    console.error;
  }
}
///////////////////////////////END OF VERIFY SIGNUP EMAIL////////////////////////////////

//////////////////////LOGIN AUTHENTICATION////////////////////
const loginDonor = (con, email) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `email` = '" + email + "' ; ",

      function (err, result) {
        console.log("sible", result);
        if (err) return reject(err);

        if (result.length < 1) {
          return resolve([]);
        } else {
          return resolve(result[0]);
        }
      }
    );
  });
};
let actualPass = "";
async function authenticationDonor({ email, donor_password }) {
  try {
    const conn = await db_connection();
    const response = await loginDonor(conn, email, donor_password);
    console.log("login", response);
    hashedPass = await bcrypt.hash(response.donor_password, 10);
    actualPass = bcrypt.compareSync(donor_password, response.donor_password);
    if (response) {
      if (actualPass) {
        const token = jwt.sign({ sub: response.donor_id }, config.secret, {
          expiresIn: "1d",
        });
        return {
          ...omitPassword(response),
          token,
          status: 200,
        };
      } else {
        return { status: 400, msg: "Password does not match", response };
      }
    }
  } catch (e) {
    console.error;
  }
}
//////////////////////END OF LOGIN AUTHENTICATION////////////////////

//////////////////////// BOOK SOUP/MEAL DONATION
const saveReserve = (con, payload) => {
  var type = payload.idnm;
  var date = payload.reserved_date;
  var morning = payload.morning;
  var eve = payload.evenng;
  if (date > datenow) {
    return new Promise((resolve, reject) => {
      const selectQuery =
        "SELECT COUNT(`booking_id`) as bookCount FROM `bookings`";
      con.query(selectQuery, function (err, resultt) {
        if (err) return reject(err);
        console.log(err);

        let iddd = resultt[0].bookCount + 1;

        if (type == "SP") {
          var descrip = "soup";
          // if ((morning == 0 && eve != 0) && (morning != 0 && eve == 0)) {
            const query =
              "INSERT INTO `bookings`(`booking_id`,`temp_donor`, `reserved_date`, `reserved_in`, `reserve_status`, `reserve_delete`, `approve`) VALUES  (" +
              iddd +
              ",?) ";
            var val = [
              payload.temp_donor,
              payload.reserved_date,
              datenow,
              "1",
              "0",
              "pending",
            ];
            con.query(query, [val], function (err, result) {
              if (err) return reject(err);
              console.log(result);
              resolve(result);
            });

            //this part will work if the reservation is for soup

            let query2 =
              "INSERT INTO `temp_item_table`(`bookingId`, `code`, `item_name`, `item_qty`, `item_description`, `action`) VALUES  (" +
              iddd +
              ",?) ";

            var val2 = [payload.idnm, payload.item_name, "0", descrip, "0"];
            console.log("query2", query2);
            con.query(query2, [val2], function (err, result) {
              if (err) return reject(err);

              console.log(err);

              resolve(result);

              const sqlselect =
                "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.temp_donor = " +
                payload.temp_donor +
                " ";
              con.query(sqlselect, function (err, results) {
                if (err) return reject(err);

                console.log(err);

                resolve(results);
                results.forEach((element) => {});
                var donorname = results[0].donor_name;
                var donorEmail = results[0].email;
                //send email to bookingdonor
                var mailOptions = {
                  from: "<nadeeshamadumalihettiarachchi@gmail.com>",
                  to: donorEmail,
                  subject: "Reservation for Donation",
                  html: ` 
              <head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Welcome Email</title>
</head>
<body>
<b> Dear ${donorname},</b>
   
<p> 
 Thank you for the reservation,Once the reservation is approved you will receive ingrediant list for your donation
</p>
<h5> Thank You,</h5>
<h5> Apeksha Hospital,<br/>
 Heath Informatics,<br/>
 Donation Department</h5>
</body>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    return reject(error);
                  } else {
                    console.log("Email sent: " + info.response);
                    resolve(info);
                  }
                });
              });
            });

            //This query insert quantity details to stock table

            const query3 =
              "INSERT INTO `soup`(`donation_num`, `morning`, `evening`) VALUES  (" +
              iddd +
              ",?) ";
            console.log("query3", query3);
            var val3 = [payload.morning, payload.evening];
            con.query(query3, [val3], function (err, result) {
              if (err) return reject(err);
              console.log(result);
              resolve(result);
            });
          // } else {
          //   return reject(err);
          // } //IF MORNING AND EVENING NOT EMPTY
          //if booking is not a soup donation
        } else if (type == "ML") {
          const query =
            "INSERT INTO `bookings`(`booking_id`,`temp_donor`, `reserved_date`, `reserved_in`, `reserve_status`, `reserve_delete`, `approve`) VALUES  (" +
            iddd +
            ",?) ";
          var val = [
            payload.temp_donor,
            payload.reserved_date,
            datenow,
            "1",
            "0",
            "pending",
          ];
          con.query(query, [val], function (err, result) {
            if (err) return reject(err);
            console.log(result);
            resolve(result);

            //this code part will work if the booking is not a soup
            var descrip = "meal";
            let query2 =
              "INSERT INTO `temp_item_table`(`bookingId`, `code`, `item_name`, `item_qty`, `item_description`, `action`) VALUES (" +
              iddd +
              ",?) ";

            var val2 = [payload.idnm, payload.item_name, 0, descrip, "0"];
            con.query(query2, [val2], function (err, result) {
              if (err) return reject(err);

              console.log(err);

              resolve(result);

              const sqlselect =
                "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.temp_donor = " +
                payload.temp_donor +
                " ";
              con.query(sqlselect, function (err, results) {
                if (err) return reject(err);

                console.log(err);

                resolve(results);

                var donorname = results[0].donor_name;
                var donorEmail = results[0].email;
                //send email to bookingdonor
                var mailOptions = {
                  from: "<nadeeshamadumalihettiarachchi@gmail.com>",
                  to: donorEmail,
                  subject: "Reservation for Donation",
                  html: `
              
              <head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Welcome Email</title>
</head>
<body>
<b> Dear ${donorname},</b>
   
<p> 
 Thank you for the reservation,Once the reservation is approved you will receive ingrediant list for your donation
</p>
<h5> Thank You,</h5>
<h5> Apeksha Hospital,<br/>
 Heath Informatics,<br/>
 Donation Department</h5>
</body>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    return reject(error);
                  } else {
                    console.log("Email sent: " + info.response);
                    resolve(info);
                  }
                });
              });
            });
          });
        } else {
          //if type empty
          return reject(err);
        }
      });
    });
  } else {
    return { mesg: "can not reserve" };
  } /// END OF DATE CHECKING
};

async function registerBooking(payload) {
  try {
    const conn = await db_connection();
    const response = await saveReserve(conn, payload);
    if (response.mesg == "can not reserve") {
      return { status: 400, msg: "Can not reserve this date", response };
    } else {
      return { status: 200, msg: "Booking added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_PARSE_ERROR") {
      return { status: 400, msg: "Something is Wrong" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}

////////////////////////END OF BOOK SOUP/MEAL DONATION//////////////////////

///////////////////RESERVED DATES WILL SHOWN IN CALENDAR//////////////////
const selectAllML = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT reserved_date as dates, month(reserved_date) as month  FROM `bookings` WHERE reserve_delete = 0 AND approve = 'approve'  ORDER BY month;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectBookDate() {
  try {
    const conn = await db_connection();
    const response = await selectAllML(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
///////////////////END OF RESERVED DATES WILL SHOWN IN CALENDAR//////////////////////////////////////

//////////////////////////////SELECT ALL BOOKING FOR EACH TEMPORARY DONOR//////////////////////////////////////
const selectAllBookin = (con, id) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT *  FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code LEFT JOIN soup ON bookings.booking_id = soup.donation_num WHERE temp_donor = " +
        id +
        " AND reserve_delete = 0 ;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectBookings(id) {
  try {
    const conn = await db_connection();
    const response = await selectAllBookin(conn, id);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
//////////////////////////////END OF SELECT ALL BOOKING FOR EACH TEMPORARY DONOR///////////////////////////////////////////////////////

//////////////////CANCEL BOOKING (IF IT IS NOT APPROVED BY THE DONATION DEPARTMENT)///////////////////////////////////////////////////////
const deletebook = (con, id, payload) => {
  const approval = payload.approve;

  if (approval !== "approve") {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `bookings` SET `reserve_delete` = 1  WHERE `booking_id`= ? ";
      con.query(sql, [payload.booking_id], function (err, result) {
        console.log(err, result, "result, error");
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    return { mesg: "Can not delete" };
  }
};
async function updateBookingDelete(id, payload) {
  try {
    const conn = await db_connection();
    const response = await deletebook(conn, id, payload);
    if (response.length < 1) return "No Data";
    else if (response.mesg == "Can not delete")
      return {
        msg: "Can not delete",
      };
    if (response) return { status: 200, msg: "Deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error(e);
  }
}
//////////////////END OF CANCEL BOOKING (IF IT IS NOT APPROVED BY THE DONATION DEPARTMENT)/////////////////////////////////////////////////////////////

//////////////SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT/////////////////////////////////////////////////////////////

const selectAllBookings = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT *  FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code LEFT JOIN soup ON bookings.booking_id = soup.donation_num INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id WHERE reserve_delete = 0 AND approve = 'pending' ORDER BY booking_id ;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{ booking_id: 0 }]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectBookingsForApproval() {
  try {
    const conn = await db_connection();
    const response = await selectAllBookings(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
//////////////END OF SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT//////////////////////////////////////////////////////////

///////////////////////THIS WILL UPDATE APPROVE//////////////////////////////////////////////////////////
const updateapproval = (con, id, payload) => {

  console.log("this issss", payload)
  return new Promise((resolve, reject) => {
    const selectqry =
      "SELECT COUNT(approve) as approvals, COUNT(temp_donor) as donor, COUNT(item_name)as item, COUNT(reserved_date) as resDate FROM bookings INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId WHERE approve = 'approve' AND reserved_date = '" +
      payload.reserved_date +"'";
    con.query(selectqry, function (err, resultt) { ////start of count approves for day
      if (err) return reject(err);
      console.log(err);
      resolve(resultt);
      let approves = resultt[0].approvals;

      if (approves == 2) {
        return  "mmm" ;
      }
       else if (approves < 2) { ///if approve count is less than 3 reservation will be approved.otherwise error

        const sql =
          "UPDATE `bookings` SET `approve`= ?  WHERE `booking_id`= ? ";
        con.query(sql, ["approve", payload.booking_id], function (err, result) {/////updating approve status as approve
          console.log(err, result, "result, error");
          if (err) return reject(err);
          if (result.length < 1) {
            return resolve([]);
          } else {
            resolve(result);

            //send email with list
            const sqlselect =
              "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.booking_id = " +
              payload.booking_id +
              " ";
            con.query(sqlselect, function (err, results) {
              if (err) return reject(err);

              console.log(err);

              resolve(results);

              var donorname = results[0].donor_name;
              var donorEmail = results[0].email;
              var itemname = results[0].itemname;

              if (itemname == "Meal") {
                //send email to bookingdonor
                var mailOptions = {
                  from: "<nadeeshamadumalihettiarachchi@gmail.com>",
                  to: donorEmail,
                  attachments: [
                    {
                      filename: "meal.jpeg",
                      path: "./api/booking/attachments/meal.jpeg",
                    },
                  ],
                  subject: "Reservation Approved",
                  html: `
  <head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Welcome Email</title>
</head>
<body>
<h2> Dear ${donorname} </h2>
<p>We're glad to inform you that your reservation has been approved.Please find the attachment of list of meal ingrediants </p>
<h5> Thank You,</h5>
<h5> Apeksha Hospital,<br/>
 Heath Informatics,<br/>
 Donation Department</h5>
</body>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    return reject(error);
                  } else {
                    console.log("Email sent: " + info.response);
                    resolve(info);
                  }
                });
              } else if (itemname == "Soup") {
                //send email to bookingdonor
                var mailOptions = {
                  from: "<nadeeshamadumalihettiarachchi@gmail.com>",
                  to: donorEmail,
                  attachments: [
                    {
                      filename: "soup.jpeg",
                      path: "./api/booking/attachments/soup.jpeg",
                    },
                  ],
                  subject: "Reservation Approved",
                  html: `
  <head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Welcome Email</title>
</head>
<body>
<h2> Dear ${donorname}</h2>
<p>We're glad to inform you that your reservation has been approved.Please find the attachment of list of soup ingrediants </p>
<h5> Thank You,</h5>
<h5> Apeksha Hospital,<br/>
 Heath Informatics,<br/>
 Donation Department</h5>
</body>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    return reject(error);
                  } else {
                    console.log("Email sent: " + info.response);
                    resolve(info);
                  }
                });
              }
            });
          }
        }); /////end of updating approve status as approve
        
      }///if approve count is less than 3 reservation will be approved.otherwise error
    }); ////end of count approves for day
  });
};

async function updateApprove(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateapproval(conn, id, payload);
    console.log("response", response);
    const counts = response[0].approvals;
    if (response.length < 1) {
      return "No Data";
    }
    if (response) {
      

      if (counts == 2) {
        return { status: 400, msg: "Can not approve", response };
      } 
      // else if (countsdon == 1) {
      //   return { status: 400, msg: "Can not approve don ", response };
      // } else if (countsitem == 1) {
      //   return { status: 400, msg: "Can not approve item", response };
      // }
       else {
        return { status: 200, msg: "Updated successfully", response };
      }
    } else {
      return { status: 400, msg: "Something wrong", response };
    }
  } catch (e) {
    console.error(e);
  }
}
///////////////////////END OF THIS WILL UPDATE APPROVE///////////////////////////////////////////

//THIS WILL UPDATE APPROVE AS REJECT///////////////////////////////////////////
const updateapprovalReject = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `bookings` SET `approve`= ?  WHERE `booking_id`= ? ";
    con.query(sql, ["reject", payload.booking_id], function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);

        //send email with list
        const sqlselect =
          "SELECT * FROM bookings INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code WHERE bookings.booking_id = " +
          payload.booking_id +
          " ";
        con.query(sqlselect, function (err, results) {
          if (err) return reject(err);

          console.log(err);

          resolve(results);
          results.forEach((element) => {});
          var donorname = results[0].donor_name;
          var donorEmail = results[0].email;
          var itemname = results[0].itemname;

          //send email to bookingdonor
          var mailOptions = {
            from: "<nadeeshamadumalihettiarachchi@gmail.com>",
            to: donorEmail,
            subject: "Reservation Rejected",
            html: `
  <head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Welcome Email</title>
</head>
<body>
<h2> Dear ${donorname} </h2>
<p>We're sorry to inform you that your reservation has been rejected because the date is already reserved. Please reserve another date.Sorry for the inconvenience caused. </p>
<h5> Thank You,</h5>
<h5> Apeksha Hospital,<br/>
 Heath Informatics,<br/>
 Donation Department</h5>
</body>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return reject(error);
            } else {
              console.log("Email sent: " + info.response);
              resolve(info);
            }
          });
        });
      }
    });
  });
};

async function updateApproveReject(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateapprovalReject(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response) return { status: 200, msg: "Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}
//////////////////////////////////////////////////END OF THIS WILL UPDATE APPROVE AS REJECT////////////////////////////////////////////////

//////////////////////////////////////////////////SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT////////////////////////////////////////////////

const selectApprovedBook = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT *  FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code LEFT JOIN soup ON bookings.booking_id = soup.donation_num INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id WHERE reserve_delete = 0 AND approve = 'approve' ORDER BY booking_id ;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{ booking_id: 0 }]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectApprovedBookings() {
  try {
    const conn = await db_connection();
    const response = await selectApprovedBook(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
//////////////////////////////END OF SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT//////////////////////////////////////////////////////

///////////THIS WILL UPDATE APPROVED BOOKING AS RECEIVED DONATIONS AND INSERT DATA INTO DONATION TABLES//////////////////////////////////////////////////////
const confirmreceive = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const selectQry =
      "SELECT reserved_date FROM bookings WHERE booking_id = " +
      payload.booking_id +
      "";
    con.query(selectQry, function (err, result) {
      if (err) return reject(err);

      console.log(err);

      resolve(result);
      let reservedDate = result[0].reserved_date;
      if (reservedDate <= datenow) {
        const sql =
          "UPDATE `bookings` SET `approve`= 'completed' WHERE `booking_id`= ? ";
        con.query(sql, [payload.booking_id], function (err, result) {
          console.log(err, result, "result, error");
          if (err) return reject(err);
          if (result.length < 1) {
            return resolve([]);
          } else {
            //start else
            resolve(result);
          } //end else
        });
        //THIS WILL ENTER DONATION INTO DONATION TABLE

        const selectQuery =
          "SELECT COUNT(`donation_id`) as donationId FROM `donation`";
        con.query(selectQuery, function (err, resultt) {
          //start select count from donation
          let donationId = resultt[0].donationId + 1;
          const query1 =
            "INSERT INTO `donation`(`donation_id`, `user`, `donorName`, `donationDate`, `donation_delet`, `donationstatus`) VALUES (" +
            donationId +
            ", ?) ";
          var valT = [payload.addedby, payload.temp_donor, datenow, "0", "1"];
          con.query(query1, [valT], function (err, result) {
            //start insert to donation table
            if (err) {
              return reject(err);
            } else {
              //if no errors results
              console.log(result);
              resolve(result);
              console.log("enterdonation", result);
              //this query insert items of a particular donation to item_table
              const selectQuery2 =
                "SELECT COUNT(`item_id`) as donationId FROM `item_table`";
              con.query(selectQuery2, function (err, resultt) {
                //start select count from item table
                let itemId = resultt[0].donationId + 1;
                let query2 =
                  "INSERT INTO `item_table`(`item_id`,`donationNum`, `type_code`, `item_name`, `item_qty`, `item_description`, `receive_date`, `deleted`) VALUES (?) ";
                var val = [
                  itemId,
                  donationId,
                  payload.type_cd,
                  payload.item_name,
                  "0",
                  payload.item_description,
                  datenow,
                  "0",
                ];

                con.query(query2, [val], function (err, result) {
                  // start of insert to item_table table
                  if (err) {
                    console.log(err);
                    return reject(err);
                  } else {
                    //if no errors following query executes
                    resolve(result);
                    const sqlselect =
                      "SELECT * FROM donation INNER JOIN donor_all ON donation.donorName = donor_all.donor_id INNER JOIN item_table ON donation.donation_id = item_table.donationNum INNER JOIN item_name ON item_table.item_name = item_name.code WHERE donation.donorName = " +
                      payload.temp_donor +
                      " AND donation.donation_id = " +
                      donationId +
                      " ";
                    con.query(sqlselect, function (err, results) {
                      // start of select details in order to send the email
                      if (err) return reject(err);
                      console.log(err);
                      resolve(results);
                      var donorname = results[0].donor_name;
                      var description = results[0].item_description;
                      //send email to donor
                      var mailOptions = {
                        from: "<nadeeshamadumalihettiarachchi@gmail.com>",
                        to: payload.email,
                        subject: "Acknowledgement Of a Donation",
                        html: `
      <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Welcome Email</title>
      </head>
      <body>
      <h2> Dear ${donorname}</h2>
      <p>It is with immense gratitude we thank you for the thoughtful and Generous Gesture for the Donation of ${description} to Apeksha Hospital.</p>

      <h5> we really appreciate  your ${results.map((item) => [
        item.itemname,
      ])} donation.</h5>

      <h5> Thank You,</h5>
      <h5> Apeksha Hospital,<br/>
       Heath Informatics,<br/>
       Donation Department</h5>
      </body>`,
                      };

                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                          return reject(error);
                        } else {
                          console.log("Email sent: " + info.response);
                          resolve(info);
                        }
                      });
                    }); // END of select details in order to send the email
                  } //if no errors following query executes END
                }); // END of insert to item_table table
              }); //END select count from item table
            } //if no errors results END
          }); //END insert to donation table
        }); //END select count from donation
      } else {
        return { mesg: "can not confirm" };
      }
    });
  });
};

async function confirmDonationReceive(id, payload) {
  try {
    const conn = await db_connection();
    const response = await confirmreceive(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response) {
      const resdate = response[0].reserved_date;
      if (resdate > datenow) {
        return { status: 400, msg: "can not confirm", response };
      } else {
        return { status: 200, msg: "Updated successfully", response };
      }
    } else {
      return { status: 400, msg: "Something wrong", response };
    }
  } catch (e) {
    console.error(e);
  }
}
///////////END OF UPDATE APPROVED BOOKING AS RECEIVED DONATIONS AND INSERT DATA INTO DONATION TABLES//////////////////////////////////////

/////UPDATE WHEN BOOKING IS NOT COMPLETED//////////////////////////////
const confirmNotreceive = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const selectQry =
      "SELECT reserved_date FROM bookings WHERE booking_id = " +
      payload.booking_id +
      "";
    con.query(selectQry, function (err, result) {
      if (err) return reject(err);

      console.log(err);

      resolve(result);
      let reservedDate = result[0].reserved_date;
      if (reservedDate <= datenow) {
        const sql =
          "UPDATE `bookings` SET `approve`= 'Not completed' WHERE `booking_id`= ? ";
        con.query(sql, [payload.booking_id], function (err, result) {
          console.log(err, result, "result, error");
          if (err) return reject(err);
          if (result.length < 1) {
            return resolve([]);
          } else {
            //start else
            resolve(result);
          } //end else
        });
      } else {
        return { mesg: "can not confirm" };
      }
    });
  });
};
async function confirmDonationNotReceive(id, payload) {
  try {
    const conn = await db_connection();
    const response = await confirmNotreceive(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response) {
      const resdate = response[0].reserved_date;
      if (resdate > datenow) {
        return { status: 400, msg: "can not confirm", response };
      } else {
        return { status: 200, msg: "Updated successfully", response };
      }
    } else {
      return { status: 400, msg: "Something wrong", response };
    }
  } catch (e) {
    console.error(e);
  }
}
////END OF NOT COMPLETE/////////////////////

//SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT////////////////////////////

const selectAllBook = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT *  FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code  INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id WHERE reserve_delete = 0  ORDER BY booking_id DESC ;",

      function (err, result) {
        if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{ booking_id: 0 }]);
        } else {
          resolve(result);
        }
      }
    );
  });
};

async function selectAllBookingsForDash() {
  try {
    const conn = await db_connection();
    const response = await selectAllBook(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}
//END OF SELECT ALL PENDING BOOKINGS TO APPROVAL BY DONATION DEPARTMENT/////////////////////////

//SELECT ALL APPROVED BOOKINGS DATA BY BOOKING ID AND DONOR NAME////////////////////////////
const getapprovedprint = (con, id, name) => {
  console.log("start date", id, name);
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `bookings` INNER JOIN temp_item_table ON bookings.booking_id = temp_item_table.bookingId INNER JOIN item_name ON temp_item_table.item_name = item_name.code INNER JOIN donor_all ON bookings.temp_donor = donor_all.donor_id  WHERE bookings.booking_id = " +
      id +
      " AND bookings.temp_donor = " +
      name +
      "  ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function getapproveBookingsForPass(id, name) {
  try {
    const conn = await db_connection();
    const response = await getapprovedprint(conn, id, name);
    console.log("this is response", response);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
} // END OF SELECT    ALL APPROVED BOOKINGS DATA BY BOOKING ID AND DONOR NAME/////////////////////////////////

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
