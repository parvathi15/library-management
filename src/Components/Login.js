import React, { Component } from 'react';
// import checkLogin from "../Components/LoginService";
import { Route , withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
// import books from "./img/books.png";
import books from "../img/books.png";


 class Login extends Component {
  constructor(props) {
    super(props)
     console.log(this.props.updateUser);
    this.state = {
        email: "",
        password: "",
        errorMessage: "",
        users:[],
        timePassed:false,
        localuser:{}
      };
      this.timerId = null;
  }

      changeUserName = e => {
        const email = e.target.value;
        this.setState({ email });
      };
    
      changePassword = e => {
        const password = e.target.value;
        this.setState({ password });
      };

      resetMessage() {
        this.timerId = setTimeout(() => {
          this.setState({
            errorMessage: ""
          });
          this.timerId = null;
        }, 2000);
      }

      componentDidMount() {
        this.setState({
          localuser:localStorage.setItem("MyUser", JSON.stringify(this.state.localuser))
        })
        console.log(this.state.localuser)
      }

      submitLogin = (e) => {
        e.preventDefault();
        const user = {
          email: this.state.email,
          password: this.state.password
          };
         
          axios
          .post("https://library-api123.herokuapp.com/members/login", user)
          .then(res => {
            console.log(res)
            this.setState({errorMessage:res.data.message})
          if (res.data.message === "Login Successfull") {
            localStorage.setItem("MyUser", JSON.stringify(res.data.user))
          this.props.history.push({
          pathname: '/homepage',
          state: {
             user: res.data.user
          } 
          });
          } 
          if(this.state.email === "librarian@gmail.com" && this.state.password === "admin"){
            this.props.history.push({
              pathname: '/admin' 
            });
          } else if(this.state.email === "librarian@gmail.com" && this.state.password !== "admin")  {
            this.setState({errorMessage:"Invalid Librarian"})
          } 
          
          else if(this.state.email === "" && this.state.password === "")  {
            this.setState({errorMessage:"Please enter the details"})
          } 
        
          
          else {
            console.log("invalid Data")
          }
          })
          }
        
      
    render() {
     console.log(this.state.localuser)
        return (
            <div class="login_wrapper">
            <div class="alert alert-primary mt-5" role="alert" style = {{height:"80px",fontSize:"17px",color: "#595771",background:"#e4dce7"}}>
            <span className="d-block"><b>Librarian:</b> librarian@gmail.com</span>
            <span><b>Password:</b> admin</span>
            </div>
            <form class="login_box" onSubmit={this.submitLogin}>
                <div class="login_brand">
                    <img src={books} alt="upGrad" style = {{height:"56px",width:"56px"}} />
                    </div>
                    <div class="login_header">Welcome to Library!</div>
                    <div class="login_content">
                        <div class="ip_container userType">
                            <label class="ip_label">Email</label>
                            <input placeholder="name@email.com" class="input" name="email" type="text" value={this.state.email} onChange={this.changeUserName} />
                            </div>
                            <div class="ip_container userType"><label class="ip_label">Password</label>
                            <input placeholder="Enter Your Password" class="input" name="password" type="password" value={this.state.password} onChange={this.changePassword} />
                            </div>
                            </div>
                            <div class="login_footer">
                            <input type="submit"  value="Login" className="submitBtn button_primary button mt-4 mb-3" />
                             </div>
                            <div class="register-path">
                            <p class="text-center">Not a member? 
                            <Link to="/Register">
                           <a className ="register">Register now</a> 
                           </Link>
                           </p>
                            </div>
                    
                            <p className = "errormsg">{this.state.errorMessage}</p>
                            
                            </form>
                            </div>
            
            
        )
    }
}

export default withRouter(Login);