import React, { Component } from 'react';
import Mindful from '../MindfulMoment/mindful-store'

class Form extends Component {


    constructor(props) {
        super(props)

        this.initialState = {
            title: '',
            body: '',
            submitted: false,
            clicked : false
        }



        this.state = this.initialState
    }
    handleChange = event => {
        const {name, value } = event.target 

        this.setState({
            [name]: value

        })
    }
    submitForm = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state)

        this.setState(this.initialState)
        this.setState({submitted: true})

    }

    handleClick = () => {
        this.setState({submitted: false})
    }



    render() {
        const {title, body } = this.state;
        const quote = Mindful[0]


        return (
            <div>
                <h2>Add An Entry</h2>
                <form>
                    <label>Title</label>
                        <input 
                            placeholder="Enter title"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={this.handleChange} />
                        <label>Entry</label>
                        <input 
                            placeholder="What's up?"
                            type="textarea"
                            name="body"
                            id="body"
                            value={body}
                            onChange={this.handleChange} />
                </form>
                <button onClick={this.submitForm}>Submit</button>
                <div className = "mindful-quotes"> 
                {this.state.submitted ? 
                 <div>
                 <h2>Good job getting a Mindful Moment in! 
                      </h2>
                 <p>"{quote}"</p>
                 <button onClick = {this.handleClick}>x</button>
 
             </div> : null}</div>
            </div>
        )
    }
}

export default Form;