
const db_connection = require("../routes/config/database");
// const mysql = require("mysql");

module.exports = {
  selectItems,
  registerItems,
updateItems,
updateItemDelete,
selectItemsall,
countincrement,
// selectAllItems
};




//FUNCTION TO GET RECORD COUNT TO CREATE ITEM NAME CODE AUTOMATICALLY

const getcount = (con) => {
  return new Promise((resolve, reject) => {
  
    const sql = "SELECT COUNT(`id`) as recCount FROM `item_name` ;";
    console.log("count is here", sql);
    con.query(sql , function(err, result)
    {
  
      if(err) return reject(err);
      if(result.length < 1) {
        return resolve();
      } else {
        console.log(result);
        resolve(result);
      }
    });
  })
  }

  async function countincrement()
  {
    console.log("counting");
    try{
      const conn = await db_connection();
      const response = await getcount(conn);
  console.log("this is count", response);
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



// FUNCTION RETRIEVE ALL ITEMS
const selectAll = (con) => {
return new Promise((resolve, reject) => {

  const sql = "SELECT * FROM `item_name` WHERE `delete_name` = 0 ORDER BY `id` DESC ;";
  con.query(sql , function(err, result)
  {

    if(err) return reject(err);
    if(result.length < 0) {
      return resolve([]);
    } else {
      // console.log(result);
      resolve(result);
    }
  });
})
}


async function selectItemsall()
{
  try{
    const conn = await db_connection();
    const response = await selectAll(conn);

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



//FUNCTION RETRIVE ALL ITEMS ACCORDING TO RELEVANT CATEGORY
const selectAllItems = (con,id) => {

  return new Promise((resolve, reject) => {
    const query =  "SELECT * FROM `item_name` WHERE `type_cd` = '"+id+"' AND `delete_name`= 0 ;";
    // console.log(query);
  con.query(query,function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([]);
        } else {
          // console.log(result);
          resolve(result);
        }
    }
  );

});

};


async function selectItems(id)

  {
    // console.log("arrivedItems");
    try{
      const conn = await db_connection();
      const response = await selectAllItems(conn,id);
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





//FUNCTION SAVES ITEMS
const saveItems = (con, payload) => {
console.log(payload);
  return new Promise((resolve, reject) => {
     const query =  "INSERT INTO `item_name`(`code`, `type_cd`, `itemname`) VALUES (?) ";
     console.log(query);
     
       let codename = payload.type_cd+payload.code;
    
     var reg_datet = new Date();
     var val = 
     [
    
     codename,
     payload.type_cd,
     payload.itemname,
  
    ]
      con.query(query,[val],function (err, result) {
        if (err) return reject(err);
  
        console.log(result);
        resolve(result);
      }
    );
    
  });
  
  };

  async function registerItems(payload) {
    try {
      const conn = await db_connection();
      const response = await saveItems(conn, payload);
      console.log("items arrived", payload);
      if (response.itemname == "")
      { return {status: 400, msg: "Something  Wrong", response};
        
        
      }else{
        return {status: 200, msg: "Item added successfully", response};
      }
    } catch (e) {
      console.error(e);
      if (e.code == "ER_DUP_ENTRY") {
        return {status: 400, msg: "Item already exist"};
      }
      return {status: 400, msg: "Something is Wrong"};
    }
  }




//THIS WILL UPDATE ITEMS
  const updateItemSelected = (con, id, payload) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE `item_name` SET `code`= ?,`itemname`= ? WHERE `id`= ? ';
  
      con.query(sql,[
        payload.code,
        payload.itemname,
        payload.id
      ], function (err, result) {
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
  
  async function updateItems(id, payload) {
    try {
      const conn = await db_connection();
      const response = await updateItemSelected(conn, id, payload);
      // console.log(response, "ASDADASDASDADS");
      if (response.length < 1) return "No Data";
      if (response)
        return { status: 200, msg: "Item Updated successfully", response };
      return { status: 400, msg: "Something  Wrong", response };
    } catch (e) {
      if (e.code == "ER_DUP_ENTRY") {
        return { status: 400, msg: "Item already exist" };
      }
      return { status: 400, msg: "Something Went Wrong" };
    }
  }






//THIS WILL UPDATE DELETE STATUS OF ITEMS.NOT DELETING FROM DB
  const deleteItem = (con,id, payload) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `item_name` SET `delete_name`= 1 WHERE `id`= ? ";
      con.query(sql,[payload.id], function (err, result) {
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
  

  async function updateItemDelete(id,payload) {
    try {
      const conn = await db_connection();
      const response = await deleteItem(conn, id, payload);
      if (response.length < 1) return "No Data";
      if (response)
        return { status: 200, msg: "Item deleted successfully", response };
      return { status: 400, msg: "Something  Wrong", response };
    } catch (e) {
      if (e.code == "ER_DUP_ENTRY") {
        return { status: 400, msg: "Item already exist" };
      }
      return { status: 400, msg: "Something Went Wrong" };
    }
  }
  

//////////////////////////////select all items/////////////




  function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }