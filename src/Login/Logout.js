import React from 'react'
import TokenService from '../Auth-Service/token-services'


export default class Logout extends React.Component {


    handleLogOut = () => {

        TokenService.clearAuthToken()
        console.log(this.props)
        this.props.history.push('/')

    }

    render(){
        return(
            <button className = 'logout-button' onClick = {this.handleLogOut}>Log Out</button>
        )
    }

}