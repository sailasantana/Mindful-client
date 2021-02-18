import React from 'react'
import Edit from '../Edit-Form/Edit'
import {Link} from 'react-router-dom'
import journalContext from '../journal-context'
import moment from 'moment';
import Entry from './Entry'
//import Edit from '../Edit-Form/Edit'
import TokenService from '../Auth-Service/token-services'
import config from '../config'
import Stats from '../Stats/stats'
import ReactCalendar from '../Calendar/Calendar'
import LogOut from '../Login/Logout'



class Posts extends React.Component {

    static contextType = journalContext;

    componentDidMount(){
        const token = TokenService.getAuthToken();
        const options = {
            method: 'GET',
            headers: {
                'session_token':token
            }
        }

        fetch(`${config.API_ENDPOINT}/api/validate`, options)
            .then(response => {
                if(response.ok){

                    return response.json()
                }
                throw new Error(response.statusText)
            })
            .then( responseJson => {
                this.setState({
                    message: responseJson.message
                })
            })
            .catch( err => {
                alert('You must be logged in to continue')
                this.props.history.push('/')
            })

    }

    handleDeleteNote = id => {
        this.props.history.push(`/dashboard`)
    };
  

    render(){

        const date = this.context.currentDateSelection
        const formattedDate = moment(date).format('MM/DD/YYYY');
     
        let filteredEntries = this.context.posts.filter( (posts , i) => 
        formattedDate == moment(this.context.posts[i].date_modified).format('MM/DD/YYYY'))





        const entries = filteredEntries.map((posts ,i) => {

            return (    
                <ul className= "Entry-single">
                    
                        <li key={filteredEntries[i].id}>
                            <Entry
                                history = {this.props.history}
                                id={filteredEntries[i].id}
                                title={filteredEntries[i].title}
                                content={filteredEntries[i].content}
                                onDeleteNote={this.handleDeleteNote}/>
                        </li>
                    
                </ul>
             
            )
        })

        return(
         <div className = "Entries-container">  
         <LogOut history = {this.props.history}/>   
         <div className = "Welcome-container">
         <ReactCalendar history = {this.props.history}/> 
         <Stats history = {this.props.history} />    
         </div> 
         {this.context.clicked && filteredEntries ?
         <div>
            <h2 className="Entry-all-title">{formattedDate}</h2>
            <div>{entries}</div>
         </div> 
         : null}
         </div> 
        )
    }
}





 export default Posts


{/* <h2>{{filteredEntries} ? `Your Entries : {formattedDate}` : `No Entries`}</h2>  */}
