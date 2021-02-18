import React from 'react';
import { Link } from 'react-router-dom';
import journalContext from '../journal-context';
import config from '../config';
import TokenService from '../Auth-Service/token-services';
import './Edit.css';

export default class Edit extends React.Component {

    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }

    static contextType = journalContext;

    constructor(props){
        super(props)
        this.bodyInput = React.createRef();
        this.state = {
            error : null
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
                alert('You must be logged in to continue')
                this.props.history.push('/')
            })

    }

    submitUpdate = (e) => {
        e.preventDefault();

        let updatedEntry = {
            content: this.bodyInput.current.value

        }

       fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/${this.props.match.params.id}`,  {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'session_token': TokenService.getAuthToken()
        },
        body: JSON.stringify(updatedEntry),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res
        })
        .then(() => {
            this.context.updatePost({id:this.props.match.params.id, content: this.bodyInput.current.value})
            this.props.history.push('/dashboard')

        })
        .catch(error => {
            alert({error})
        })

    }

    render(){

        let getContent = this.context.posts.filter(post =>  post.id == this.props.match.params.id)
        
        return (
            <div className= 'Journal-container'>
             <h2 className = "Edit-label">What Would you like to Change?</h2>
            <form className = "Journal-form" onSubmit = {this.submitUpdate}>
                    <textarea 
                        type="textarea"
                        name="body"
                        id="body"
                        ref={this.bodyInput} 
                        defaultValue = {getContent[0].content}
                        className = 'Entry-content'
                        rows = "23" 
                        cols="70"                        

                    />
                    <button className='Edit-button' >Edit</button>
            </form>      
            </div>
        )

   }

}