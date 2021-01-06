import React, { Component } from 'react';
import MindfulQuote from '../MindfulMoment/mindful'

class Form extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            title: '',
            body: '',
            submitted: false
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

    render() {
        const {title, body } = this.state;

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
                <div className = "mindful-quotes"> {this.state.submitted ? <MindfulQuote /> : null}</div>
            </div>
        )
    }
}

export default Form;