import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
          sideBar: false,
          user:{},
          atoken: window.localStorage.getItem("MyUser"),
          role:"",
          showMenu: false
        }
    
        this.handleSidebar = this.handleSidebar.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
      }
      
    
    
      componentDidMount = async () => {
    
        const token = JSON.parse(this.state.atoken);
        console.log(token.username);
        this.setState({
          role:token
        })
      }
    
      handleSidebar(){
        const userData = localStorage.getItem("MyUser");
        const user = JSON.parse(userData);
        this.setState({user:user});
        this.setState({
          sideBar : !this.state.sideBar
        });
      }
    
      showMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }
      
      closeMenu() {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
      }
    
      logout() {
        localStorage.setItem("MyUser", JSON.stringify(""))
        }  
    render() {
      console.log(this.state.role.username);
        return (
            <div> 
          <nav class="navbar navbar-expand-sm">
          {this.state.role.username !== undefined ? (
          <button
               onClick = {this.handleSidebar}
               className={`navToggle ${this.state.sideBar ? "open" : null}`}>
               <span />
               <span />
               <span />
             </button>
               ):(
                null
              )}
             <div  onClick={this.handleSidebar.bind(this)} className={`overlay ${this.state.sideBar ? "open" : ""}`}>
            </div>
            

            {this.state.role.username !== undefined ? (
            <ul className="navbar-nav mr-auto mainNav" style={this.state.sideBar ? { transform: "translateX(0)" } : null}>
             <li>
               <Link to={{ pathname: "/userbook", state: this.state.role }}>
                    Userbooks
                    </Link>
                </li>
                <li className = "mt-3 mb-2">
               <Link to={{ pathname: "/history", state: this.state.role }}>
                    BookRecords
                    </Link>
                </li>
                <li>
                <Link to={{ pathname: "/profile", state: this.state.role }} className="mainNavLink">
                    {this.state.user.username}
                    </Link>
                 
                </li>
               </ul>
                        ):(
                          null
                        )}

  <div class="navbar-collapse collapse dual-nav order-4 order-md-4 justify-content-end">
    <ul className="mr-5" >
    <li class="nav-item">
    <Link to="/" onClick={this.logout} className="mainNavLink" style = {{marginRight:"20px",textDecoration:"none",fontSize:"20px"}}>
       Logout
      </Link>
   </li>
    </ul>
  
  </div>
</nav>
</div>
        )
    }
}
