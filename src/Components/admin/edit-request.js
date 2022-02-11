import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Modal } from 'react-bootstrap';

export default class EditRequest extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      status: "",
      email: "",
      date: new Date(),
      users: [],
      fine:0
    };
  }

  setModalOpen = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
        showModal: !prevState.showModal 
    }));
    window.location = "/userreqs";
  }

  componentDidMount() {
    axios
      .get("https://library-api123.herokuapp.com/members/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          status: response.data.status,
          email: response.data.email,
        
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios
    //   .get("http://localhost:8000/users/")
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username)
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const member = {
      username: this.state.username,
      status: this.state.status,
      email: this.state.email,
      date: this.state.date,
      fine:this.state.fine
    };

    console.log(member);

    axios
      .post(
        "https://library-api123.herokuapp.com/members/update/" + this.props.match.params.id,
        member
      )
      .then(res => console.log(res.data));

    window.location = "/userreqs";
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
          <div className="form-group">
          <label className="ip_label mt-3">Status: </label>
            <select  className="input" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="select">Select</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="pending">pending</option>
          </select>
          </div>
          <div className="form-group">
          <label className="ip_label mt-3">Email </label>
            <input
              type="text"
              className="input"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
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
    );
  }
}
