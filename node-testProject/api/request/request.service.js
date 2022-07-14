const db_connection = require("../routes/config/database");
var dt = require('./date');

const datenow = dt.date();

module.exports = {
    registerRequest,
    selectRequired,
    selectAllRequestDetails,
    getRequestItemTotal,
    selectAllRequeststoAccept,
    updateRequestDelete,
    selectRequestForEach,
    updateRequestDeleteForEach
};




  


const saveRequest = (con, payload) => {
return new Promise((resolve, reject) => {
  
const selectQ = "SELECT COUNT(`req_id`)as request FROM request";
con.query(selectQ, function(err, results)
{
  let reqId = (results[0].request)+1;

        const query2 = "INSERT INTO `request`(`req_id`,`requestBy`, `department`, `designation`, `date`, `delete_req`,`req_status`) VALUES ("+reqId+",?)";
        var val = [payload.enteredby, payload.department, payload.designation, datenow, '0','1'];
  console.log("qry",query2)
        con.query(query2,[val], function (err, result)
        
       {
          if (err) return reject(err);
    
          console.log(err);
         
          resolve(result);
      


      const query3 = "INSERT INTO `request_inventory`(`requestId`, `itemCode`, `cd_name`, `request_qty`, `receive_qty`, `req_rec_date`, `delete_record`) VALUES ? ";
          var val = payload.inputFieldsd.map(item=>[reqId, item.type_code, item.item_name, item.item_qty, '', datenow, '0']);
    
          con.query(query3,[val], function (err, result)
          
         {
            if (err) return reject(err);
      
            console.log(err);
           
            resolve(result);
          }
        );
      } // requet
      );

    });
  });
    };


    async function registerRequest(payload) {
        try {
          const conn = await db_connection();
          const response = await saveRequest(conn, payload);
          console.log("response request", response);
          if (response.codeName == "")
          { return { status: 400, msg: "Something  Wrong", response };
            
            
          }else{
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


      //SELECT ALL REQUESTS to show needs in reservation and reports .will sum up each items needed

const selectAllRequired = (con) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT itemCode, cd_name,itemname,SUM(request_qty) as reqQty, SUM(receive_qty) as receiveQty, SUM(request_qty)-SUM(receive_qty) as required FROM `request_inventory` INNER JOIN `item_name` ON request_inventory.cd_name = item_name.code WHERE delete_record = 0 GROUP BY cd_name HAVING COUNT(*)>=1  ORDER BY req_stk_id; ";
con.query(sqlquery, function(err, result)
{
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

async function selectRequired() {
  try {

    const conn = await db_connection();
    const response = await selectAllRequired(conn)
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}



//all request details, who requested, what,how much, when will be displayed in requests reports

const selectRequestDetails = (con, start_dated, end_dated) => {
    return new Promise((resolve, reject) => {
    
  const sqlquery = "SELECT * FROM `request` INNER JOIN `request_inventory` ON `request`.req_id = `request_inventory`.requestId INNER JOIN `department` ON `request`.department = `department`.dep_id INNER JOIN `designation` ON `request`.designation = `designation`.desig_id INNER JOIN `item_name` ON request_inventory.cd_name = item_name.code WHERE delete_record = 0 AND (`date` BETWEEN '" +
  start_dated +
  "' AND  '" +
  end_dated +
  "') GROUP BY cd_name HAVING COUNT(*)>=1  ORDER BY req_stk_id; ";
  con.query(sqlquery, function(err, result)
  {
    if (err) return reject(err);
      if (result.length < 1) {
        return resolve([{req_stk_id:0}]);
      } else {
        resolve(result);
      }
  }
  );
  
  });
  
  };
  
  async function selectAllRequestDetails(start_dated, end_dated) {
    try {
  
      const conn = await db_connection();
      const response = await selectRequestDetails(conn, start_dated, end_dated)
      // console.log(response);
      if(response.length < 1)
      {
        return {msg:"No data available"};
      }
      return {
        ...omitPassword(response),
      };
    } catch (e) {
      console.error;
    }
  }
  


  
//GET ALL REQUESTED ITEMS TOTAL PER EACH ITEM TO REPORT

const selectRequestTotal = (con,start_dated, end_dated) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT req_stk_id,req_rec_date,itemCode, cd_name,itemname,SUM(request_qty) as reqQty, SUM(receive_qty) as receiveQty, SUM(request_qty)-SUM(receive_qty) as required FROM `request_inventory` INNER JOIN `item_name` ON request_inventory.cd_name = item_name.code WHERE delete_record = 0 AND (`req_rec_date` BETWEEN '" +
start_dated +
"' AND  '" +
end_dated +
"') GROUP BY cd_name HAVING COUNT(*)>=1  ORDER BY req_stk_id; ";
con.query(sqlquery, function(err, result)
{
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

async function getRequestItemTotal(start_dated, end_dated) {
  try {

    const conn = await db_connection();
    const response = await selectRequestTotal(conn,start_dated, end_dated)
    // console.log(response);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}

// SELECT ALL REQUESTS FROM EVERYONE TO TABLE IN REQUESTLIST

const selectRequests = (con) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT * FROM `request` INNER JOIN `request_inventory` ON `request`.req_id = `request_inventory`.requestId INNER JOIN `department` ON `request`.department = `department`.dep_id INNER JOIN `designation` ON `request`.designation = `designation`.desig_id INNER JOIN `item_name` ON request_inventory.cd_name = item_name.code WHERE delete_record = 0  ORDER BY req_stk_id DESC; ";
con.query(sqlquery, function(err, result)
{
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

async function selectAllRequeststoAccept() {
  try {

    const conn = await db_connection();
    const response = await selectRequests(conn)
    // console.log(response);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}


//DELETE REQUEST FROM REQUEST LIST IF REQUESTED AMOUNT IS EQUAL WITH RECEIVED AMOUNT 
const deleterequest = (con, id, payload) => {
  const request = payload.request_qty;
  const receive = payload.receive_qty;
if(request === receive)
  
 {
  
  return new Promise((resolve, reject) => {
    const sql =
    "UPDATE `request_inventory` SET `delete_record` = 1  WHERE `req_stk_id`= ? ";
  con.query(sql, [payload.req_stk_id], function (err, result) {
    console.log(err, result, "result, error");
    if (err) return reject(err);
    if (result.length < 1) {
      return resolve([]);
    } else {
      resolve(result);
    }
  });
  
  });
 }else {
   return {mesg:"Can not delete"}
 }

 };
 async function updateRequestDelete(id, payload) {
   try {
     const conn = await db_connection();
     const response = await deleterequest(conn, id, payload);
     if (response.length < 1) return "No Data";
     else if(response.mesg == "Can not delete")
     return {
       msg:"Can not delete"
     }
 if (response)
       return { status: 200, msg: "Deleted successfully", response };
     return { status: 400, msg: "Something  Wrong", response };
   } catch (e) {
     console.error(e);
   }
 }
 
 // SELECT ALL REQUESTS FOR EACH RECEIVER TO TABLE IN REQUESFOREACH

const selectRequestsforeach = (con,id) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT * FROM `request` INNER JOIN `request_inventory` ON `request`.req_id = `request_inventory`.requestId INNER JOIN `department` ON `request`.department = `department`.dep_id INNER JOIN `designation` ON `request`.designation = `designation`.desig_id INNER JOIN `item_name` ON request_inventory.cd_name = item_name.code INNER JOIN user ON request.requestBy = user.user_full_name WHERE delete_record = 0 AND user.uid = "+id+"  ORDER BY req_stk_id DESC; ";
con.query(sqlquery, function(err, result)
{
  if (err) return reject(err);
    if (result.length < 1) {
    
      return resolve([]);
    } else {
      resolve(result);
      console.log("require", result)
    }
}
);

});

};

async function selectRequestForEach(id) {
  try {

    const conn = await db_connection();
    const response = await selectRequestsforeach(conn,id)
    console.log(response);
    if(response.length < 1)
    {
      return {msg:"No data available"};
    }
    return {
      ...omitPassword(response),
    };
  } catch (e) {
    console.error;
  }
}


//DELETE REQUEST FROM REQUEST LIST  FROM MYLIST 
const deleterequestforeach = (con, id, payload) => {

  return new Promise((resolve, reject) => {
    const sql =
    "UPDATE `request_inventory` SET `delete_record` = 1  WHERE `req_stk_id`= ? ";
  con.query(sql, [payload.req_stk_id], function (err, result) {
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
 async function updateRequestDeleteForEach(id, payload) {
   try {
     const conn = await db_connection();
     const response = await deleterequestforeach(conn, id, payload);
     if (response.length < 1) return "No Data";
     else if(response.mesg == "Can not delete")
     return {
       msg:"Can not delete"
     }
 if (response)
       return { status: 200, msg: "Deleted successfully", response };
     return { status: 400, msg: "Something  Wrong", response };
   } catch (e) {
     console.error(e);
   }
 }

      function omitPassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }