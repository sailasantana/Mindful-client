import React from 'react';
import { Link } from 'react-router-dom'


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
            <div>
                {this.state.clicked == false ?
                <div>
                <p>Use this to toss off the words you’d otherwise tweet, write in your journal, or leave unarticulated and bottled up deep inside the folds of your brain
                    Type in your feelings, hit the “release" button, and watch your words disappear into the digital abyss. 
                </p>
                <br/>
                <p>This is a safe space - no one can see you or hear you in here.</p>
                
                <form onSubmit = {this.handleRelease}>
                <textarea onChange={this.handleChange} name="body" id="body" value={body} rows="20" cols="100" required>
                </textarea>
                <button>Release</button>
                </form>
                <Link to = '/dashboard'>Back</Link> 
                </div>
                  : null                  
                }
                   {this.state.clicked ? 
                    <div>
                    <img src = "https://media1.tenor.com/images/a1b6c954f41993410e4e2bf015e13fed/tenor.gif?itemid=4674557"/> 
                    <button>
                     <Link to = '/dashboard'>Back</Link> 
                    </button>
                    </div>: null}
                </div>
        )
    }
}