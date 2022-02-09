import React, { Component } from 'react';
import axios from "axios";

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
         console.log(this.props.location.state);
         this.state = {
          user: "",
          name:"",
          email:"",
          password:"",
          reEnterPassword:"",
          fine:0,
          errors: {},
          updatemsg:"",
          statusmsg:"",
          display:"none"
      }
      this.timerId = null;
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      }

      vanishMessage() {
        this.timerId = setTimeout(() => {
        this.setState({
          updatemsg: "",
          display:"none"
        });
        this.timerId = null;
      }, 1000); 
    }

      onChangeUsername=e=> {
        this.setState({
          user: e.target.value
        });
      }
    
      onChangeEmail = e => {
        this.setState({
          email: e.target.value
        });
      }

      onChangePassword = e => {
        this.setState({
          password: e.target.value
        });
      }

      onChangeConfirmPassword = e => {
        this.setState({
          reEnterPassword: e.target.value
        });
      }

      handleValidation(){

        let errors = {};
        let formIsValid = true;
        if(this.state.password.length !== 0) {
        if(this.state.password.length < 8 || this.state.password.length > 15) {
         formIsValid = false;
         errors["password"] = " Please fill at least 8 character";
       } else if(this.state.password === this.state.reEnterPassword) {
        formIsValid = false;
        errors["reEnterPassword"] = "Passwords are not equal.";
      } else if(!this.state.password.match(/[0-9]/g)) {
         formIsValid = false;
         errors["password"] = "Please enter at least one digit.";
       } else if(this.state.password !== this.state.reEnterPassword) {
        formIsValid = false;
        errors["reEnterPassword"] = "Passwords are not equal.";
      }else {
         formIsValid = false;
       }
       this.setState({errors: errors});
       return formIsValid;
   }
  }

      
      componentDidMount=() => {
        const username = this.props.location.state.username;
        const email = this.props.location.state.email;
        const fine = this.props.location.state.fine;
        // const password = this.props.location.state.password;
        this.setState({
          user: username,
          email:email,
          fine:fine,
          // password:password
        })
      }

      // passwordValidation() {

      //     if(this.state.password === this.state.reEnterPassword || this.state.reEnterPassword === ""){
      //       this.setState({
      //         validation_msg: "Password is not valid"
      //       });
      //       return true;
      //   }
      //   return false;
      // }

      onSubmit(e) {
        e.preventDefault();
        this.setState({ display: "block" });
        if(this.handleValidation()){
          console.log('validation successful')
        }else{
          console.log('validation failed')
        }
        const editMember = {
          username: this.props.location.state.username,
          status:this.props.location.state.status,
          email: this.props.location.state.email,
          date:this.props.location.state.createdAt,
          fine:this.props.location.state.fine,
          password: this.state.password
      };
      console.log(this.state.password);
      console.log(this.state.reEnterPassword);
        
        if(this.state.password === this.state.reEnterPassword){
        axios
          .post(
            "https://library-api123.herokuapp.com/members/update/" + this.props.location.state._id,
            editMember
          )
          .then(res => 
            // console.log(res)
          this.setState({ statusmsg: res.data }),
          this.setState({ updatemsg: "Password changed successfully." })
          )}  else {
            console.log(this.state.updatemsg)
          }
          this.vanishMessage()
      }
  render() {
    console.log(this.state.updatemsg)
    console.log(this.state.user)
    return <div className='container'>
        {this.state.statusmsg === "Member updated!" ?(
        <p className = "alert-success" style={{ display: this.state.display }}>{this.state.updatemsg}</p> 
       ):(
         null
        // <p className = "notifymsg"style={{ display: this.state.display }}></p>
       )}
       
       <div className ="col-md-8 personal-info mt-4">
       <div class="avathar">
         <div class="profileimage"><span class="number">{this.state.user.substring(0, 1).toUpperCase()}</span>
         </div>

         {/* {props.book.date.substring(0, 10)} */}
        
         <h3 className = "ml-5" style={{color:"#513159",marginLeft:"20px"}}>Account Settings</h3>
       
    
        <form className="form-horizontal ml-5 mt-4" onSubmit={this.onSubmit}>
        <div class="ip_container userType">
        <label class="ip_label">Username</label>
        <input placeholder="Name" class="input" name="name" type="text" value={this.state.user} style = {{color:"#6b3a77",fontWeight:"500"}}/>
          </div>
          <div class="ip_container userType">
                            <label class="ip_label">Email</label>
                            <input placeholder="name@email.com" class="input" name="email" type="text" value={this.state.email} style = {{color:"#6b3a77",fontWeight:"500"}} />
                           <p className = "mt-3" style={{color:"#452f4b",fontSize:"16px",fontWeight:600}}>Change Password</p>
                           {/* </hr> */}
                            </div>
                            
                            <div class="ip_container userType">
                            <label class="ip_label">Password</label>
                            <input placeholder="Password" class="input" name="password" type="password" value={this.state.password} onChange={this.onChangePassword} />
                            {this.state.password !== "" ?(
                            <span style={{color: "#db2525"}}>{this.state.errors["password"]}</span>
                            ):(
                              null
                            )}
                            </div>
                           
   
                            <div class="ip_container userType">
                            <label class="ip_label">Re-enter Password</label>
                            <input placeholder="Re-enter Password" class="input" name="password" type="password" value={this.state.reEnterPassword} onChange={this.onChangeConfirmPassword} />
                            {this.state.reEnterPassword !== this.state.password ?(
                            <span style={{color: "#db2525"}}>{this.state.errors["reEnterPassword"]}</span>
                            ):(
                              null
                            )}
                            </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-10">
            <input type="submit" class="add-book" value="Save Changes" />
            </div>
          </div>

        </form>
      </div>
      </div>
  </div>
;
  }
}
