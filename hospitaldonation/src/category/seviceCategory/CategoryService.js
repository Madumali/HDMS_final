
export const insertCategory = (url, data) => 
{
    const token = localStorage.getItem("authToken");
   return fetch(url, 
    {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, 
    },
  })
    .then((response) => response.json())
    
}

export function updateCategory(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/category/category" + id, {
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

  export function deleteCategory(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/category/category-delete"+ id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
    }
      
     
        
        


 
