import React, { Component } from 'react';
import axios from "axios";
import Moment from 'moment';
import EditRequest from './edit-request';
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';

 class RequestList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  this.state = { 
   books:[],
   showModal: false,
   members:[],
   searchTerm: '',
    };
  };

  showModal = (e) => {
  this.setState(prevState => ({
      showModal: !prevState.showModal 
  }));
}

search=e=> {
  this.setState({
      searchTerm: e.target.value
  });
}

componentDidMount() {
  axios
    .get("https://library-api123.herokuapp.com/members/status/pending")
    .then(response => {
      this.setState({ members: response.data });
      console.log(this.state.members)
    })
    .catch(error => {
      console.log(error);
    });
}

deleteMember(id) {
    console.log(id);
    axios.delete("https://library-api123.herokuapp.com/members/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
        members: this.state.members.filter(el => el._id !== id)
    });
  }
  render() {
    return (
          <div>
           <div className = "container mt-5">
           {this.state.members.length === 0 ? (
      <h3 style = {{color: "#3b2341"}} className='mt-3'>No Member Requests</h3> 
      ):(
    <div>
   <form method="POST" action="#" class="mt-5">
     <div class="row mt-5">
       <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
         <input
           className="search"
           name="search"
           type="text"
           placeholder="Find the Member"
           value={this.state.searchTerm}
           onChange={this.search}
          
         />
         <span>
           <i
             class="fa fa-search form-control-feedback"
             style={{
               position: "relative",
               top: "-40px",
               right: "44px",
               float: "right",
               fontSize: "21px",
               fontWeight: "400",
               color: "#585555" 
               // transform: "translateY(-50%)"
             }}
           ></i> 
           </span>
           </div>
           </div>
           </form>
          
<table className="table" style = {{marginTop:"46px",cursor: "pointer"}}>
<caption>List of users</caption>
        <thead className="thead-light">
          <tr >
          <th>Username</th>
              <th>status</th>
              <th>Email</th>
              <th>Date</th>
              <th>Actions</th>
          </tr>
        </thead>
<tbody>

{this.state.members.filter(user => {
  return user.username.toLowerCase().indexOf(this.state.searchTerm) > -1
})
.map(currentmember => {
return (
<tr>
<td>{currentmember.username}</td>
<td>{currentmember.status}</td>
<td>{currentmember.email}</td>
<td>{currentmember.createdAt.substring(0, 10)}</td>
<td>

    <Link to={"/edituser/" + currentmember._id}><i className="fa fa-edit"></i></Link> |{" "}
  
    <a
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to delete this Return"
          )
          if (confirmBox === true) {
            this.deleteMember(currentmember._id);
          }
        }}
      >
       <i class="fa fa-trash"></i>
      </a>
  </td>
</tr>
)
})}
</tbody>
</table>
</div>
)}  
</div> 
  {this.state.showModal && 
        <EditRequest 
          onCloseModal={this.showModal} 
        />
      }  
 </div>
    );
  }
}

export default withRouter(RequestList)
