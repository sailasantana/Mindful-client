  
import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import './Calendar.css'
import getEntriesByDate from '../helper-funcs'
import journalContext from "../journal-context";


   
 function ReactCalendar(){

  const context = useContext(journalContext)
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
    context.updateCurrentDate(date)

  }

  return (
    <div>
      <Calendar  className = "table" onChange = {onChange} value = {date}/>
     
    </div>
  )
   
 }





export default ReactCalendar;