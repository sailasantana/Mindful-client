import React from 'react';
import { Link } from 'react-router-dom';
import journalContext from '../journal-context';
import config from '../config'

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

    submitUpdate = (e) => {
        e.preventDefault();

        let updatedEntry = {
            content: this.bodyInput.current.value
        }

       fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/${this.props.match.params.id}`,  {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedEntry),
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(post => {
            this.context.updatePost(post)
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