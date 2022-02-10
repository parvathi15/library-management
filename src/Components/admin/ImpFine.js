import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class ImpFine extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          username:"",
          fine: 0,
          email:"",
          date: new Date(),
          status: "",
          bookid:"",
          title:"",
          author:"",
          password:""
        };
    
    
        // this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount() {
        axios
        .get("https://library-api123.herokuapp.com/requests/"+ this.props.match.params.id)
        .then(response => {
          console.log(response)
          this.setState({
            username: response.data.user,
            title:response.data.title,
            bookid:response.data.bookid,
            author:response.data.author
          });
    
        axios
          .get(`https://library-api123.herokuapp.com/members/user/${this.state.username}`)
          .then(response => {
            console.log(response)
            this.setState({
              username: response.data[0].username,
              status: response.data[0].status,
              email: response.data[0].email,
              fine: response.data[0].fine,
              password:response.data[0].password
            });
          })
        })
          .catch(function(error) {
            console.log(error);
          });
        }

        onChangeDate(date) {
            this.setState({
              date: date
            });
          }

          onChangeStatus(e) {
            this.setState({
              status: e.target.value
            });
          }
      onChangeUsername=e=> {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail = e => {
        this.setState({
          email: e.target.value
        });
      }
      onChangeFine=(e) =>{
        this.setState({
          fine: e.target.value
        });
      }

     
      onSubmit=(e)=> {
        e.preventDefault();
        const reminder = {
            username: this.state.username,
            status: this.state.status,
            email: this.state.email,
            date: this.state.date,
            fine:this.state.fine
        };
        console.log(reminder)
        
        axios
        .post(
          `https://library-api123.herokuapp.com/members/update/${this.state.memberid}`,
          reminder
        )
        .then(res => console.log(res.data));
        // window.location = "/admin";
      }
    render() {
        return (
                <div className = "container mt-3">
             <h3 style = {{color: "#3b2341"}}>Add Fine</h3>
            <form onSubmit={this.onSubmit} className='mt-4'>
            <div className="form-group">
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
          <label className="ip_label mt-3">Author: </label>
            <input
              type="text"
              required
              className="input"
              value={this.state.author}
            
            />
          </div>
          <div className="form-group">
          <label className="ip_label mt-3">Book: </label>
            <input
              type="text"
              required
              className="input"
              value={this.state.title}
            
            />
          </div>
              {/* <div className="form-group">
                <label>Email: </label>
                <input
                  type="text"
                  required
                  className="input"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div> */}
              <div className="form-group">
              <label className="ip_label mt-3">Fine: </label>
            <input
              type="text"
              required
              className="input"
              value={this.state.fine}
              onChange={this.onChangeFine}
            />
          </div>

       </div>
            <div className="form-group">
            <input
              type="submit"
              value="Add Fine"
              className="add-book mt-3"
            />
          </div>
        </form> 
      </div>
       
        )
    }
}
