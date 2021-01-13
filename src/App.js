import React, { Component } from 'react';
import Posts from './Entries/Entries';
import Form from './Form/Form';
import ReactCalendar from './Calendar/Calendar';
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import { Route } from 'react-router-dom'
import Edit from './Edit-Form/Edit'
//import TokenService from './Auth-Service/token-services';
import journalContext from './journal-context';
//import config from './config'


class App extends Component {
  state = {
    posts: [],
    user_name:'',
    currentDateSelection : ''
 
  }


  updateCurrentDate = date => {
    this.setState({currentDateSelection: date})
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
       posts: posts.filter ((post, i) => {
         return i !== index
       })
     })
   }
 
   handleSubmit = post => {
     this.setState({ posts: [...this.state.posts, post]})
   }
 
   handleUpdate = updatedPost => {
     const updatedPosts = this.state.posts.map(post => {
       return post.id === updatedPost.id ? updatedPost : post
     })
 
     this.setState({
       posts : updatedPosts
     })
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
      currentDateSelection : this.state.currentDateSelection
    




    }
    
    return (
      <journalContext.Provider value={postValues}>

      <div className="App">
        <h1>Mind Your Moment</h1>
        <Route exact path = '/' component={Login}/>
        <Route path ='/dashboard' component={ReactCalendar}/>
        <Route
        path='/dashboard'
        render={(props) => (
         <Form
         handleSubmit={this.handleSubmit}/>      
         )}/>
        
        <Route
        path='/dashboard'
        render={(props) => (
         <Posts
         entryData={this.state.posts} removeEntry={this.removePost}/>      
         )
       }
      />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/edit/:id' component={Edit} />
      </div>
      </journalContext.Provider >

    );
  }

}

export default App;


