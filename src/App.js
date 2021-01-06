import React, { Component } from 'react';
import Entries from './Entries/Entries';
import Form from './Form/Form';
import ReactCalendar from './Calendar/Calendar';
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import { Route } from 'react-router-dom'
import Edit from './Edit-Form/Edit'
import MindfulQuote from './MindfulMoment/mindful';

class App extends Component {
  state = {
    entries: [

    ]
  }

  removeEntry = index => {
    const { entries } = this.state

    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })
  }

  handleSubmit = entry => {
    this.setState({ entries: [...this.state.entries, entry]})
  }

  render () {
    const { entries } = this.state;
    
    return (
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
         <Entries
         entryData={entries} removeEntry={this.removeEntry}/>      
         )
       }
      />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/edit' component={Edit} />
      </div>
    );
  }

}

export default App;


