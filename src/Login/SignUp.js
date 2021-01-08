import React from 'react'

 import AuthApiService from '../Auth-Service/api-auth-service'


export default class SignUp extends React.Component {

    static defaultProps = {
        onValidlRegistration: () => {}
    };

    constructor(props) {
        super(props);

        this.state = { 
            username: '',
            password: '',
            full_name:'',
            error: null
          
        };
    };



        // handle registration submission (POST new users). //
        submitRegistration = e => {
            e.preventDefault();
            const {user_name, password, first_name, last_name} = e.target; 
    
            this.setState({
                error: null
            });
    
            AuthApiService.postUser({
                user_name: user_name.value,
                password: password.value,
                first_name: first_name.value,
                last_name: last_name.value

            })
                .then(user => {
                    user_name.value = '';
                    password.value = '';
                    first_name.value = '';
                    last_name.value = '';
                    this.props.onValidlRegistration();
                })
                .then(() => {
                    window.location=`/`;
                    window.alert('Registered successfully. Please log in with your new credentials.');
                })
                .catch(res => {
                    this.setState({
                        error: window.alert('An unexpected error occurred. Please try again later.')
                    });
                });
        }    

    render(){

        return(
            <div>
                <h2>You otter relax... Sign Up</h2>
                <form onSubmit = {this.submitRegistration}>
                    <label>First Name</label>
                    <input type = 'text' name= 'first_name' id= 'first_name'/>
                    <label>Last Name</label>
                    <input type = 'text' name= 'last_name' id= 'last_name'/>
                    <label>Username</label>
                    <input type = 'text' name= 'user_name'
                    id= 'user_name'/>
                    <label>Password</label>
                    <input type = 'password' name= 'password' id= 'password'/>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }


}