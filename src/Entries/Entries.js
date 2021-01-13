import React from 'react'
import Edit from '../Edit-Form/Edit'
import {Link} from 'react-router-dom'
import journalContext from '../journal-context'
import moment from 'moment';
//import Edit from '../Edit-Form/Edit'



class Posts extends React.Component {

    static contextType = journalContext;

    constructor(props){
        super(props)
      
    }

    

    render(){

        const date = this.context.currentDateSelection
        const formattedDate = moment(date).format('MM/DD/YYYY');
     

        let filteredEntries = this.context.posts.filter( (posts , i) => 
        formattedDate == moment(this.context.posts[i].modified).format('MM/DD/YYYY'))
            console.log(filteredEntries)


        const entries = filteredEntries.map((posts ,i) => {

            return (
                <div key = {filteredEntries[i].id}>
                    <h2>{filteredEntries[i].title}</h2>
                    <p>{filteredEntries[i].content} </p>
                    <button>Delete</button>
                    <button><Link to = './Edit'>Edit</Link></button>

                </div>
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
