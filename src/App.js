import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import HomePage from "./Components/user/Homepage";
import Userbooks from "./Components/user/Userbooks";
import UserProfile from "./Components/user/UserProfile";
import BookHistory from "./Components/user/BookHistory";
import ViewBook from "./Components/user/ViewBook";
import AddBook from "./Components/admin/AddBook";
import EditBook from "./Components/admin/EditBook";
import Adminpage from "./Components/admin/Adminpage";
// import Bookrequests from "./Components/admin/Bookrequests";
// import RequestList from "./Components/admin/RequestList";
import Register from "./Components/admin/Register";
import BookList from "./Components/admin/BookList";
// import EditRequest from "./Components/admin/edit-request";
// import EditBookReq from "./Components/admin/EditBookReq";
// import ImpFine from "./Components/admin/ImpFine";
// import BookRecords from "./Components/admin/Returnbooks/BookRecords";
// import EditBookReturn from "./Components/admin/Returnbooks/EditBookReturn";
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
    <Route path="/profile" component={UserProfile} />
    <Route path="/history" component={BookHistory} /> 
    <Route path="/userbook" component={Userbooks} />
    <Route path="/viewbook/:id" component={ViewBook} />
    {/* admin side */}
    <Route path="/admin" component={Adminpage} />
    <Route path="/addbook" component={AddBook} />
    <Route path="/list" component={BookList} />
    <Route path="/editbook/:id" component={EditBook} />
    {/* <Route path="/userreqs" component={RequestList} />
    <Route path="/records" component={Bookrequests} />
    <Route path="/edituser/:id" component={EditRequest} />
    <Route path="/editbkre/:id" component={EditBookReq} />
     <Route path="/editreturn/:id" component={EditBookReturn} />
    <Route path="/fine/:id" component={ImpFine} />
    <Route path="/return" component={BookRecords} /> */}
   

    </div>
    </Switch>
  </Router>
  </div>
    )
  }
}

