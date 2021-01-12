  
import React, { useState } from "react";
import Calendar from "react-calendar";
import './Calendar.css'
import getEntriesByDate from '../helper-funcs'
import journalContext from "../journal-context";

//how do I bring context into react hooks so that I can use a context method
//(e.g line 19)

const ReactCalendar = () => {
  
  //static contextType = journalContext;

  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
         // updateCurrentDate(date)

  };

  return (
    <div>
      <Calendar showWeekNumbers onChange={onChange} value={date} />
      {console.log(date)}
      {date.toString()}
    </div>
  );
}

export default ReactCalendar;