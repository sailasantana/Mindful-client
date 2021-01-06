import React from 'react'
import { Link } from 'react-router-dom'


export default class SignUp extends React.Component {

    render(){

        return(
            <div>
                <h2>You otter relax... Sign Up</h2>
                <form >
                    <label>Full Name</label>
                    <input type = 'text' name= 'full-name'/>
                    <label>Username</label>
                    <input type = 'text' name= 'user-name'/>
                    <label>Password</label>
                    <input type = 'text' name= 'password'/>
                    <Link to ='./'>Sign Up here!</Link>
                </form>
            </div>
        )
    }


}