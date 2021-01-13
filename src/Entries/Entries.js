import React from 'react'
import Edit from '../Edit-Form/Edit'
import {Link} from 'react-router-dom'
import journalContext from '../journal-context'
import moment from 'moment';
import Entry from './Entry'
//import Edit from '../Edit-Form/Edit'



class Posts extends React.Component {

    static contextType = journalContext;

    handleDeleteNote = id => {
        this.props.history.push(`/dashboard`)
    };
  

    render(){

        const date = this.context.currentDateSelection
        const formattedDate = moment(date).format('MM/DD/YYYY');
     

        let filteredEntries = this.context.posts.filter( (posts , i) => 
        formattedDate == moment(this.context.posts[i].modified).format('MM/DD/YYYY'))
            console.log(filteredEntries)


        const entries = filteredEntries.map((posts ,i) => {

            return (    
                <ul>
                    
                        <li key={filteredEntries[i].id}>
                            <Entry
                                id={filteredEntries[i].id}
                                title={filteredEntries[i].title}
                                content={filteredEntries[i].content}
                                onDeleteNote={this.handleDeleteNote}/>
                        </li>
                    
                </ul>
             
            )
        })

        return(
         <div>

            <h2>Your Entries : {formattedDate}</h2>
            <div>{entries}</div>
         </div>   
         
         
        )
    }
}





 export default Posts


{/* <h2>{{filteredEntries} ? `Your Entries : {formattedDate}` : `No Entries`}</h2>  */}
