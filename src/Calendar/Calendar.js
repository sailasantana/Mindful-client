  
import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import './Calendar.css';
import journalContext from "../journal-context";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';


   
 function ReactCalendar(){

  const context = useContext(journalContext)
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
    context.updateCurrentDate(date)
    context.setClicked(true)

  }

  
 
  let posts = context.posts 

  let allDates = () => {

      let array = [];
      
      if(!posts){
          return;
      }       
      else {

        posts.map( (posts , i) => {
            let formattedDate = moment(context.posts[i].date_modified).format('MM/DD/YYYY')
             array.push(formattedDate)
             return;

          })
         return array;  
    } 
  }       



  const customTile = ({ activeStartDate, date, view,i }) => 
  view === 'month' && allDates().includes(moment(date).format('MM/DD/YYYY'))  ? <img src="https://media4.giphy.com/media/Kg9JwOFEyoK75CzQSK/source.gif" width="23" height="17"/> : null

  return (
    <div className = "calendar-container">
      <Calendar  className = "calendar-table" onChange = {onChange} value = {date} maxDate= {new Date()} tileContent={customTile}/>     
    </div>
  )
   
 }





export default ReactCalendar;