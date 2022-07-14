
//INSERT DONATION DETAILS
export const insertDonation = (url, data) => 
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

//GET DONATION THAT ENTERS NOW, TO PRINT DATA
export const getCurrentDon = (donname) => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/donations/now/"+donname,
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
//GET ALL DONATIONS TO TABLE TO EDIT DELETE
export const getDonationsAll = () => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/donations",
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

//SELECT DONATION FILTER BY DATES
export const donationsByDates = (start,end) => {   
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/donations/filterdonations/"+start+"/"+end,
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
//DELETE DONATION TEMPORARY
export function deleteDonation(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/donations/delete/"+ id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }

     //SELECT DELETED DONATIONS
     export const getDeletedDonation = () => {   
      const token = localStorage.getItem('authToken');
      console.log(token, 'token');
      return fetch("http://localhost:4000/donations/getdeletedonation",
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

//RESTORE DELETED DONATION
export function restoreDeleteDonation(id,data) {
console.log("restore delete", data)
const token = localStorage.getItem("authToken");
return fetch("http://localhost:4000/donations/restore-delete/"+ id, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
}

//DELETE FOREVER
export function deleteDonationForever(id,data) {
const token = localStorage.getItem("authToken");
return fetch("http://localhost:4000/donations/forever-delete/"+ id, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
}