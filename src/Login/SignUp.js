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
                .catch(err => {
                    this.setState({
                        error: err.error
                    });
                });
        }    

    render(){

        return(
            <div className = "sign-up">
                <img className = "logo" src="/logo.png" width="210" height="180"/>
                <div className="sign-up-triangle"></div>
                <h2 className="login-header">You otter relax...</h2>
                <form onSubmit = {this.submitRegistration} className="login-container">
                    <p><input type="firstname" placeholder="First Name" name= 'first_name' id= 'first_name' className = 'first_name'/></p>
                    <p><input type="lastname" placeholder="Last Name" name= 'last_name' id= 'last_name' className = 'last_name'/></p>
                    <p><input type="username" placeholder="Username" name= 'user_name' id= 'user_name' className = 'user_name'/></p>
                    <p><input type="password" placeholder="Password" name= 'password' id= 'password' className = 'password'/></p>
                    <button className = 'sign-up-button'>Sign Up</button>
                </form>
                {this.state.error ?
                    <div>{this.state.error}</div> : null
                    }
            </div>


        )
    }


}