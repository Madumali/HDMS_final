export const insertIssuance = (url, data) => 
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

//GET ALL DONATIONS ISSUES TO TABLE TO EDIT DELETE
export const getIssuanceAll = () => {
     
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/issuance/",
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

//DELETE DONATION ISSUE TEMPORARY
export function deleteDonationIssue(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/issuance/delete/"+ id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }
 //SELECT DELETED ISSUES
 export const getDeletedIssues = () => {   
  const token = localStorage.getItem('authToken');
  console.log(token, 'token');
  return fetch("http://localhost:4000/issuance/getdeleteissue",
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

//RESTORE DELETED ISSUES
export function restoreDeleteIssues(id,data) {
console.log("restore delete", data)
const token = localStorage.getItem("authToken");
return fetch("http://localhost:4000/issuance/restore-delete/"+ id, {
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
export function deleteIssuesForever(id,data) {
const token = localStorage.getItem("authToken");
return fetch("http://localhost:4000/issuance/forever-delete/"+ id, {
method: "DELETE",
headers: {
"Content-Type": "application/json",
Authorization: "Bearer " + token,
},
body: JSON.stringify(data),
})
.then((response) => response.json())
}