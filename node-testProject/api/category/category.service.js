
const db_connection = require("../routes/config/database");

module.exports = {
    selectCategory,
    saveCategory,
    updateCategory,
    updateCategoryDelete,
};


const selectCate = (con) => {

    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM `itemtype` where status = 0;",

            function(err, result)
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


const addCategory= (con, payload) => {
  return new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO `itemtype`(`type_code`, `type_name`) VALUES ('"+
      payload.type_code+"', '"+payload.type_name+"');",
      function (err, result) {
        if (err) return reject(err);
  
        console.log(result);
        resolve(result);
      }
    );
  });

};


const updateCategoryTable = (con, id, payload) => {
  console.log("Update arrived", payload);
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE `itemtype` SET `type_code`= ? ,`type_name`= ?  where `type_id`= ? ';

    // console.log(sql, "sql");
    con.query(sql,[
      payload.type_code,
      payload.type_name,
      payload.type_id
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



const deleteCategory = (con,id, payload) => {
  console.log("Update delete arrived", payload);
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `itemtype` SET `status`='1' WHERE `type_id`= "+
      payload.type_id +
      ";";

      console.log(sql, "sql");
    con.query(sql, function (err, result) {
      console.log(err, result, "result, error");
      if (err) return reject(err);
      if (result.length < 1) {
        console.log(result, "SFSDFDSFDSFSDFSDFSD");
        return resolve([]);
      } else {
        resolve(result);
      }
    });
  });
};






async function selectCategory()
{
    
    try{
    const conn = await db_connection();
    const response = await selectCate(conn);
 
      if(response.length < 1)
      {
        return "No data available";
      }
      return {
        ...omitPassword(response),
      };
     
    }
    catch(e){
        console.log(error);
    }
}

async function saveCategory(payload
)
{
  try {
    const conn = await db_connection();
    const response = await addCategory(conn, payload);
    if (response.type_code == "")
    { return { status: 400, msg: "Something  Wrong", response };
      
      
    }else{
      return { status: 200, msg: "Successfully Added", response };
    }
  } catch (e) {
    console.error(e);
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Already entered" };
    }
    return { status: 400, msg: "Something is Wrong" };
  }
}


async function updateCategory(id, payload) {
  try {
    const conn = await db_connection();
    const response = await updateCategoryTable(conn, id, payload);
    console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Category Updated successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Code already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}

async function updateCategoryDelete(id,payload) {
  try {
    const conn = await db_connection();
    const response = await deleteCategory(conn, id, payload);
    // console.log(response, "ASDADASDASDADS");
    if (response.length < 1) return "No Data";
    if (response)
      return { status: 200, msg: "Category deleted successfully", response };
    return { status: 400, msg: "Something  Wrong", response };
  } catch (e) {
    if (e.code == "ER_DUP_ENTRY") {
      return { status: 400, msg: "Code already exist" };
    }
    return { status: 400, msg: "Something Went Wrong" };
  }
}




function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }