export const getAllPendingBooking = () => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    return fetch("http://localhost:4000/bookings/forapproval", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => response.json());
  };

  //THIS WILL APPROVE THE RESERVATION
  export function updateApprove(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/bookings/approve/"+ id, {
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

    //THIS WILL REJECT THE RESERVATION
  export function updateApproveReject(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/bookings/reject/"+ id, {
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


    //THIS WILL GET ALL APPROVED BOOKINGS AND CHECK WHETHER IT IS RECEIVED OR NOT
    export const getAllapprovedBookings = () => {
      const token = localStorage.getItem("authToken");
      console.log(token, "token");
      return fetch("http://localhost:4000/bookings/progress", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => response.json());
    };

      //THIS WILL CONFIRM WHWTHER THE RESERVATION IS RECEIVED
  export function updateConfirm(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/bookings/confirmdonation/"+ id, {
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


    //THIS WILL CONFIRM WHWTHER THE RESERVATION IS RECEIVED
  export function  updateUncompletedDonation(id, data) {
  
    const token = localStorage.getItem("authToken");
    return fetch("http://localhost:4000/bookings/confirmdonationNotreceive/"+ id, {
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


    export const getAllBookings = () => {
      const token = localStorage.getItem("authToken");
      console.log(token, "token");
      return fetch("http://localhost:4000/bookings/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => response.json());
    };
  
   