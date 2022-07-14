
const getMeal = (e)=> {
    const id = e.target.value
   bookingServices
      .getMealData(id)

      .then((data) => {
        if(data.msg == "No data available")
        {
          setResponse(data);
          
        }
        else {
        const dataarray = [];
        for (const key in data) {
          const dep = {
            id: key,
            ...data[key],
          };
          dataarray.push(dep);
        }
console.log("meals", dataarray);
        setMeal(dataarray);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  };



  const handleCheck = (e) => {
    var val = e.target.value;
    let data = allcheck;
    if(e.target.checked)
    {
allcheck[val] = val
    }
    else{
      allcheck.splice(val, 1);
    }
  // data.push(e.target.value);
console.log("vvvvv",allcheck);


  }
  // {...allcheck, [e.target.name]:e.target.value}  