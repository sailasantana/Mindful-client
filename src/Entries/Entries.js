import React from 'react'
import Edit from '../Edit-Form/Edit'
import {Link} from 'react-router-dom'


const EntryBody = props => {
    const lines = props.entryData.map((line, index) => {
        return (
            <div key={index}>
                <h2>{line.title}</h2>
                <p>{line.body}</p>
                <button onClick={() => props.removePost(index)}>Delete</button>
                <Link to ='./edit'>Edit</Link>
            </div>
        )
    })

    return (
        <div>
            {lines}  
        </div>
    )
}

const Posts = (props) => {
    
        const { entryData, removePost } = props;

        return (
            <div>
                <h2>My Entries</h2>
               
                
                <EntryBody entryData={entryData} removePost={removePost}/>
            </div>

        )
    
}

export default Posts