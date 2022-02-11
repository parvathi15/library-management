import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import HomePage from "./Components/user/Homepage";
import EditBook from "./Components/admin/EditBook";
import Adminpage from "./Components/admin/Adminpage";
import AddBook from "./Components/admin/AddBook";
import Register from "./Components/admin/Register";
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
    <Route path="/homepage" component={HomePage} />
    {/* admin side */}
    <Route path="/admin" component={Adminpage} />
    <Route path="/addbook" component={AddBook} />
    <Route path="/list" component={BookList} />
    <Route path="/editbook/:id" component={EditBook} />

   

    </div>
    </Switch>
  </Router>
  </div>
    )
  }
}
