  
import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import './Calendar.css'
import getEntriesByDate from '../helper-funcs'
import journalContext from "../journal-context";
import 'react-calendar/dist/Calendar.css';




   
 function ReactCalendar(){

  const context = useContext(journalContext)
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
    context.updateCurrentDate(date)
    context.setClicked(true)

  }

  return (
    <div>
      <img className = 'sun-ray' src="https://media3.giphy.com/media/JpMnkVV9s3ILRYYHnq/giphy.gif" height='70' width='130'/>
      <Calendar  className = "calendar-table" onChange = {onChange} value = {date} maxDate= {new Date()}/>     
    </div>
  )
   
 }





export default ReactCalendar;