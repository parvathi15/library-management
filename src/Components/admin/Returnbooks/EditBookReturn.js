import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Modal } from 'react-bootstrap';

export default class EditBookReturn extends Component {
    constructor(props) {
        super(props);
       console.log(this.props)
        // this.onChangeUsername = this.onChangeUsername.bind(this);
         this.ChangeReturnStatus = this.ChangeReturnStatus.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: "",
          title:"",
          author: "",
          subject: "",
          status:"",
          returnstatus:"",
          date: new Date()
        };
    }

    setModalOpen = (e) => {
      e.preventDefault();
      this.setState(prevState => ({
          showModal: !prevState.showModal 
      }));
      window.location = "/return";
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
              returnstatus:response.data.returnstatus,
              date: new Date(response.data.date)
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
        
        onChangeStatus(e) {
            this.setState({
              status: e.target.value
            });
          }

          ChangeReturnStatus(e) {
            this.setState({
              returnstatus: e.target.value
            });
          }

          onChangeDate(date) {
            this.setState({
              date: date
            });
          }
        
        //   onChangeEmail(e) {
        //     this.setState({
        //       email: e.target.value
        //     });
        //   }
        
        //   onChangeDate(date) {
        //     this.setState({
        //       date: date
        //     });
        //   }
        
          onSubmit(e) {
            e.preventDefault();
        
            const bookreq = {
              username: this.state.user,
              title:this.state.title,
              author:this.state.author,
              subject: this.state.subject,
              status: this.state.status,
              returnstatus:this.state.returnstatus,
              date: new Date(this.state.date)
            };
        
            console.log(bookreq);
        
            axios
              .post(
                "https://library-api123.herokuapp.com/requests/update/" + this.props.match.params.id,
                bookreq
              )
              .then(res => console.log(res.data));
        
            window.location = "/return";
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
              <label className="ip_label mt-3">Username: </label>
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
            <label className="ip_label mt-3">Status: </label>
            <select class="form-control" value={this.state.returnstatus} onChange={this.ChangeReturnStatus}>
            <option value="select">Select</option>
            <option value="Returned">Returned</option>
              <option value="NotReturned">Not Returned</option>
          </select>
          </div>
            {/* <div className="form-group">
              <label className="ip_label mt-3">Status: </label>
              <select class="form-control" value={this.state.returnstatus} onChange={this.ChangeReturnStatus}>
              <option value="select">Select</option>
              <option value="Returned">Returned</option>
              <option value="NotReturned">Not Returned</option>
            </select>
            </div> */}
             <div className="form-group">
            <label className="ip_label mt-3">Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                className="input"
              />
            </div>
          </div>
          <Modal.Footer>
            <div className="form-group mt-3">
            <input
              type="submit"
              value="Submit"
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
