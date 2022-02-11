import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';
var moment = require('moment');

 class Userbooks extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
      this.state = { 
        atoken: window.localStorage.getItem("MyUser"),
        user:"",
       bookreq:[],
       warningmsg:"",
       extend_count:0,
       condition:"",
       username: "",
       title:"",
       author: "",
       subject: "",
       status:"",
       copies:"",
       returnstatus:"",
       bookstatus:false,
       date: new Date(),
       issue_date:false,
       due_date:false
        };
        this.timerId = null;
      };



      vanishMessage() {
        this.timerId = setTimeout(() => {
        this.setState({
          condition: "",
          display:"none"
        });
        this.timerId = null;
      }, 1000); 
    }

      deleteBook(id) {
        console.log(id);
        axios.delete("http://localhost:3500/requests/" + id).then(response => {
          console.log(response.data);
        });
    
        this.setState({
          bookreq: this.state.bookreq.filter(el => el._id !== id)
        });
      }


      
      hasChangedSinceInitialState = (due_date,status) => {
        console.log(status)
        let a="";
        let result="";
        if(status === true){
          result="disabled";
          console.log(result)
        }
        return(result);
      }

 
      // request.date = Date.parse(req.body.date);
      // request.issue_date = Date.parse(req.body.issue_date);
      // request.due_date = Date.parse(req.body.due_date);
    
    changestatus(book){
      console.log(book._id)
      const returnbook = {
        username:book.user,
        title:book.title,
        status:"Returned",
        returnstatus:book.returnstatus,
        subject:book.subject,
        author:book.author,
        copies:book.copies,
        date:book.date,
        issue_date:book.issue_date,
        due_date:book.due_date
       };
        console.log(returnbook);
        axios
        .post(
          "http://localhost:3500/requests/update/" + book._id,
          returnbook
        )
        .then(res => console.log(res.data)
        );
      }

    componentDidMount() {
      const token = JSON.parse(this.state.atoken);
      const reader = token.username
      console.log(reader)
        this.setState({
          user:token.username
        })
        axios
          .get(`http://localhost:3500/requests/user/${reader}/Reading`)
          .then(response => {
            console.log(response)
            this.setState({ bookreq: response.data });
            this.setState({ bookreq: response.data });
            for (var i = 0; i < this.state.bookreq.length; i++) {
            if(this.state.bookreq[i].returnstatus === true) {
              this.setState({ condition: "Due date is extended" });
            }
           }
          })
          .catch(error => {
            console.log(error);
          });
          this.vanishMessage()
      }
    render() {
      var moment = require('moment');
      console.log(this.state.condition)
        return (
    <div className= "container">
      {this.state.condition === "Due date is extended" ?(
        <p className = "alert-success">Your book's Due Date has been extended.</p> 
       ):(
       null
       )}
      {this.state.bookreq.length === 0 ? (
      <h3 style = {{color: "#3b2341"}} className='mt-3'>No Requests</h3> 
      ):(
       
  <div>
 <h3 style = {{color: "#3b2341"}} className='mt-3'>Your Book Requests</h3>        
<table className="table" style = {{marginTop:"25px",cursor: "pointer"}}>
  <h1>{this.state.user.username}</h1>
<caption>List of users</caption>
          <thead className="thead-light">
            <tr >
              <th>Book No</th>
              <th>Name</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Copies</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>
  
{this.state.bookreq.map(book => {
  const lastdate = Moment(book.issue_date).format('MM-DD-YYYY')
  const todayDate = Moment(new Date()).format('MM-DD-YYYY');
  var issue_date = moment(lastdate, "MM-DD-YYYY");
  issue_date.add(30, 'days');
  console.log(issue_date);
  var dueDate = Moment(issue_date).format('MM-DD-YYYY')
  console.log(dueDate);
this.hasChangedSinceInitialState(book.due_date,book.returnstatus)

return (  
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
<td>{book.copies}</td>
<td>{Moment(book.issue_date).format('MM-DD-YYYY')}</td>
<td>{Moment(book.due_date).format('MM-DD-YYYY')}</td>
{todayDate === dueDate && book.returnstatus === false ?  (
<td><button className='btn btn-success'  disabled={this.hasChangedSinceInitialState()}>
<Link to={"/viewbook/" + book._id}>Extend</Link> 

</button> |
<button type="button" className ="btn btn-warning" style = {{marginLeft:"15px !important"}} onClick={() => {
 
          const confirmBox = window.confirm(
            "Do you want to return book"
          )
          if (confirmBox === true) {
            this.changestatus(book)}
          }
        }>Return book</button>
</td>
/* <td><button type="button" class="btn btn-warning">Return Book</button></td> */
):(
 
  <td><button className='btn btn-danger' onClick={() => {
    this.deleteBook(book._id);
  }}>Cancel</button> 
  {/* <button className='btn btn-success'>Reading</button> */}
  </td> 
)}

</tr>
  )
  
})}
</tbody>
</table> 
</div>
)}
</div>
        )
    }
}

export default withRouter(Userbooks)


  {/* <button className='btn btn-danger' onClick={() => {
          this.deleteBook(book._id);
        }}>Cancel</button> */}

//         <button className='btn btn-success' >
// <Link to={"/viewbook/" + book._id}>Extend</Link> 

// </button>