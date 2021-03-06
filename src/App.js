import React, { Component } from 'react';
import Posts from './Entries/Entries';
import Form from './Form/Form';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import { Route } from 'react-router-dom';
import Edit from './Edit-Form/Edit';
import journalContext from './journal-context';
import Scream from './Scream/scream';
import config from './config';
import TokenService from './Auth-Service/token-services';
import './App.css';
import { withRouter } from 'react-router-dom';



class App extends Component {
  state = {
    posts: [],
    user_name:'',
    currentDateSelection : '',
    calendarClicked : false
 
  }

  componentDidMount(){
    
    let user_name = localStorage.getItem('user_name')
    
    this.setState({user_name:user_name})

    fetch(`${config.API_ENDPOINT}/api/${user_name}`, {
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
      this.updatePostsInState(posts)
    })
    .catch(error => {
      this.props.history.push('/')
    })
  }


  updateCurrentDate = date => {
    this.setState({currentDateSelection: date})
  }


  setPostsforStats = () => {

    let user_name = localStorage.getItem('user_name')
    
    fetch(`${config.API_ENDPOINT}/api/${user_name}`, {
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
      this.setState({posts : posts})
    })
    .catch(error => {
      this.props.history.push('/')
    })

  }


  updatePostsInState = posts => {
    this.setState({posts : posts})
  }
 
   setUserName = user_name => {
     this.setState({user_name: user_name})
   }
 
   removePost = index => {
     const { posts } = this.state
 
     this.setState({
       posts: posts.filter ((post) => {
         return post.id !== index
       })
     })
   }
 
   handleSubmit = post => {
     this.setState({ posts: [...this.state.posts, post]})
   }
 
   handleUpdate = updatedPost => {
     const updatedPosts = this.state.posts.map(post => {
       return post.id === Number(updatedPost.id) ? updatedPost : post
     })
 
     this.setState({
       posts : updatedPosts
     })
   }

   setClicked = () => {
     this.setState({calendarClicked : true})
   }
 

  render () {

    const postValues = {
      posts: this.state.posts,
      addPost : this.handleSubmit,
      deletePost: this.removePost,
      updatePost: this.handleUpdate,
      setUserName: this.setUserName,
      updatePostsInState: this.updatePostsInState,
      user_name: this.state.user_name,
      updateCurrentDate : this.updateCurrentDate,
      currentDateSelection : this.state.currentDateSelection,
      setClicked : this.setClicked,
      clicked : this.state.calendarClicked,
      setPostsforStats : this.setPostsforStats
    




    }
    
    return (
      <journalContext.Provider value={postValues}>

      <div className="App">   
            <Route exact path = '/' component={Login}/>   
            <Route
              path='/dashboard'
              render={(props) => (
               <Posts
               {...props}
               entryData={this.state.posts} removeEntry={this.removePost}/>      
               )}
            /> 
        
           <Route
            path='/add-entry'
            render={(props) => (
            <Form
            {...props}
            handleSubmit={this.handleSubmit}/>      
            )}
          />     
          <Route path='/sign-up' component={SignUp} />     
          <Route path='/edit/:id' component={Edit} />   
          <Route path='/scream' component={Scream} />  
        </div>
      </journalContext.Provider >

    );
  }

}

export default withRouter(App);


