import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Modal } from 'react-bootstrap';

export default class EditBook extends Component {
    constructor(props) {
        super(props);
         this.state = {
         bookid: "",
          title: "",
          author:"",
          subject: "",
          copies:"",
          errors: {},
          date: new Date(),
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBookId = this.onChangeBookId.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeCopies = this.onChangeCopies.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
      }

      setModalOpen = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            showModal: !prevState.showModal 
        }));
        window.location = "/list";
      }

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
 
       if(this.state.bookid.indexOf(' ') >= 0){
         formIsValid = false;
         errors["bookid"] = "Please avoid spaces";
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

      componentDidMount() {
        console.log(this.props.match.params.id)
        axios
          .get("https://library-api123.herokuapp.com/books/" + this.props.match.params.id)
          .then(response => {
            this.setState({
                bookid: response.data.bookid,
                title: response.data.title,
                author: response.data.author,
                subject: response.data.subject,
                copies: response.data.copies,
            });
          })
          .catch(function(error) {
            console.log(error);
          });
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


          onSubmit(e) {
            e.preventDefault();
            if(this.handleValidation()){
              console.log('validation successful')
            }else{
              console.log('validation failed')
            }

            const regid = /^[0-9]+$/;
        const alphaRegex = /^[a-zA-Z]+$/;
            const editbook = {
              bookid: this.state.bookid,
              title: this.state.title,
              author: this.state.author,
              subject: this.state.subject,
              copies: this.state.copies,
              date: this.state.date,
            
            };
        
            console.log(editbook);
            if( this.state.bookid && this.state.title && this.state.subject 
              && this.state.author
              && (regid.test(this.state.bookid) === true) && (alphaRegex.test(this.state.title) === true) 
              && (alphaRegex.test(this.state.author) === true)){
            axios
              .post(
                "https://library-api123.herokuapp.com/books/update/" + this.props.match.params.id,
                editbook
              )
              .then(res => console.log(res.data));
        
            window.location = "/list";
          }
        }
        
    render() {
        return (
          <div className="modalBackground">
           
  <Modal.Dialog>
  <Modal.Header closeButton onClick={this.setModalOpen}>
  </Modal.Header>
  <Modal.Body>
            
            <form onSubmit={this.onSubmit}>
           
            <div className="form-group">
            <label className="ip_label">BookId: </label>
            <input
              type="text"
             
              className="input"
              value={this.state.bookid}
             onChange={this.onChangeBookId}
             
            />
              <span style={{color: "#db2525"}}>{this.state.errors["bookid"]}</span>
          </div>
              <div className="form-group">
                <label className="ip_label mt-3">Title: </label>
                <input
                  type="text"
                
                  className="input"
                  value={this.state.title}
                  onChange={this.onChangeName}
                />
                <span style={{color: "#db2525"}}>{this.state.errors["title"]}</span>
              </div>
              <div className="form-group">
            <label className="ip_label mt-3">Author: </label>
            <input
              type="text"
             
              className="input"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
            <span style={{color: "#db2525"}}>{this.state.errors["author"]}</span>
          </div>
              <div className="form-group">
            <label className="ip_label mt-3">Subject: </label>
            <input
              type="text"
              
              className="input"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />
             <span style={{color: "#db2525"}}>{this.state.errors["subject"]}</span>
          </div>


          {/* <div className="form-group">
            <label className="ip_label mt-3">Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                className="input"
              />
            </div>
          </div> */}

        <Modal.Footer>
        <div className="form-group mt-3">
            <input
              type="submit"
              value="Edit Book"
              className="button-add mt-3"
            />  
                <button
                onClick={this.setModalOpen}
                className="btn btn-secondary">Cancel</button>
              
             
            </div>
            </Modal.Footer>
        </form> 
        </Modal.Body>
        </Modal.Dialog>
      </div>
    
        )
    }
}


 