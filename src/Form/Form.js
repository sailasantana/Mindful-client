import React, { Component } from 'react';
import journalContext from '../journal-context';
import Mindful from '../MindfulMoment/mindful-store'
import config from '../config'


class Form extends Component {

   
    static contextType = journalContext

    constructor(props) {
        super(props)
        this.titleInput = React.createRef();
        this.bodyInput = React.createRef();

        

        this.state = {
            title: '',
            body: '',
            error: null,
            submitted: false,
            clicked : false
        }



    }
 
    submitForm = (e) => {

        e.preventDefault();
        console.log('abc')
        this.setState({
            error: null,
            submitted: true
        })

        let newEntry = {
            title : this.titleInput.current.value,
            content: this.bodyInput.current.value
        }

       fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}`,  {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newEntry),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(post => {
            this.context.addPost(post)
        })
        .catch(error => {
            alert({error})
        })

    
        

    }

    handleClick = () => {
        this.setState({submitted: false})
    }



    render() {
        //const {title, body } = this.state;
        const quote = Mindful[0]


        return (
            <div>
                <h2>Add Today's Entry</h2>
                <form  onSubmit={this.submitForm}>
                    <label>Title</label>
                        <input 
                            placeholder="Enter title"
                            ref = {this.titleInput}
                            type="text"
                            name="title"
                            id="title"
                            />
                        <label>Entry</label>
                        <input 
                            placeholder="What's up?"
                            ref = {this.bodyInput}
                            type="textarea"
                            name="body"
                            id="body"
                             />
                        <button>Submit</button>

                </form>
                        <div className = "mindful-quotes"> 
                        {this.state.submitted ? 
                        <div>
                        <h2>Good job getting a Mindful Moment in! 
                            </h2>
                        <p>"{quote}"</p>
                        <button onClick = {this.handleClick}>x</button>
        
                        </div> : null}
                </div>
            </div>
        )
    }
}

export default Form;