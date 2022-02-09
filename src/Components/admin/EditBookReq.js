import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Modal } from 'react-bootstrap';

export default class EditBookReq extends Component {
    constructor(props) {
        super(props);
    
        // this.onChangeUsername = this.onChangeUsername.bind(this);
         this.onChangeStatus = this.onChangeStatus.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        this.IssueDate = this.IssueDate.bind(this);
        this.DueDate = this.DueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: "",
          title:"",
          author: "",
          subject: "",
          status:"",
          copies:"",
          returnstatus:"",
          date: new Date(),
          Mindate:new Date(),
          issue_date:false,
          due_date:false
        };
    }

    setModalOpen = (e) => {
      e.preventDefault();
      this.setState(prevState => ({
          showModal: !prevState.showModal 
      }));
      window.location = "/records";
    }

    componentDidMount() {
        axios
          .get("https://library-api123.herokuapp.com/requests/" + this.props.match.params.id)
          .then(response => {
              console.log(response.data)
            this.setState({
              username: response.data.user,
              title:response.data.title,
              author: response.data.author,
              subject: response.data.subject,
              status:response.data.status,
              copies:response.data.copies,
              returnstatus:response.data.returnstatus,
              date: new Date(response.data.date),
              issue_date: false,
              due_date: false
            });
          })
          .catch(function(error) {
            console.log(error);
          });
        }

        onChangeUsername(e) {
            this.setState({
              username: e.target.value
            });
          }

          ChangeReturnStatus(e) {
            this.setState({
              returnstatus: e.target.value
            });
          }
        
        onChangeStatus(e) {
            this.setState({
              status: e.target.value
            });
          }

          onChangeDate(date) {
            this.setState({
              date: date
            });
          }

          onChangeCopies(e) {
            this.setState({
              copies: e.target.value
            });
          }
        
         IssueDate(date) {
            this.setState({
              issue_date: date
            });
          }

          DueDate(date) {
            this.setState({
              due_date: date
            });
          }
        
          onSubmit(e) {
            e.preventDefault();
        
            const bookreq = {
              username: this.state.user,
              title:this.state.title,
              author:this.state.author,
              subject: this.state.subject,
              copies:this.state.copies,
              status: this.state.status,
              returnstatus:this.state.returnstatus,
              date: new Date(this.state.date),
              issue_date: new Date(this.state.issue_date),
              due_date: new Date(this.state.due_date)
            };
              console.log(bookreq);

  //            if(this.state.status === "select" && this.state.issue_date === "" || this.state.due_date === "") {
  // alert("Please enter all fields")
  //            } else {
            axios
              .post(
                "https://library-api123.herokuapp.com/requests/update/" + this.props.match.params.id,
                bookreq
              )
              .then(res => console.log(res.data)
              );
        
            window.location = "/records";
          }
        // }

     
        hasChangedSinceInitialState = () => {
          // console.log("sample:"+this.iniDueDate+":"+this.state.due_date+(String(this.iniDueDate) === String(this.state.due_date)))    ;
          let result="";
          if(this.state.issue_date == "" || this.state.due_date == "" || this.state.status === ""){
            result="disabled";
          }
          return (result);
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
            <label className="ip_label">Username: </label>
            <input
              type="text"
              required
              className="input"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          {/* <div className="form-group">
            <label className="ip_label mt-3">Status: </label>
            <select class="form-control" value={this.state.status} onChange={this.onChangeStatus}>
          <option value="pending">{this.state.status}</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          </div> */}
          <div className="form-group">
            <label className="ip_label mt-3">Name </label>
            <input
              type="text"
              className="input"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label className="ip_label mt-3">Author </label>
            <input
              type="text"
              className="input"
              value={this.state.author}
            />
          </div>
          <div className="form-group">
            <label className="ip_label mt-3">Subject </label>
            <input
              type="text"
              className="input"
              value={this.state.subject}
            />
          </div>
          <div className="form-group">
            <label className="ip_label mt-3">Copies </label>
            <input
              type="text"
              className="input"
              value={this.state.copies}
            />
          </div>
          <div className="form-group">
            <label className="ip_label mt-3">Status: </label>
            <select className="input" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="select">Select</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
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
        <div className="form-group">
          <label className="ip_label mt-3">Issue Date: </label>
          <div>
            <DatePicker
            placeholderText="Please select a date"
            selected={this.state.issue_date}
            // dateFormat="yyyy/MMM/dd"
             onChange={this.IssueDate}
            // minDate={this.state.Mindate}
             className="input"
              
            />
          </div>
        </div>
        <div className="form-group">
          <label className="ip_label mt-3">Due Date: </label>
          <div>
            <DatePicker
               selected={this.state.due_date}
               onChange={this.DueDate}
               minDate={this.state.issue_date}
               className="input"
              placeholderText="Please select a date"
            />
          </div>
        </div>

        <div className="form-group mt-3">
            <input
              type="submit"
              value="Submit"
              className="button-add mt-3"
              disabled={this.hasChangedSinceInitialState()}
            />  
                <button
                onClick={this.setModalOpen}
                className="btn btn-secondary">Cancel</button>
              
             
            </div>
        </form>
        </Modal.Body>
        </Modal.Dialog>
      </div>
      
        )
    }
}
