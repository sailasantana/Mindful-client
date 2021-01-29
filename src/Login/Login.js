import React from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../Auth-Service/api-auth-service';
import TokenService from '../Auth-Service/token-services';
import journalContext from '../journal-context';
import config from '../config'
import './LoginSignUp.css'


export default class LoginPage extends React.Component {

   static defaultProps = {
       onvalidLogin: () => {}
   }; 

   static contextType = journalContext;

   constructor(props){
       super(props);
       this.userInput = React.createRef();
       this.passInput = React.createRef();


       this.state  = {
           error : null,
           posts : []
    };
   }



   //handle login auth and validation upon form submission and 
   //get user's entries + set them into context
   handleJwtLoginAuth = e => {
       e.preventDefault();
       this.setState({
           error: null
       });

       AuthApiService.postLogin({
           user_name:this.userInput.current.value,
           password : this.passInput.current.value
        
       })
       .then(res => {

           this.context.setUserName(this.userInput.current.value)        
           TokenService.saveAuthToken(res.token);
           this.props.onvalidLogin();

            fetch(`${config.API_ENDPOINT}/api/${this.userInput.current.value}`, {
                headers: {
                  'session_token':`${TokenService.getAuthToken()}`
                }
              })
              .then(res => {
                if(!res.ok){
                  return res.json().then(e => Promise.reject(e))
                }
                return res.json()
              })

              .then(posts => {

                this.context.updatePostsInState(posts)
              })
              .catch(error => {
                alert({error})
              })
           
       })
       .then(() => {
           this.props.history.push('/dashboard') 
       })
       .catch(res => {
           this.setState({
               error: alert("Invalid username or password. Please re-enter your credentials.")
           })
       })

   }

  

    render(){

        return (
            <div class="login">   
            <img className = "logo" src="/logo.png" width="210" height="180"/>
              <div className="login-triangle"></div>
              <h2 className="login-header">Log in to continue</h2>
              <form className="login-container"  onSubmit = {this.handleJwtLoginAuth}>
                <p><input type="username" ref={this.userInput} placeholder="Username"/></p>
                <p><input type="password" ref={this.passInput} placeholder="Password"/></p>
                <button type="submit" value="Log in" className='login-button'>Log In</button>
              </form>
             <p className= 'Sign-up-prompt'><Link to ='./sign-up'>New User? Sign Up here!</Link></p> 
            </div>)
    }


}