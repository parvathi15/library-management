import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Modal } from 'react-bootstrap';
import axios from "axios";
import Moment from 'moment';

export default class Viewbook extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.IssueDate = this.IssueDate.bind(this);
        this.DueDate = this.DueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const iniDueDate="";

        console.log(this.props);
        this.state = { 
            atoken: window.localStorage.getItem("MyUser"),
            user:"",
           bookreq:[],
           warningmsg:"",
              username: "",
          title:"",
          author: "",
          subject: "",
          status:"",
          copies:"",
          returnstatus:"",
          date: new Date(),
          Mindate:new Date(),
          issue_date:"",
          due_date:"",
            };
    }


    setModalOpen = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            showModal: !prevState.showModal 
        }));
        window.location = "/userbook";
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }

  
    
    onChangeStatus(e) {
        this.setState({
          status: e.target.value
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

    componentDidMount() {
        const token = JSON.parse(this.state.atoken);
        const reader = token.username
        console.log(reader)
          this.setState({
            user:token.username
          })
          axios
          .get("https://library-api123.herokuapp.com/requests/" + this.props.match.params.id)
          .then(response => {
              console.log(response.data)
              this.iniDueDate=new Date(response.data.due_date);
            this.setState({
              username: response.data.user,
              title:response.data.title,
              author: response.data.author,
              subject: response.data.subject,
              status:response.data.status,
              copies:response.data.copies,
              returnstatus:response.data.returnstatus,
              date: new Date(response.data.date),
              issue_date: new Date(response.data.issue_date),
              due_date: new Date(response.data.due_date)
            });
          })
          .catch(function(error) {
            console.log(error);
          });
          
        }


        onSubmit(e) {
          e.preventDefault();
          console.log(this.state.issue_date)
          const extendreq = {
           
            username: this.state.user,
            title:this.state.title,
            author:this.state.author,
            subject: this.state.subject,
            copies:this.state.copies,
            status: this.state.status,
            returnstatus:!this.state.returnstatus,
            date: new Date(this.state.date),
            issue_date: new Date(this.state.issue_date),
            due_date: new Date(this.state.due_date)
          };
            console.log(extendreq);

          axios
            .post(
              "https://library-api123.herokuapp.com/requests/update/" + this.props.match.params.id,
              extendreq
            )
            .then(res => 
             console.log(res)
            );
      
           window.location = "/userbook";
          // console.log(res)
          // this.setState({errorMessage:res.data.message})
        }

        hasChangedSinceInitialState = () => {
          // console.log("sample:"+this.iniDueDate+":"+this.state.due_date+(String(this.iniDueDate) === String(this.state.due_date)))    ;
          let result="";
          if(String(this.iniDueDate) === String(this.state.due_date)){
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
      {/* <p>{this.state.update_msg}</p> */}
        <form onSubmit={this.onSubmit}>

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
          <label className="ip_label mt-3">Issue Date: </label>
          <div>
            <DatePicker
            placeholderText="Please select a date"
            selected={this.state.issue_date}
            // dateFormat="yyyy/MMM/dd"
            //  onChange={this.IssueDate}
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
               minDate={this.state.due_date}
               maxDate={new Date(Moment(this.iniDueDate).add(30, 'days'))}
               className="input"
              placeholderText="Please select a date"
            />
          </div>
        </div>

        <div className="form-group mt-3">
            {/* <input
              type="submit"
              value="Submit"
              className="button-add mt-3"
              disabled={!(this.state.issue_date && this.state.due_date )}
            />   */}
            <input
              type="submit"
              value="Submit"
              className="button-add mt-3"
              disabled={this.hasChangedSinceInitialState()}
              // disabled=""
            />
                <button
                onClick={this.setModalOpen}
                className="btn btn-secondary">Cancel</button>
              
              {/* <button disabled={!(this.state.email && this.state.password )}>Submit</button> */}
            </div>
        </form>
        </Modal.Body>
        </Modal.Dialog>
      </div>
        )
    }
}
