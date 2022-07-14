export const insertItems = (url, data) => 
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


export function updateItems(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/items/item"+ id, {
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
  

    export function deleteItem(id, data) {
  
      const token = localStorage.getItem("authToken");
      return fetch("http://localhost:4000/items/item_delete"+ id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
      }