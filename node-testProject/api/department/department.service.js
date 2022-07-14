const db_connection = require("../routes/config/database");

module.exports = {
    selectDepartment,
    selectDesignation,
};


const selectDep = (con) => {

    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM `department`;",

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


const selectDes = (con) => {

  return new Promise((resolve, reject) => {
      con.query(
          "SELECT * FROM `designation`;",

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





async function selectDepartment()
{
    try{
        const conn = await db_connection();
      const response = await selectDep(conn);
      if(response.length < 1)
      {
        return "No data available";
      }
      return {
        ...omitPassword(response),
      };
    }
    catch(e){
        console.error;
    }


}


async function selectDesignation()
{
    try{
        const conn = await db_connection();
      const response = await selectDes(conn);
      if(response.length < 1)
      {
        return "No data available";
      }
      return {
        ...omitPassword(response),
      };
    }
    catch(e){
        console.error;
    }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}