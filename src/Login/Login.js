import React from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../Auth-Service/api-auth-service';
import TokenService from '../Auth-Service/token-services';
import journalContext from '../journal-context';
//import SignUp from './SignUp'
import config from '../config'


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

   //handle login auth and validation upon form submission
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
           console.log(res)
    
             
            console.log('abcd')
            this.context.setUserName(this.userInput.current.value)
        
         
           TokenService.saveAuthToken(res.authToken);
           this.props.onvalidLogin();

           
            console.log(`${config.API_ENDPOINT}/api/${this.userInput.current.value}`)
            fetch(`${config.API_ENDPOINT}/api/${this.userInput.current.value}`, {
                headers: {
                  'authorization':`bearer ${TokenService.getAuthToken()}`
                }
              })
              .then(res => {
                if(!res.ok){
                  return res.json().then(e => Promise.reject(e))
                }
                return res.json()
              })

              .then(posts => {
                  console.log(posts)
                this.context.updatePostsInState(posts)
              })
              .catch(error => {
                alert({error})
              })
             


           
       })
       .then(() => {
           console.log(this.props)
           this.props.history.push('/dashboard') 
           //window location refreshes page - so avoid using it
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
                    < input  ref={this.userInput} type = 'text' id="return_user" name="return_user"/>
                    <label>Password</label>
                    <input  ref={this.passInput}  type="password" id="return_pass" name="return_pass"/>
                    <button type='submit' >
                    Login
                </button>
                <Link to ='./sign-up'>Sign Up here!</Link>
                </form>
            </div>
        )
    }


}