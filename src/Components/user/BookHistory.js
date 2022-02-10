import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';
import dateFormat from 'dateformat';
var moment = require('moment');

 class BookHistory extends Component {

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
      }, 2000); 
    }

      deleteBook(id) {
        console.log(id);
        axios.delete("https://library-api123.herokuapp.com/requests/" + id).then(response => {
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
        status:"returned",
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
          "https://library-api123.herokuapp.com/requests/update/" + book._id,
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
          .get(`https://library-api123.herokuapp.com/requests/user/${reader}`)
          .then(response => {
            console.log(response)
            this.setState({ bookreq: response.data });
          })
          .catch(error => {
            console.log(error);
          });
          this.vanishMessage()
      }
  render() {
    return  <div className= "container">
    
      {this.state.bookreq.length === 0 ? (
      <h3 style = {{color: "#3b2341"}} className='mt-3'>No Requests</h3> 
      ):(
       
  <div>
 <h3 style = {{color: "#3b2341"}} className='mt-3'>Book Records</h3>   
 <form method="POST" action="#" class="mt-3">
       <div class="row">
         <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
         <input
             className="search"
             name="search"
             type="text"
             placeholder="Find the Book by Title or Author"
             value={this.state.searchTerm}
             onChange={this.search}
            
           />
           <span>
             <i
               class="fa fa-search form-control-feedback"
               style={{
                 position: "relative",
                 top: "-44px",
                 right: "44px",
                 float: "right",
                 fontSize: "21px",
                 fontWeight: "400",
                 color: "#585555" 
                 // transform: "translateY(-50%)"
               }}
             ></i> 
             </span>
             </div>
             </div>
             </form>     
<table className="table" style = {{marginTop:"25px",cursor: "pointer"}}>
  <h1>{this.state.user.username}</h1>
<caption>List of users</caption>
          <thead className="thead-light">
            <tr >
              <th>Book No</th>
              <th>Name</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
<tbody>
  
{this.state.bookreq.map(book => {
return (  
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
<td>{dateFormat((book.issue_date), "mmmm dS, yyyy")}</td>
<td>{dateFormat((book.due_date), "mmmm dS, yyyy")}</td>
<td>{book.status}</td>
</tr>
  )
  
})}
</tbody>
</table> 
</div>
)}
    </div>;
  }
}

export default withRouter(BookHistory);
