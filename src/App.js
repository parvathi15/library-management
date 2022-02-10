import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import HomePage from "./Components/user/Homepage";
import Userbooks from "./Components/user/Userbooks";
import UserProfile from "./Components/user/UserProfile";
import BookHistory from "./Components/user/BookHistory";
import AddBook from "./Components/admin/AddBook";
import EditBook from "./Components/admin/EditBook";
import Adminpage from "./Components/admin/Adminpage";
import Bookrequests from "./Components/admin/Bookrequests";
import RequestList from "./Components/admin/RequestList";
import Register from "./Components/admin/Register";
import EditRequest from "./Components/admin/edit-request";
import EditBookReq from "./Components/admin/EditBookReq";
import BookList from "./Components/admin/BookList";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Viewbook from './Components/user/Viewbook';

export default class App extends Component {
  constructor(props) {
    super(props);

}
  render() {
    return (
      <div className='App'>
      <Router>

<Switch>
  <Route exact path="/" component={Login} />
  <Route exact path="/Register" component={Register} />
  <div>
    <Navbar />
    <Route path="/admin" component={Adminpage} />
    <Route path="/userreqs" component={RequestList} />
    <Route path="/records" component={Bookrequests} />
    <Route path="/edituser/:id" component={EditRequest} />
    <Route path="/editbkre/:id" component={EditBookReq} />
    <Route path="/homepage" component={HomePage} />
    <Route path="/profile" component={UserProfile} />
    <Route path="/addbook" component={AddBook} />
    <Route path="/editbook/:id" component={EditBook} />
    <Route path="/list" component={BookList} />
    <Route path="/history" component={BookHistory} /> 
    <Route path="/userbook" component={Userbooks} />
    </div>
    </Switch>
  </Router>
  </div>
    )
  }
}

