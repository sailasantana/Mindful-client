import React, { Component } from 'react'
import journalContext from '../journal-context'
import Mindful from '../MindfulMoment/mindful-store'
import config from '../config'
import { Link } from 'react-router-dom'
import TokenService from '../Auth-Service/token-services'


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
        this.setState({submitted: false})
    }



    render() {

        let max = 49;
         
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        
        let quote = Mindful[getRandomInt(max)]


        return (
            <div>
                <h2>Add Today's Entry or <Link to = '/scream'>Scream and Release</Link></h2>
                <form  onSubmit={this.submitForm}>
                    <label>Title</label>
                        <input 
                            placeholder="Enter title"
                            ref = {this.titleInput}
                            type="text"
                            name="title"
                            id="title"
                            required
                            />
                        <label>Entry</label>
                        <input 
                            placeholder="What's up?"
                            ref = {this.bodyInput}
                            type="textarea"
                            name="body"
                            id="body"
                            required
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