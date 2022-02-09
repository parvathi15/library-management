import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Adminpage from "./Components/admin/Adminpage";
import Bookrequests from "./Components/admin/Bookrequests";
import RequestList from "./Components/admin/RequestList";
// import HomePage from "./Components/user/Homepage";
// import Userbooks from "./Components/user/Userbooks";
import Register from "./Components/admin/Register";
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
    {/* <Route path="/homepage" component={HomePage} />
    <Route exact path="/userbook" component={Userbooks} /> */}
    </div>
    </Switch>
  </Router>
  </div>
    )
  }
}

