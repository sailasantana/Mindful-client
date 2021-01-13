import React from 'react';
import journalContext from '../journal-context';
import {Link} from 'react-router-dom'
import config from '../config'




export default class Entry extends React.Component {
    static defaultProps = {
      onDeleteEntry: () => {}
    };

    static contextType = journalContext;

    handleClickDelete = e => {
      e.preventDefault();
      const entry_id = this.props.id;
      console.log(entry_id)

      fetch(`${config.API_ENDPOINT}/api/${this.context.user_name}/${entry_id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
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

          <h2 className='Entry_title'>
            
              {title}
          
          </h2>
          <p className='Entry_content'>
            
            {content}
        
        </p>

          <button 
            className='Entry__delete' 
            type='button'
            onClick={this.handleClickDelete}>
            {' '}
            Remove

          </button>
          <button 
            className='Entry__edit' 
            type='button'
            onClick={this.handleClickEdit}>
            <Link to={`/edit/${id}`}>
            {' '}
            Edit
            </Link>
          

          </button>

         
        </div>
      )
    }
  }