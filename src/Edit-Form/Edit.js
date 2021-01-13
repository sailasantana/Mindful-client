import React from 'react';
import { Link } from 'react-router-dom';
import journalContext from '../journal-context';

export default class Edit extends React.Component {

    static contextType = journalContext;

    constructor(props){
        super(props)
        this.bodyInput = React.createRef();
    }

    submitForm = () => {
        console.log('edited!')


    }

    render(){

        return (
            <div>
            <h2>Edit Your Entry</h2>
            <form>
                    <label>Entry</label>
                    <input 
                        placeholder="What Would you like to Change?"
                        type="textarea"
                        name="body"
                        id="body"
                    />
            </form>
            <button><Link to ='./dashboard'>Edit</Link></button>
            </div>
        )

  }

}