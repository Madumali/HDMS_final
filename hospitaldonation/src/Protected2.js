import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const Protected2 = (props) => {
    const history = useHistory();
    let Cmp = props.Cmp

    useEffect(()=> {

if(!localStorage.getItem('DonorisLoggedI'))
{
   
    history.push("/bookings")
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

export default Protected2;