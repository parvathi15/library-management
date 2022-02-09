import React, { Component } from 'react';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import { Route , withRouter} from 'react-router-dom';

import Moment from 'moment';
import { Link } from "react-router-dom";


class HomePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
      this.state = { 
        availablebooks: [],
        bookid:"",
        atoken: window.localStorage.getItem("MyUser"),
        user:"",
        fine:0,
        status:"Reading",
        returnstatus:"false",
        message:"",
        show:false,
        display:"none",
        issue_date: new Date(),
        due_date:new Date(),
        bookrecord:[],
        books_user:[],
        searchTerm: '',
        books_taken: "",
        };
        this.timerId = null;
      };


      vanishMessage() {
          this.timerId = setTimeout(() => {
          this.setState({
            message: "",
            display:"none"
          });
          this.timerId = null;
        }, 1000); 
      }

      search=e=> {
        this.setState({
            searchTerm: e.target.value
        });
      }


      componentDidMount=() => {
        var myCurrentDate=new Date();
        var myFutureDate=new Date(myCurrentDate);
         myFutureDate.setDate(myFutureDate.getDate()+ 30);
        const dueDate = Moment(myFutureDate).format('MM-DD-YYYY');
        console.log(dueDate)
        this.setState({ 
          due_date: dueDate
      });
 const username = this.props.location.state.user.username;
        this.setState({
          fine:this.props.location.state.user.fine
        })
        const token = JSON.parse(this.state.atoken);
        console.log(token.username);
        this.setState({ 
            user: token.username
        });
        axios
          .get("https://library-api123.herokuapp.com/books/listedbooks")
          .then(response => {
            this.setState({ availablebooks: response.data });
            console.log(this.state.availablebooks);
          })
          .catch(error => {
            console.log(error);
          });

          axios
          .get(`https://library-api123.herokuapp.com/requests/user/${username}/Reading`)
          .then(response => {
            this.setState({ books_taken: response.data.length
            });
            console.log(this.state.books_taken);
          })
          .catch(error => {
            console.log(error);
          });
 }
  close=()=>{
        console.log(this.state.show);
        if (!this.state.show) {
        this.setState({ display: "none" });
        }
      }


      handleOnClick= async (number,count) => {
        this.setState({ display: "block" });
        console.log(this.state.due_date);
        const todayDate = Moment(new Date()).format('MM-DD-YYYY');
        const username = this.props.location.state.user.username;
    const url = `https://library-api123.herokuapp.com/books/sachu/${number}`;
            const api_call = await fetch(url)
            const data = await api_call.json();
          
            const bookrecord = {
              bookid: data.bookid,
              title: data.title,
              subject:data.subject,
              author:data.author,
              date: data.createdAt,
              user:this.props.location.state.user.username,
              status: this.state.status,
              copies: count,
              returnstatus:this.state.returnstatus,
              issue_date:todayDate,
              due_date:this.state.due_date
            };
            console.log(bookrecord)
            if(this.state.books_taken < 1 && this.state.bookrecord.length < 1 && count > 0) {
              axios
              .post("https://library-api123.herokuapp.com/requests/add", bookrecord)
              .then(res => 
              this.setState({ message: res.data.message }),
              this.setState({ bookrecord: [...this.state.bookrecord, bookrecord] }),
              console.log(this.state.bookrecord.length)
              ).catch(err=>{
                this.setState({ message: err })
              })
             } else if (this.state.books_taken >0){
              this.setState({ message: "You have to return the book before requesting a new book" })
            } else if (count === 0){
              this.setState({ message: "We have no more copies of this book" })
            }else {
              this.setState({ message: "You can request one book at a time" })
            }
              this.vanishMessage()
          }
    render() {
      console.log(this.state.books_taken);
    return (
      <div>
       {this.state.message === "Your request is Successful" ?(
        <p className = "alert-success" style={{ display: this.state.display }}>{this.state.message}</p> 
       ):(
        <p className = "notifymsg" style={{ display: this.state.display }}>{this.state.message}</p>
       )}
      <div className = "container mt-5">
     {this.state.fine > 0 ? (
       <div class="alert alert-warning" role="alert" style={{ display: "block" }}>
         <a class="panel-close close"  onClick = {this.close} data-dismiss="alert">×</a> 
       A fine of {this.state.fine}rs has been issued for keeping book above due date.
     </div>
     ):(
      <p></p>
     )}
   <form method="POST" action="#" class="mt-5">
       <div class="row mt-5">
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
            

<table className="table table-responsive" style = {{marginTop:"56px",cursor: "pointer"}}>
<caption>List of users</caption>
          <thead className="thead-light">
            <tr >
              <th>Book No</th>
              <th>Name</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Copies</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>


   
<tbody className={this.state.fine > 0 ? 'disabled':'active'}>
{this.state.availablebooks.filter(user => {
 return user.title.toLowerCase().indexOf(this.state.searchTerm) > -1
 || user.author.toLowerCase().indexOf(this.state.searchTerm) > -1;
})
.map(book => {
  return (
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
{book.count < 0 ? (
<td>0</td>
):(
<td>{book.count}
</td>
)}
<td>{Moment(book.createdAt).format('DD MMM YYYY')}</td>
{/* <Link to={"/viewbook/" + book._id}>View</Link>  */}
<td style = {{color: "#3b2341",fontWeight:"600"}}
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to send request"
          )
          if (confirmBox === true) {
            this.handleOnClick(book._id,book.count)}
          }
        }
      >
       Request Book
       </td>
</tr>
  )
})}
</tbody>
</table>
 </div>
 </div>
        )
    }
}

export default withRouter(HomePage)

  