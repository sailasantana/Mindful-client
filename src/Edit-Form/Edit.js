import React from 'react';
import { Link } from 'react-router-dom';

export default class Edit extends React.Component {

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
            <Link to ='./dashboard'>Edit</Link>
            </div>
        )

  }

}