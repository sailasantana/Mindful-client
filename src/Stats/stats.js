import React from 'react';
import getNumberofEntries from '../helper-funcs';
import journalContext from '../journal-context';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './stats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../Auth-Service/token-services';
import config from '../config';




export default class Stats extends React.Component {

    static contextType = journalContext;

    componentDidMount(){
        const token = TokenService.getAuthToken();
        const options = {
            method: 'GET',
            headers: {
                'session_token':token
            }
        }

        fetch(`${config.API_ENDPOINT}/api/validate`, options)
            .then(response => {
                if(response.ok){

                    return response.json()
                }
                throw new Error(response.statusText)
            })
            .then( responseJson => {
                this.setState({
                    message: responseJson.message
                })
                
            })
            .catch( err => {
                alert('You must be logged in to continue')
                this.props.history.push('/')
            })

    }


    render(){

    let posts = this.context.posts 


    let maxDateStat = () => {

        let array = [];
        
        if(posts.length == 0){
            return 'N/A';
        }       
        else {

          posts.map( (posts , i) => {
              let formattedDate = moment(this.context.posts[i].modified).format('MM/DD/YYYY')
               array.push(formattedDate)
               return;
  
            })
            
            let max = new Date(Math.max(...array.map(date => new Date(date))))
            let formattedMax = moment(max).format('MM/DD/YYYY')
            return formattedMax;
    
      
            }
        } 

    let statsToDisplay =  maxDateStat() 

        return(
            <div className = 'stat-container'>
                {this.context.posts ? <div className = "stat one">
                <span className ='stat-title'>Last Moment</span> <span className ='stat-1'>{statsToDisplay}</span></div>: null }
                {this.context.posts ? <div className = "stat two"><span className ='stat-title'>Moments</span><span className ='stat-2'> {posts.length}</span></div>: null }
                <div className = "stat-button">
                    <Link to = '/add-entry'>+</Link>
                </div>
            </div>
             
        )
    }
}