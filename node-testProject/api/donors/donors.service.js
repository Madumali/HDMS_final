const db_connection = require("../routes/config/database");
var dt = require("./date");
const bcrypt = require("bcryptjs"); //package for hashing the password
const datenow = dt.date();

module.exports = {
  registerDonors,
  selectAll,
  selectAllPerson,
  selectSingleDonor,
  updateDonor,
  updateDonorDelete,
  filterDonorByDates,
  filterBloodDonorByDates,
  selectAllDeletedPerson,
  restoreDeleteDonor,
  DeleteDonorForever,
  selectLoggedinPerson
};

//SELECT DONOR BY FILTERING DATES
const filterDonorbyDates = (con, start_dated, end_dated) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `donor_all`  WHERE `delete_status` = 0 AND `R/D` = 'D' AND (`reg_date` BETWEEN '" +
      start_dated +
      "' AND  '" +
      end_dated +
      "')  ORDER BY `donor_id` DESC ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{ donor_id: 0, msg: "No data available" }]);
      } else {
        resolve(result);
      }
    });
  });
};
async function filterDonorByDates(start_dated, end_dated) {
  try {
    const conn = await db_connection();
    const response = await filterDonorbyDates(conn, start_dated, end_dated);

    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
} // END OF SELECT DONOR BY FILTERING DATES

//SELECT BLOOD DONOR BY FILTERING DATES
const filterBloodDonorbyDates = (con, start_dated, end_dated) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT  * FROM `donor_all` INNER JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId  WHERE `donor_all`.`delete_status` = 0 AND `R/D` = 'D' AND `donor_all`.`isBloodDon`=1 AND `blooddon`.`birthday`<= '2004-12-30' AND `blooddon`.weight >=50 AND `tattoo`=0 AND `hiv`=0 AND `std` = 0 AND `hepatitis` = 0 AND `cardiac`=0 AND `cancer`=0 AND (`reg_date` BETWEEN '" +
      start_dated +
      "' AND  '" +
      end_dated +
      "')  ORDER BY `donor_id` DESC ;";
    console.log("filter betweeen", sql);
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{ donor_id: 0, msg: "No data available" }]);
      } else {
        resolve(result);
      }
    });
  });
};
async function filterBloodDonorByDates(start_dated, end_dated) {
  try {
    const conn = await db_connection();
    const response = await filterBloodDonorbyDates(
      conn,
      start_dated,
      end_dated
    );
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
} //END OF SELECT BLOOD DONOR BY FILTERING DATES

//SELECT ALL DONOR PERSONS TO DISPLAY IN LIST WITHOUT FILTERING BETWEEN DATES
const selectAllDonorPerson = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all`  LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId WHERE `delete_status` = 0 AND `donor_type` = 'person' AND `R/D`='D' ORDER BY `donor_id` DESC;",

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
async function selectAllPerson() {
  try {
    const conn = await db_connection();
    const response = await selectAllDonorPerson(conn);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
} //END OF SELECT ALL DONOR PERSONS TO DISPLAY IN LIST WITHOUT FILTERING BETWEEN DATES

//SELECT SINGLE DONOR BY ID
const selectDonor = (con, id) => {
  return new Promise((resolve, reject) => {
    const query1 =
      "SELECT * FROM `donor_all` WHERE `donor_id` = " +
      id +
      " AND `delete_status` = 0 AND `R/D` = 'D' ;";
    console.log(query1);
    con.query(query1, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};

async function selectSingleDonor(id) {
  try {
    const conn = await db_connection();
    const response = await selectDonor(conn, id);
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

let hashedPass = "";
//SAVE DONOR PERSONS
const saveDonors = (con, payload) => {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT COUNT(`donor_id`) as idct FROM `donor_all`";
    con.query(selectQuery, function (err, resultt) {
      let iddd = resultt[0].idct + 1;
      if (payload.isBloodDon == true) {
        const query =
          "INSERT INTO `donor_all`(`donor_id`,`donor_type`,`title`, `national_id`, `donor_name`, `address_line1`, `address_line2`, `email`, `contact_no`, `contact_no2`, `reg_date`,`donor_password`, `isBloodDon`, `delete_status`) VALUES (" +
          iddd +
          ",?) ";
        var val = [
          "person",
          payload.title,
          payload.national_id,
          payload.donor_name,
          payload.address_line1,
          payload.address_line2,
          payload.email,
          payload.contact_no,
          payload.contact_no2,
          datenow,
          hashedPass,
          payload.isBloodDon,
          "0",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });

        const bquery =
          "INSERT INTO `blooddon`(`donorId`, `birthDay`, `bloodGroup`, `weight`, `tattoo`, `std`, `hiv`, `cardiac`, `hepatitis`, `cancer`) VALUES (" +
          iddd +
          ",?) ";
        var val2 = [
          payload.birthDay,
          payload.bloodGroup,
          payload.weight,
          payload.tattoo,
          payload.std,
          payload.hiv,
          payload.cardiac,
          payload.hepatitis,
          payload.cancer,
        ];
        con.query(bquery, [val2], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });
      } else {
        let iddd = resultt[0].idct + 1;
        const query =
          "INSERT INTO `donor_all`(`donor_id`,`donor_type`,`title`, `national_id`, `donor_name`, `address_line1`, `address_line2`, `email`, `contact_no`, `contact_no2`, `reg_date`,`donor_password`, `isBloodDon`, `delete_status`) VALUES (" +
          iddd +
          ",?) ";
        var val = [
          "person",
          payload.title,
          payload.national_id,
          payload.donor_name,
          payload.address_line1,
          payload.address_line2,
          payload.email,
          payload.contact_no,
          payload.contact_no2,
          datenow,
          hashedPass,
          payload.isBloodDon,
          "0",
        ];
        con.query(query, [val], function (err, result) {
          if (err) return reject(err);

          console.log(result);
          resolve(result);
        });
      }
    });
  });
};
async function registerDonors(payload) {
  try {
    const conn = await db_connection();
    hashedPass = await bcrypt.hash("1234", 10);
    const response = await saveDonors(conn, payload);
    if (response.donor_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "Donor added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}
//END OF SAVE DONOR PERSONS

//UPDATE DONOR PERSON
const updateDonorPerson = (con, id, payload) => {
  console.log("blood", payload);
  return new Promise((resolve, reject) => {
    const selectqry =
      "SELECT isBloodDon FROM donor_all WHERE delete_status = 0 AND donor_id = " +
      payload.donor_id +
      "";
    con.query(selectqry, function (err, resultt) {
      if (err) return reject(err);
      console.log(err);
      console.log("resultt", resultt);
      let isblood = resultt[0].isBloodDon;
      console.log("resultt", isblood);
      if (isblood == 1) {
        const sqlq =
          "UPDATE `donor_all` LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId SET `national_id`= ?,`donor_name`= ?,`address_line1`= ? ,`address_line2`= ? ,`email`=  ? ,`contact_no`= ? ,`contact_no2`= ?, `birthDay`= ?,`bloodGroup`= ?,`weight`= ?,`tattoo`= ?,`std`= ?,`hiv`= ?,`cardiac`= ?,`hepatitis`= ?,`cancer`= ? WHERE `donor_id`= ? ";
        con.query(
          sqlq,
          [
            payload.national_id,
            payload.donor_name,
            payload.address_line1,
            payload.address_line2,
            payload.email,
            payload.contact_no,
            payload.contact_no2,
            payload.birthDay,
            payload.bloodGroup,
            payload.weight,
            payload.tattoo,
            payload.std,
            payload.hiv,
            payload.cardiac,
            payload.hepatitis,
            payload.cancer,
            payload.donor_id,
          ],
          function (err, result) {
            console.log(err, result, "result, error");
            if (err) return reject(err);
            if (result.length < 1) {
              return resolve([]);
            } else {
              resolve(result);
            }
          }
        );
      } else if (isblood == 0) {
        //   const bquery =
        //   "INSERT INTO `blooddon`(`donorId`, `birthDay`, `bloodGroup`, `weight`, `tattoo`, `std`, `hiv`, `cardiac`, `hepatitis`, `cancer`) VALUES (?) ";
        // var val2 = [
        //   payload.donor_id,
        //   payload.birthDay,
        //   payload.bloodGroup,
        //   payload.weight,
        //   payload.tattoo,
        //   payload.std,
        //   payload.hiv,
        //   payload.cardiac,
        //   payload.hepatitis,
        //   payload.cancer,
        // ];
        // con.query(bquery, [val2], function (err, result) {
        //   if (err) return reject(err);
        //    console.log("isisisisis",err)
        //   console.log(err, result, "result, error");
        //   console.log("isisisisis",result)
        //   resolve(result);
        // });

        const sql =
          "UPDATE `donor_all` LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId SET `national_id`= ?,`donor_name`= ?,`address_line1`= ? ,`address_line2`= ? ,`email`=  ? ,`contact_no`= ? ,`contact_no2`= ?,isBloodDon=?, `birthDay`= ?,`bloodGroup`= ?,`weight`= ?,`tattoo`= ?,`std`= ?,`hiv`= ?,`cardiac`= ?,`hepatitis`= ?,`cancer`= ? WHERE `donor_id`= ? ";
        con.query(
          sql,
          [
            payload.national_id,
            payload.donor_name,
            payload.address_line1,
            payload.address_line2,
            payload.email,
            payload.contact_no,
            payload.contact_no2,
            payload.isBloodDon,
            payload.birthDay,
            payload.bloodGroup,
            payload.weight,
            payload.tattoo,
            payload.std,
            payload.hiv,
            payload.cardiac,
            payload.hepatitis,
            payload.cancer,
            payload.donor_id,
          ],
          function (err, result) {
            console.log(err, result, "result, error");
            if (err) return reject(err);
            if (result.length < 1) {
              return resolve([]);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};
async function updateDonor(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateDonorPerson(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donor Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Donor already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
} //END OF UPDATE DONOR PERSON

//DELETE DONOR BY CHANGING DELETE STATUS
const deleteDonor = (con, id, payload) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `donor_all` SET `delete_status`= 1 WHERE `donor_id`= ? ";
    con.query(sql, [payload.donor_id], function (err, result) {
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
async function updateDonorDelete(id, payload) {
  try {
    const conn = await db_connection();
    const response = await deleteDonor(conn, id, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Donor deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    console.error(e);
  }
}

//SELECT  DELETED DONORS DETAILS FOR BACKUP
const selectAllDeleteDonorPerson = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `delete_status` = 1 ;",

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
async function selectAllDeletedPerson() {
  try {
    const conn = await db_connection();
    const response = await selectAllDeleteDonorPerson(conn);
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

//RESTORE DELETED DONORS
const restoreDonor = (con, payload) => {
  console.log("Update delete team arrived", payload);
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `donor_all` SET `delete_status`= 0 WHERE `donor_id`= " +
      payload +
      "";
    console.log("restore", sql);
    con.query(sql, function (err, result) {
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

async function restoreDeleteDonor(payload) {
  try {
    const conn = await db_connection();
    const response = await restoreDonor(conn, payload);
    // console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Restored successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

//DELETE DONORS FOREVER
const foreverDeletedonor = (con, payload) => {
  console.log("Update delete team arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM `donor_all` WHERE `donor_id`= " + payload + "";
    console.log("delete", sql);
    con.query(sql, function (err, result) {
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

async function DeleteDonorForever(payload) {
  try {
    const conn = await db_connection();
    const response = await foreverDeletedonor(conn, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Deleted forever successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}





//SELECT ALL DONOR PERSONS TO DISPLAY IN LIST WITHOUT FILTERING BETWEEN DATES
const loggedinperson = (con,id) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all`  LEFT JOIN `blooddon` ON `donor_all`.donor_id = `blooddon`.donorId WHERE donor_id = "+id+" ORDER BY `donor_id` DESC;",

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
async function selectLoggedinPerson(id) {
  try {
    const conn = await db_connection();
    const response = await loggedinperson(conn,id);
    if (response.length < 1) {
      return { msg: "No data available" };
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
} //END OF SELECT ALL DONOR PERSONS TO DISPLAY IN LIST WITHOUT FILTERING BETWEEN DATES













function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

//SELECT ALL DONOR PERSONS AND TEAMS
const selectAllDonors = (con) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM `donor_all` WHERE `delete_status` = 0 AND `R/D` = 'D' ORDER BY `donor_id` DESC;",
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
async function selectAll() {
  try {
    const conn = await db_connection();
    const response = await selectAllDonors(conn);
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
