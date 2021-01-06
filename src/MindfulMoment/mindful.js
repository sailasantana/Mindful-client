import React from 'react';
import Mindful from './mindful-store'

export default class MindfulQuote extends React.Component {

        
    constructor(props) {
        super(props)

        this.state = {           
            clicked: false
        }

    }

    handleClick = () => {
        this.setState({
            clicked : true
        })
    }

    render(){

        

        const quote = Mindful[0]

        return(
            <div>
                <h2>Good job getting a Mindful Moment in! 
                     </h2>
                <p>"{quote}"</p>
                <button onClick={this.handleClick}>x</button>
            </div>
        )
    }



}