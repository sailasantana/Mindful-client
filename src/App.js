import React, { Component } from 'react';
import Posts from './Entries/Entries';
import Form from './Form/Form';
import ReactCalendar from './Calendar/Calendar';
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import { Route } from 'react-router-dom'
import Edit from './Edit-Form/Edit'
import journalContext from './journal-context';
import Scream from './Scream/scream'
import Logout from './Login/Logout'


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
      <Route exact path = '/' component={Login}/>
      <Route path='/dashboard' component={Logout} />
      <Route path ='/dashboard' component={ReactCalendar}/>
      <Route
        path='/dashboard'
        render={(props) => (
         <Form
         {...props}
         handleSubmit={this.handleSubmit}/>      
         )}
      />  
      <Route
        path='/dashboard'
        render={(props) => (
         <Posts
         {...props}
         entryData={this.state.posts} removeEntry={this.removePost}/>      
         )}
      />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/edit/:id' component={Logout} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/scream' component={Logout} />
      <Route path='/scream' component={Scream} />
      </div>
      </journalContext.Provider >

    );
  }

}

export default App;


