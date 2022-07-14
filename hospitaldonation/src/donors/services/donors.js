// import React, {useState} from "react";
// INSERT DONORS
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


//GET DONOR PERSONS TO EDIT
export const getDonorPersons = () => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/donors/person",
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


// UPDATE DONOR PERSON IN TABLE
export function updateDonorPerson(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/donors/donor/"+ id, {
    method: "POST",
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


//DELETE DONOR PERSON TEMPORARY
  export function deleteDonor(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/donors/donor-delete"+ id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
    }


      //SELECT DONORS BETWEE  DATES
      export const getBetweenDates = (start,end) => {   
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        return fetch("http://localhost:4000/donors/donordate/"+start+"/"+end,
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

//SELECT CHOSEN BLOOD DONORS
      export const bloodDonBetweenDates = (start,end) => {   
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        return fetch("http://localhost:4000/donors/blooddonordate/"+start+"/"+end,
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
      
       //SELECT deleted donors
       export const getDeletedDonors = () => {   
        const token = localStorage.getItem('authToken');
        console.log(token, 'token');
        return fetch("http://localhost:4000/donors/getdeletedonor",
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

//RESTORE DELETED DONOR PERSON
export function restoreDelete(id,data) {
  console.log("restore delete", id)
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/donors/restore-delete/"+ id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }
  

  // DELETE FOREVER DONOR PERSON
export function deleteDonorForever(id,data) {
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/donors/forever-delete/"+ id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }