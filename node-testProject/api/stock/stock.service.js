const db_connection = require("../routes/config/database");


module.exports = {
    
    selectItemQty,
    selectAvailableQtyPerCode,
    selectStockPerMonth,
    selectStockPerCategory,
    selectPerMonth,
    selectPerMonthNCat,
    selectPerMonthforEachCat,
    selectCategorydetails,
    selectPerItemnameAllDetails
};


//DASHBOARD CATEGORIES
const categorywisedetails = (con) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qtyStk`, type_code,type_name FROM `stock` INNER JOIN itemtype ON stock.codeid = itemtype.type_code WHERE delete_stk = 0  GROUP BY codeid ORDER BY codeid  ; ";
    console.log("this is dashboard query",sqlquery);
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

}
async function selectCategorydetails() {
  try {

    const conn = await db_connection();
    const response = await categorywisedetails(conn,)
    console.log("this is dashboard",response);
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

//GET AVAILABLE ITEM QUANTITY OF EACH ITEM
const selectstockperCode = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,codename, codeid, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `availableqty` FROM `stock` WHERE codename = '"+id+"'  GROUP BY codename   ; ";

    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}

async function selectAvailableQtyPerCode(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockperCode(conn,id)
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
//END OF GET AVAILABLE ITEM QUANTITY OF EACH ITEM




//FILTER BY CATEGORY - INVENTORY
const selectstockperCat = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,month(date) as month, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty`,itemname,code FROM `stock` INNER JOIN item_name ON item_name.code = stock.codename WHERE codeid = '"+id+"' AND delete_stk = 0  GROUP BY itemname ORDER BY itemname  ; ";

    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}

async function selectPerMonthNCat(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockperCat(conn,id)
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
//FILTER BY CATEGORY - INVENTORY






//filter by month for inventory
const selectstockpermnth = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,month(date) as month, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock`  WHERE month(date) = "+id+" AND delete_stk = 0   GROUP BY codeid ORDER BY codeid  ; ";
  
    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}
async function selectPerMonth(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockpermnth(conn,id)
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

//filter by month for each category for inventory
const selectstockpermnthEachcat = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id,month(date) as month, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty`,itemname,code FROM `stock` INNER JOIN item_name ON item_name.code = stock.codename  WHERE month(date) = "+id+" AND delete_stk = 0   GROUP BY itemname ORDER BY itemname  ; ";
    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}
async function selectPerMonthforEachCat(id) {
  try {

    const conn = await db_connection();
    const response = await selectstockpermnthEachcat(conn,id)
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


//PIE CHART

const selectstockpercat = (con) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT stock_id, codeid,SUM(`item_qty_in`) as receives,SUM(`item_qty_out`) as issues, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE delete_stk = 0  GROUP BY codeid ORDER BY codeid  ; ";
    console.log(sqlquery);
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

}
async function selectStockPerCategory() {
  try {

    const conn = await db_connection();
    const response = await selectstockpercat(conn,)
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
//END OF PIE CHART


//DASHBOARD BAR GRAPH
const selectperday = (con)=>{
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT codeid, year(date) as year, month(date) as month, SUM(`item_qty_in`) as `qty`, SUM(item_qty_out) as qtyout FROM `stock`  GROUP BY month(date)  ORDER BY month(date) ; ";
   
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
}

async function selectStockPerMonth() {
  try {

    const conn = await db_connection();
    const response = await selectperday(conn,)
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
//END OF DASHBOARD BAR GRAPH

//FOR ISSUE ITEMS AVAILABILITY OF ITEM
const selectQty = (con, id) => {
  return new Promise((resolve, reject) => {
  
const sqlquery = "SELECT `codeid`, `codename`, SUM(`item_qty_in`)-SUM(`item_qty_out`) as `qty` FROM `stock` WHERE `codename` = '"+id+"' AND delete_stk = 0 GROUP BY `codename` HAVING COUNT(*)>=1  ; ";
console.log(sqlquery);
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

async function selectItemQty(id) {
  try {

    const conn = await db_connection();
    const response = await selectQty(conn,id)
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
}//END FOR ISSUE ITEMS AVAILABILITY OF ITEM






//filter by item for each category for inventory
const selectperitem = (con,id) => {
  return new Promise((resolve, reject) => {
  
    const sqlquery = "SELECT * FROM `stock` INNER JOIN item_name ON item_name.code = stock.codename LEFT JOIN item_table ON stock.item_num = item_table.item_id LEFT JOIN issue_item ON stock.issue_num = issue_item.issueId LEFT JOIN donation ON item_table.donationNum = donation.donation_id LEFT JOIN donor_all ON donation.donorName = donor_all.donor_id LEFT JOIN issuance ON issue_item.issuance = issuance.issuance_id WHERE item_name.code = '"+id+"' AND delete_stk = 0  ORDER BY itemname ; ";
    con.query(sqlquery, function(err, result)
    {
      if (err) return reject(err);
        if (result.length < 1) {
          return resolve([{stock_id:0}]);
        } else {
          resolve(result);
        }
    }
    );
    });
}
async function selectPerItemnameAllDetails(id) {
  try {

    const conn = await db_connection();
    const response = await selectperitem(conn,id)
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

      function omitPassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }


