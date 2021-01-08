import React from 'react'
import { Route, Link } from 'react-router-dom'
import AuthApiService from '../Auth-Service/api-auth-service';
import TokenService from '../Auth-Service/token-services';
import journalContext from '../journal-context';
import SignUp from './SignUp'


export default class LoginPage extends React.Component {

   static defaultProps = {
       onvalidLogin: () => {}
   }; 

   static contextType = journalContext;

   constructor(props){
       super(props);
       this.state  = {error : null};
   }

   //handle login auth and validation upon form submission
   handleJwtLoginAuth = e => {
       e.preventDefault();
       const {return_user, return_pass} = e.target;

       this.setState({
           error: null
       });

       AuthApiService.postLogin({
           user_name: return_user.value,
           password : return_pass.value
       })
       .then(res => {
           return_user.value = '';
           return_pass.value = '';
           TokenService.saveAuthToken(res.authToken);
           this.props.onvalidLogin();

           if(res.ok){
            this.context.setUserName(return_user.value)
            

           }
       })
       .then(() => {
           window.location = '/dashboard';
       })
       .catch(res => {
           this.setState({
               error: alert("Invalid username or password. Please re-enter your credentials.")
           })
       })

   }

    render(){

        return(
            <div>
                <h2>Login or Sign Up to Continue</h2>
                <form onSubmit = {this.handleJwtLoginAuth}>
                    <label>Username</label>
                    <input type = 'text' id="return-user" name="return_user"/>
                    <label>Password</label>
                    <input type="password" id="return-pass" name="return_pass"/>
                    <button type='submit' >
                    Login
                </button>
                <Link to ='./sign-up'>Sign Up here!</Link>
                </form>
            </div>
        )
    }


}