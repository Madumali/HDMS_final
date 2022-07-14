export const insertRequest = (url, data) => 
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

//GET Request details TO request reports
export const getRequestDetails = (start,end) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/requestDetails/"+start+"/"+end,
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

//GET Request Items total per item
export const getRequestItemTotal = (start,end) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/requestTotals/"+start+"/"+end,
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
//GET ALL REQUESTS TO TABLE TO ISSUE DONATION AND DELETE
export const getRequestsAll = () => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests",
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
// update accept status
export function updateRequest(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/requests/update/"+ id, {
    method: "PATCH",
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

//DELETE DONATION REQUEST BY ADMIN
export function deleteRequest(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/requests/delete/"+ id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()
    )
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  //GET ALL REQUESTS TO TABLE TO EDIT AND DELETE BY EACH RECEIVER
export const getRequestsAllForEach = (id) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/requests/foreach/"+id,
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

//DELETE DONATION REQUEST BY ADMIN
export function deleteRequestForeach(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/requests/deleteforeach/"+ id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()
    )
    .catch((error) => {
      console.error("Error:", error);
    });
  }