import React from 'react';
import { Link } from 'react-router-dom';
import journalContext from '../journal-context';
import config from '../config'
import TokenService from '../Auth-Service/token-services';

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
                console.log(err.message);
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
            console.log('hel')
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res
        })
        .then(() => {
            this.context.updatePost({id:this.props.match.params.id, content: this.bodyInput.current.value})
            console.log('hello')
            console.log(this.props.history)
            this.props.history.push('/dashboard')

        })
        .catch(error => {
            alert({error})
        })

    }

    render(){

        let getContent = this.context.posts.filter(post => 
            post.id == this.props.match.params.id)
        
        console.log(getContent[0].content)

        return (
            <div>
            <form onSubmit = {this.submitUpdate}>
                    <label>What Would you like to Change?</label>
                    <input 
                        type="textarea"
                        name="body"
                        id="body"
                        ref={this.bodyInput} 
                        defaultValue = {getContent[0].content}

                    />
                    <button >Edit</button>
            </form>
            
            </div>
        )

  }

}