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