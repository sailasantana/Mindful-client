import React from 'react'
import { Route, Link } from 'react-router-dom'
import SignUp from './SignUp'


export default class LoginPage extends React.Component {

    render(){

        return(
            <div>
                <h2>Login or Sign Up to Continue</h2>
                <form >
                    <label>Username</label>
                    <input type = 'text' name= 'user-name'/>
                    <label>Password</label>
                    <input type = 'text' name= 'password'/>
                    <button type='submit' >
                    <Link to ='./dashboard'>Login</Link>
                </button>
                <Link to ='./sign-up'>Sign Up here!</Link>
                </form>
            </div>
        )
    }


}