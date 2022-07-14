export const insertDonor = (url, data) => 
{
    const token = localStorage.getItem("authToken");
   return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, 
    },
  })
    .then((response) => response)
    
}


export const getMealData = (id) => {
     
  const token = localStorage.getItem('DonorauthToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/bookings/meal/"+id,
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )
      
    
}
////////GET REQUEST DATA TO DISPLAY//////////////////////////
export const getRequestData = () => {
     
  const token = localStorage.getItem('DonorauthToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/required",
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )   
}

//////////////////RETRIEVE ALL BOOKINGS FOR LOGGED IN USER///////////////
export const getBookingData = (id) => {
     
  const token = localStorage.getItem('DonorauthToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/bookings/allbookings/"+id,
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )
      
    
}

/////////////////DELETE BOOKINGS/////////////////
export function deleteBooking(id,data) {
  
  const token = localStorage.getItem("DonorauthToken");
  return fetch("http://localhost:4000/bookings/book_delete/"+ id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }

  
  export function ForgetPass(data, id) {
  
    const token = localStorage.getItem("DonorauthToken");
   return fetch("http://localhost:4000/bookings/forgetpass/"+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    
   
    .catch((error) => {
      console.error("Error:", error);
    });
    }

/////////DELETE BOOKINGS///////////////////
    // export function getPermission(id,data) {
  
    //   const token = localStorage.getItem("authToken");
    //   return fetch("http://localhost:4000/bookings/book_delete/"+ id, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //   }
    
 ///    ///GET LOGGEDIN DONOR PERSON DETAILS////////////////////
export const getDonorPersondata = (id) => {
     
  const token = localStorage.getItem('DonorauthToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/donors/person/"+id,
  {
    method: "GET",
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    }
  })
  .then((response) =>
     response.json()
   
  )
      
    
}