import React from 'react';
import { Link } from 'react-router-dom';
import './scream.css';


export default class Scream extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            body: '',
            clicked: false
        }

    }

    handleChange = event => {
        const {name, value } = event.target 

        this.setState({
            [name]: value
        })
    }

    handleRelease = (e) => {

        e.preventDefault();
        this.setState(
            {body: '',
            clicked : true
        })



    }
    

    render(){
        const { body } = this.state;

        return(
            <div className = "Scream-containter">
                {this.state.clicked == false ?
                <div>
                <div className = "Scream-prompt">    
                <p>Use this to toss off the words you’d otherwise tweet, write in your journal, or leave unarticulated and bottled up deep inside the folds of your brain
                    Type in your feelings, hit the “release" button, and watch your words disappear into the digital abyss. 
                </p>
                <br/>
                <p>These moments will go unrecorded so that you never have to come back to them again.
                    No one can see you or hear you in here.
                </p>
                </div>
                
                <form onSubmit = {this.handleRelease}>
                <textarea 
                className = 'Scream-space' 
                onChange={this.handleChange} 
                name="body" id="body" 
                value={body} 
                rows="10" 
                cols="100" 
                placeholder="What ails you?"
                >
                </textarea>
                <button className = "Scream-button">Release</button>
                </form>
                </div>
                  : null                  
                }
                   {this.state.clicked ? 
                    <div>
                    <img className = 'Poof-animation' src = "https://media0.giphy.com/media/xUA7bcJspBQvTfOne0/giphy.gif"/> 
                    <Link className = "Scream-button second" to = '/dashboard'>Back To Dashboard</Link>
                    </div>: null}
                </div>
        )
    }
}