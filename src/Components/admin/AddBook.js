import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class AddBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          bookid:"",
          title: "",
          author:"",
          subject: "",
          errors: {},
          date: new Date(),
          status: 'available',
          copies:0,
          message:"",
          display:"none"
        };
        this.timerId = null;
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangeStatus = this.onChangeStatus.bind(this);
        // this.onChangeDuration = this.onChangeDuration.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
      }

      vanishMessage() {
        this.timerId = setTimeout(() => {
        this.setState({
          message: "",
          display:"none"
        });
        this.timerId = null;
      }, 3000); 
    }
    
      onChangeBookId=e=> {
        this.setState({
          bookid: e.target.value
        });
      }
    
      onChangeName = e => {
        this.setState({
          title: e.target.value
        });
      }

      onChangeCopies = e => {
        this.setState({
          copies: e.target.value
        });
      }
      onChangeStatus(e) {
        this.setState({
          status: 'available'
        });
      }
      onChangeAuthor=(e)=> {
        this.setState({
          author: e.target.value
        });
      }
      onChangeSubject=(e)=> {
        this.setState({
          subject: e.target.value
        });
      }
      onChangeDate(date) {
        this.setState({
          date: date
        });
      }

      bookid

      handleValidation(){

        let errors = {};
        let formIsValid = true;
       
        if(!this.state.bookid){
           formIsValid = false;
           errors["bookid"] = "BookID field cannot be empty";
        } else if (!this.state.bookid.match(/^[0-9]+$/)){ 
              formIsValid = false;
              errors["bookid"] = "Please enter Numbers only";
       } else {
         formIsValid = false;
         // errors["password"] = " Please fill properly";
       }
 
       if(!this.state.title){
           formIsValid = false;
           errors["title"] = "Book Title field cannot be empty";
        } else if(!this.state.title.match(/^[a-zA-Z]+$/)){ 
              formIsValid = false;
              errors["title"] = "Book Title is not valid";
            }
        else {
         formIsValid = false;
         // errors["password"] = " Please fill properly";
       }

       if(!this.state.author){
        formIsValid = false;
        errors["author"] = "Author field cannot be empty";
     } else if(!this.state.author.match(/^[a-zA-Z]+$/)){ 
           formIsValid = false;
           errors["author"] = "Author name is not valid";
         }
     else {
      formIsValid = false;
      // errors["password"] = " Please fill properly";
    }

    if(!this.state.subject){
      formIsValid = false;
      errors["subject"] = "Subject field cannot be empty";
   } else if(!this.state.subject.match(/^[a-zA-Z]+$/)){ 
         formIsValid = false;
         errors["subject"] = "Subject name is not valid";
       }
   else {
    formIsValid = false;
    // errors["password"] = " Please fill properly";
  }
  this.setState({errors: errors});
  return formIsValid;
 
   }
 

      onSubmit=(e)=> {
        e.preventDefault();
        if(this.handleValidation()){
          console.log('validation successful')
        }else{
          console.log('validation failed')
        }
        const regid = /^[0-9]+$/;
        const alphaRegex = /^[a-zA-Z]+$/;
       
       console.log(this.state.bookid);
        const newbook = {
          bookid: this.state.bookid,
          title: this.state.title,
          subject:this.state.subject,
          author:this.state.author,
          copies: this.state.copies,
          status: this.state.status
        };
        if( this.state.bookid && this.state.title && this.state.subject 
          && this.state.author
          && (regid.test(this.state.bookid) === true) && (alphaRegex.test(this.state.title) === true) 
          && (alphaRegex.test(this.state.author) === true)){
       axios
          .post("https://library-api123.herokuapp.com/books/add", newbook)
          .then(res => 
            this.setState({ 
              message: res.data.message,
              bookid: '', 
              title: '',
              subject: '',
              copies:'',
              author:''
            }))
           .catch(err=>{
             this.setState({ message: err })
           })
           this.vanishMessage()
    }
  }

    render() {
        return (
          <div>
          {this.state.message === "Book Added Successfully" ?(
           <p className = "alert-success">{this.state.message}</p> 
          ):(
            <p className = "notifymsg" style={{ display: this.state.display }}>{this.state.message}</p>
          )}
            <div className = "container mt-5">
            <h3 style = {{color: "#3b2341"}}>Create New Book</h3>
            
            <form onSubmit={this.onSubmit}>
            <div className="form-group mt-4">
            <label className="ip_label">BookId: </label>
            <input placeholder="Enter Bookid" className="input" name="bookid" type="text" value={this.state.bookid}  onChange={this.onChangeBookId}/>
            <span style={{color: "#db2525"}}>{this.state.errors["bookid"]}</span>
          </div>
              <div className="form-group">
                <label className="ip_label mt-3">Title: </label>
                <input placeholder="Enter Title" className="input" name="title" type="text" value={this.state.title}  onChange={this.onChangeName}/>
                <span style={{color: "#db2525"}}>{this.state.errors["title"]}</span>
              </div>
              <div className="form-group">
            <label className="ip_label mt-3">Author: </label>
            <input placeholder="Enter Author" className="input" name="author" type="text" value={this.state.author}  onChange={this.onChangeAuthor}/>
             <span style={{color: "#db2525"}}>{this.state.errors["author"]}</span>
          </div>
              <div className="form-group">
            <label className="ip_label mt-3">Subject: </label>
            <input placeholder="Enter Author" className="input" name="subject" type="text" value={this.state.subject}  onChange={this.onChangeSubject}/>
         
             <span style={{color: "#db2525"}}>{this.state.errors["subject"]}</span>
          </div>
      <div className="form-group mt-3">
            <input
              type="submit"
              value="Add Book"
              className="add-book mt-3"
            />
          </div>
        </form> 
      </div>
      </div>
        )
    }
}
