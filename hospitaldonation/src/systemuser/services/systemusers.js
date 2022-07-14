export const insertUser = (url, data) => {
  const token = localStorage.getItem("authToken");
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response);
};

export const getDepartments = () => {
  const token = localStorage.getItem("authToken");
  console.log(token, "token");
  return fetch("http://localhost:4000/department", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
};

export const getDesignation = () => {
  const token = localStorage.getItem("authToken");
  console.log(token, "token");
  return fetch("http://localhost:4000/department/des", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
};

export const getAllUsers = () => {
  const token = localStorage.getItem("authToken");
  console.log(token, "token");
  return fetch("http://localhost:4000/system-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
};

export function deleteUser(id,data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/system-user/user_delete/"+ id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
  }
  
export function updateUser(id, data) {
  
  const token = localStorage.getItem("authToken");
  return fetch("http://localhost:4000/system-user/user_update/"+ id, {
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
