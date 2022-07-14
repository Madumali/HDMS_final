const db_connection = require("../routes/config/database"); //IMPORT DATABASE CONNECTION
var dt = require("./date");
const datenow = dt.date();

module.exports = {
  registerIssuance,
  selectAllIssuances,
  updateIssueDelete,
  selectAllDeletedIssue,
  restoreDeleteIssue,
DeleteIssueForever,
registerRequestIssuance
};



const saverequestIssuance = (con, payload) => {//  beginning

  console.log("requestissue", payload);
  return new Promise((resolve, reject) => {
//UPDATE RELEVANT DATA INTO REQUEST TABLES

    
            const query2 = "UPDATE `request` SET `req_status`= ? ,`accept_by`=?,`accept_date`= ? WHERE req_id = ? ";
            
      console.log("qry",query2)
            con.query(query2,[ '0',payload.accept_by, datenow,payload.req_id], function (err, result)
            
           {
              if (err) return reject(err);
        
              console.log(err);
             
              resolve(result);
            }
          );
    
    
          const query3 = "UPDATE `request_inventory` SET `receive_qty`= `receive_qty`+"+payload.issue_itemqty+" WHERE requestId = "+payload.req_id+" AND cd_name = '"+payload.code+"' ";
             
        
              con.query(query3, function (err, result)
              
             {
                if (err) return reject(err);
          
                console.log(err);
               
                resolve(result);
              }
            );
    
    
      


//end of INSERT RELEVANT DATA INTO REQUEST TABLES



    const selectQry = "SELECT COUNT(`issuance_id`) as issuance FROM issuance"; //SELECT THE COUNT OF ID COLUMN
    con.query(selectQry, function (err, results){ //start select count from issuance table
      let issueid = results[0].issuance + 1;
      //QUERY TO INSERT INTO ISSUANCE TABLE
      const query2 =
        "INSERT INTO `issuance`(`issuance_id`,`issued_by`, `issue_dep`, `to_whom`, `issue_date`, `issue_delet`) VALUES  (" +
        issueid +
        ", ?) ";
      var val = [
        payload.accept_by,
        payload.department,
        payload.requestBy,
        datenow,
        "0",
      ];
      con.query(query2, [val], function (err, result) { //start of insert to issuance
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      //QUERY TO INSERT ITEMS THAT ISSUE INTO ISSUE ITEM TABLE
      const selectQuery2 =
"SELECT COUNT(`issueId`) as issueId FROM `issue_item`";
con.query(selectQuery2, function (err, resultt) { //start of select from issue_item table
  let itemId = resultt[0].issueId+1
      const query3 =
        "INSERT INTO `issue_item`(`issueId`,`issuance`, `issue_type`,`issue_item`,`issue_itemqty`, `issue_delete`) VALUES ( ? )";
 
      var val3 =  [
        itemId,
        issueid,
        payload.type_cd,
        payload.code,
        payload.issue_itemqty,
        "0",
      ];
      con.query(query3, [val3], function (err, result) { //start of insert to issue_item table
        if (err) return reject(err);
        console.log(err);
        resolve(result);
    
      //QUERY TO INSERT QUANTITY OF ISSUING INTO THE STOCK TABLE
      const selectQry4 = "SELECT * FROM `issue_item` INNER JOIN issuance ON issue_item.issuance = issuance.issuance_id WHERE issue_item.`issuance` = "+ issueid +";";
      con.query(selectQry4, function (err, results) { //start select all where issue id is given one to insert stock
       if (err) return reject(err);
       console.log(err);
       resolve(results);


       let issueid = results[0].issueId ;
       let issued_by = results[0].issued_by ;
       let issue_type = results[0].issue_type ;
       let issue_item = results[0].issue_item ;
       let issue_itemqty = results[0].issue_itemqty ;


      let query4 =
        "INSERT INTO `stock`(`issue_num`,`enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES ( ? ) ";
      var val4 = [
        issueid,
        issued_by,
        issue_type,
        issue_item,
        "0",
        issue_itemqty,
        datenow,
        "0",
        "0",
      ];

      con.query(query4, [val4], function (err, result) { //start of insert to stock
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      });  //END of insert to stock
    });  //END select all where issue id is given one to insert stock
    }); //END of insert to issue_item table
    }); //END of select from issue_item table
  }); //END of insert to issuance
  }); //END select count from issuance table
});
}; // END

//ASYNCHRONOUS FUNCTION WILL RETURN VALUE BASED ON PROMISE FUNCTION
async function registerRequestIssuance(payload) {
  try {
    const conn = await db_connection();
    const response = await saverequestIssuance(conn, payload); //WAIT FOR THE SAVE ISSUANCE FUNCTION TO RETURN PROMISE
    
    if (response.cd_name == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "Request added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_PARSE_ERROR") {
      return { status: 400, msg: "Something is Wrong" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}








const saveIssuance = (con, payload) => {//  beginning
  return new Promise((resolve, reject) => {
    const selectQry = "SELECT COUNT(`issuance_id`) as issuance FROM issuance"; //SELECT THE COUNT OF ID COLUMN
    con.query(selectQry, function (err, results){ //start select count from issuance table
      let issueid = results[0].issuance + 1;
      //QUERY TO INSERT INTO ISSUANCE TABLE
      const query2 =
        "INSERT INTO `issuance`(`issuance_id`,`issued_by`, `issue_dep`, `to_whom`, `issue_date`, `issue_delet`) VALUES  (" +
        issueid +
        ", ?) ";
      var val = [
        payload.enteredby,
        payload.user_department,
        payload.to_whom,
        datenow,
        "0",
      ];
      con.query(query2, [val], function (err, result) { //start of insert to issuance
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      //QUERY TO INSERT ITEMS THAT ISSUE INTO ISSUE ITEM TABLE
      const selectQuery2 =
"SELECT COUNT(`issueId`) as issueId FROM `issue_item`";
con.query(selectQuery2, function (err, resultt) { //start of select from issue_item table
  let itemId = resultt[0].issueId+1
      const query3 =
        "INSERT INTO `issue_item`(`issueId`,`issuance`, `issue_type`,`issue_item`,`issue_itemqty`, `issue_delete`) VALUES  ? ";
 
      var val3 = payload.inputFieldsd.map((item) => [
        itemId++,
        issueid,
        item.type_code,
        item.item_name,
        item.itemqty,
        "0",
      ]);
      con.query(query3, [val3], function (err, result) { //start of insert to issue_item table
        if (err) return reject(err);
        console.log(err);
        resolve(result);
    
      //QUERY TO INSERT QUANTITY OF ISSUING INTO THE STOCK TABLE
      const selectQry4 = "SELECT * FROM `issue_item` INNER JOIN issuance ON issue_item.issuance = issuance.issuance_id WHERE issue_item.`issuance` = "+ issueid +";";
      con.query(selectQry4, function (err, results) { //start select all where issue id is given one to insert stock
       if (err) return reject(err);
       console.log(err);
       resolve(results);

      let query4 =
        "INSERT INTO `stock`(`issue_num`,`enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES ? ";
      var val4 = results.map((item) => [
        item.issueId,
        item.issued_by,
        item.issue_type,
        item.issue_item,
        "0",
        item.issue_itemqty,
        datenow,
        "0",
        "0",
      ]);

      con.query(query4, [val4], function (err, result) { //start of insert to stock
        if (err) return reject(err);
        console.log(err);
        resolve(result);
      });  //END of insert to stock
    });  //END select all where issue id is given one to insert stock
    }); //END of insert to issue_item table
    }); //END of select from issue_item table
  }); //END of insert to issuance
  }); //END select count from issuance table
});
}; // END

//ASYNCHRONOUS FUNCTION WILL RETURN VALUE BASED ON PROMISE FUNCTION
async function registerIssuance(payload) {
  try {
    const conn = await db_connection();
    const response = await saveIssuance(conn, payload); //WAIT FOR THE SAVE ISSUANCE FUNCTION TO RETURN PROMISE
    
    if (response.issue_item == "") {
      return { status: 400, msg: "Something  Wrong", response };
    } else {
      return { status: 200, msg: "Request added successfully", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_PARSE_ERROR") {
      return { status: 400, msg: "Something is Wrong" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}



//This function will retrieve all donations issuings
const selectAllIssues = (con) => { 
  return new Promise((resolve, reject) => {
    const sqlquery =
      "SELECT * FROM `issue_item` INNER JOIN `issuance` ON issue_item.issuance = issuance.issuance_id INNER JOIN `item_name` ON `issue_item`.`issue_item` = `item_name`.`code` INNER JOIN department ON issuance.issue_dep = department.dep_id  WHERE `issue_item`.`issue_delete`= 0 ORDER BY issueId DESC; ";

    con.query(sqlquery, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function selectAllIssuances() {
  try {
    const conn = await db_connection();
    const response = await selectAllIssues(conn);
    // console.log(response);
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

//DELETE DONATION BY CHANGING DELETE STATUS
const deleteIssue = (con, id, payload) => {
  console.log("payload", payload)
   return new Promise((resolve, reject) => {
     const sql =
       "UPDATE `issue_item` SET `issue_delete`= 1 WHERE `issueId`= ? ";
 
     con.query(sql, [payload.issueId], function (err, result) {
       console.log(err, result, "result, error");
       if (err) return reject(err);
       if (result.length < 1) {
         return resolve([]);
       } else {
         resolve(result);
       }
     });
 
       const sql2 =
       "UPDATE `stock` SET `delete_stk` = 1  WHERE `issue_num` = ? ";
 
     con.query(sql2, [payload.issueId], function (err, result) {
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
 async function updateIssueDelete(id, payload) {
   try {
     const conn = await db_connection();
     const response = await deleteIssue(conn, id, payload);
     if (response.length < 1) return "No Data";
     if (response)
       return { status: 200, msg: "Deleted successfully", response };
     return { status: 400, msg: "Something  Wrong", response };
   } catch (e) {
     console.error(e);
   }
 }
 
 //This function will retrieve all deleted donations issuings
const selectAlldeletedIssues = (con) => { 
  return new Promise((resolve, reject) => {
    const sqlquery =
      "SELECT * FROM `issue_item` INNER JOIN `issuance` ON issue_item.issuance = issuance.issuance_id INNER JOIN `item_name` ON `issue_item`.`issue_item` = `item_name`.`code` INNER JOIN department ON issuance.issue_dep = department.dep_id  WHERE `issue_item`.`issue_delete`= 1 ; ";

    con.query(sqlquery, function (err, result) {
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};
async function selectAllDeletedIssue() {
  try {
    const conn = await db_connection();
    const response = await selectAlldeletedIssues(conn);
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



//RESTORE DELETED ISSUES
const restoreIssue = (con, payload) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `issue_item` SET `issue_delete`= 0 WHERE `issueId`= "+payload+"";
    con.query(sql, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });
    const sql2 =  "UPDATE `stock` SET `delete_stk` = 0  WHERE `issue_num` = ?";
    con.query(sql2,[payload], function (err, result) {
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

async function restoreDeleteIssue(payload) {
  try {
    const conn = await db_connection();
    const response = await restoreIssue(conn, payload);
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

//DELETE ISSUES FOREVER
const foreverDeleteissue = (con, payload) => {
  return new Promise((resolve, reject) => {
    const sql = 
    "DELETE FROM `issue_item` WHERE `issueId`= "+payload+"";
    console.log("delete", sql)
    con.query(sql, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }

      const sql2 =
      "DELETE FROM `stock` WHERE `issue_num`= "+payload+"";
    con.query(sql2, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        return resolve([]);
      } else {
        resolve(result);
      }
    });

    });
  });
};

async function DeleteIssueForever(payload) {
  try {
    const conn = await db_connection();
    const response = await foreverDeleteissue(conn, payload);
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Deleted forever successfully", response };
    return { status: 400, msg: "Something Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
