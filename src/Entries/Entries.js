import React, { Component } from 'react'
import Edit from '../Edit-Form/Edit'
import {Link} from 'react-router-dom'
import MindfulQuote from '../MindfulMoment/mindful'


const EntryBody = props => {
    const lines = props.entryData.map((line, index) => {
        return (
            <div key={index}>
                <h2>{line.title}</h2>
                <p>{line.body}</p>
                <button onClick={() => props.removeEntry(index)}>Delete</button>
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

const Entries = (props) => {
    
        const { entryData, removeEntry } = props;

        return (
            <div>
                <h2>My Entries</h2>
               
                
                <EntryBody entryData={entryData} removeEntry={removeEntry}/>
            </div>

        )
    
}

export default Entries