import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
// import booklist from "./imgs/booklist.png";
import member from "./imgs/member.png";
// import drinka from "./imgs/drinka.png";
import requestbook from "./imgs/requestbook.png";
import users from "./imgs/users.png";
import addbook from "./imgs/addbook.png";


export default class Adminpage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  this.state = { 
   users:[]
    };
  };

  componentDidMount() {
    axios
      .get("https://library-api123.herokuapp.com/members/")
      .then(response => {
        this.setState({ users: response.data });
        console.log(this.state.users)
      })
      .catch(error => {
        console.log(error);
      });
  }
    render() {
      const total = this.state.users.length

        return (
    
          <div className="container mt-5">
               <div class="row">
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={users} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <a href= "#" className = "ml-5" style = {{ marginRight: "25px"}}>{total} Users</a>
            </p>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
            <Link to= {{
              pathname:'/userreqs',
            }}>
            <div className='img-corner'>
            <img src={member} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            Member Requests
            </p>
           </Link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/records',
            }}>
            <div className='img-corner'>
            <img src={requestbook} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>Book Requests</p>
            </Link>
            </div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4">
            <div class="quiz-topic">
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/addbook',
            }}>
            <div className='img-corner'>
            <img src={addbook} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>Add Book</p>
            </Link>
            </div>
            </div>
            {/* <div class="col-md-4">
            <div class="quiz-topic">
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/return',
            }}>
            <div className='img-corner'>
            <img src={drinka} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>Return Books</p>
            </Link>
            </div>
            </div> */}
            <div class="col-md-4">
            <div class="quiz-topic">
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/list',
            }}>
            <div className='img-corner'>
            <img src={booklist} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p> List of Books</p>
            </Link>
            </div>
            </div>
            </div>
         </div>
        )
    }
}
