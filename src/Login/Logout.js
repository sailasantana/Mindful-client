import React from 'react'
import TokenService from '../Auth-Service/token-services'


export default class Logout extends React.Component {


    handleLogOut = () => {

        TokenService.clearAuthToken()
        this.props.history.push('/')

    }

    render(){
        return(
            <div className = "logout-container">
            <button className = "logout-button" onClick = {this.handleLogOut}>Log Out</button>
            </div>
        )
    }

}