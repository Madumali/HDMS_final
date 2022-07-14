import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const Protected = (props) => {
    const history = useHistory();
    let Cmp = props.Cmp

    useEffect(()=> {

if(!localStorage.getItem('isLoggedIn'))
{
   
    history.push("/login")
}
// if(localStorage.getItem('userrole') == "front user")
// {
//     history.push("/items")
// }

    }, [])

return (
    <div>

        <Cmp/>
    </div>
);
}

export default Protected;