import React, { Component } from 'react'
import journalContext from '../journal-context'
import Mindful from '../MindfulMoment/mindful-store'
import config from '../config'
import { Link } from 'react-router-dom'
import TokenService from '../Auth-Service/token-services'
import './Form.css'

//you can just use controlled inputs   

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

    componentDidMount(){
        const token = TokenService.getAuthToken();
        const options = {
            method: 'GET',
            headers: {
                'session_token':token
            }
        }

        fetch(`${config.API_ENDPOINT}/api/validate`, options)
            .then(response => {
                if(response.ok){

                    return response.json()
                }
                throw new Error(response.statusText)
            })
            .then( responseJson => {
                this.setState({
                    message: responseJson.message
                })
            })
            .catch( err => {
                console.log(err.message);
                this.props.history.push('/')
            })

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
            'content-type': 'application/json',
            'session_token': TokenService.getAuthToken()

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
        
        this.setState({
            title: '',
            body: '',
            submitted: false
        
        })

        this.titleInput = ''
        this.bodyInput = ''
    }



    render() {

        let max = 47;
         
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        
        let quote = Mindful[getRandomInt(max)]

        let className='Pop-up';
        if (this.state.submitted == true) {
          className += ' Pop-up-active';
        }

        return (
            <div className= 'Journal-container'>
                <h2 className = "Journal-form-title">Add Today's Entry or <Link to = '/scream'>Scream and Release</Link></h2>
                <form className = "Journal-form" onSubmit={this.submitForm}>
                        <input 
                            placeholder="Enter title"
                            ref = {this.titleInput}
                            type="text"
                            className = 'Entry-title'
                            name="title"
                            id="title"
                            required
                            />
                        <textarea 
                            placeholder="What's up?"
                            ref = {this.bodyInput}
                            type="textarea"
                            className = 'Entry-content'
                            name="body"
                            id="body"
                            rows = "18" 
                            cols="70"
                            required
                             />
                        <button className = "Journal-button">Submit</button>

                </form>
                <div className = {className}> 
                    {this.state.submitted ? 
                    <div>
                    <h3 className='Prompt-1'>Great job getting a Moment in!</h3>
                    <button className='Pop-up-button' onClick = {this.handleClick}>x</button>
                    <p>"{quote}"</p>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default Form;