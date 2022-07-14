import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  
import './Reserv.css'
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';


function Dates() {
  const [date,setDate] = useState(new Date());
  const [sentence, setSentence] =useState("");
const [mark, setMark] = useState([new Date()])
const fetchdata = () =>{
  const dataarray1 = [];
  const sunnyDays1 = [];
   const token = localStorage.getItem('DonorauthToken');
   console.log(token, 'token');
fetch("http://localhost:4000/bookings/bookddate",
   { 
     method: "GET",
     headers:  {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization' : 'Bearer ' + token
     }
   })
   .then((response) => {
     const res = response.json();
     return res
    
   }).then((res) => {
      for (const key in res) {
       const booked = {
                             id:key,
                         ...res[key]
                      }
      let intdate = parseInt(booked.reserved_date)
       dataarray1.push(booked.month);
       sunnyDays1.push(booked.dates);
     setMark(sunnyDays1);
     setSentence("This date is already booked");
      }
      console.log("arrDataddd", sunnyDays1)
}).catch(e => {
          console.log("error", e)
      })
}
useEffect(()=>{
fetchdata()
},[])






  return (
    <div className='cal'>
      <p className='text-center'>
      {date.toDateString()} 
    </p>
    <p >
     
     
     </p>
      <Calendar style={{height: 550}}
    onChange={setDate}
    value={date}
    // value={date}
    tileClassName={({ date, view }) => {
      if(mark.find(x=>x===moment(date).format("YYYY-MM-DD"))){
       return  'highlight';
      }
 
    }
  }

  tileContent = {({date, view}) => 
{
  if(mark.find(x=>x===moment(date).format("YYYY-MM-DD"))){
    return  view === 'month' && <Link to="#"><BsFillHeartFill data-toggle="tooltip" data-placement="bottom" title="Already reserved for a donation"/> </Link> ;
   }
}}

 >
     </Calendar>
 
    </div>
  );
}
export default Dates;