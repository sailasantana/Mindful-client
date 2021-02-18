import React from 'react';
import journalContext from '../journal-context';
import {Link} from 'react-router-dom'
import config from '../config'
import TokenService from '../Auth-Service/token-services';
import './Entries.css'




export default class Entry extends React.Component {
    static defaultProps = {
      onDeleteEntry: () => {}
    };

    static contextType = journalContext;

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

    handleClickDelete = e => {
      e.preventDefault();
      const entry_id = this.props.id;

      fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/${entry_id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'session_token': TokenService.getAuthToken()
        },
      })
      .then (res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return null;
      })
      .then(() => {
        this.context.deletePost(entry_id);
        this.props.onDeleteEntry(entry_id);
      })
      .catch(error => {
        console.error({error});
      });
    }

    render () {  
      const {title , id, content} = this.props; 

      return (
        <div className='Entry'>
          <h2 className='title'>
            {title}
          </h2>
          <p className='content'>       
            {content}        
          </p>
          <button 
            className='Entry-delete-button' 
            type='button'
            onClick={this.handleClickDelete}>
            {' '}
            Remove
          </button>
          <button 
            className='Entry-edit-button' 
            type='button'
            onClick={this.handleClickEdit}>
            <Link  className = "Edit-button-text" to={`/edit/${id}`}>
            {' '}
            Edit
            </Link>
          </button>        
        </div> 
      )
    }
  }