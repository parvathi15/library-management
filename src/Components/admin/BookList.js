import React, { Component } from 'react';
import axios from "axios";
import Moment from 'moment';
import EditBook from './EditBook';
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';


class BookList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
      this.state = { 
       books:[],
       showModal: false,
       searchTerm: '',
       show:false
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

    handleModal() {
      this.setState({show:!this.state.show})
    }

      componentDidMount() {
        axios
          .get("https://library-api123.herokuapp.com/books/sachu")
          .then(response => {
            this.setState({ books: response.data });
            console.log(this.state.books)
          })
          .catch(error => {
            console.log(error);
          });
      }

      deleteBook(id) {
        console.log(id);
        axios.delete("https://library-api123.herokuapp.com/books/" + id).then(response => {
          console.log(response.data);
        });
    
        this.setState({
            books: this.state.books.filter(el => el._id !== id)
        });
      }
    render() {
     const total = this.state.books.length
        return (
            <div>
             <div className = "container mt-5">
      
     <form method="POST" action="#" class="mt-5">
       <div class="row mt-5">
         <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
           <input
             className="search"
             name="search"
             type="text"
             placeholder="Find the Book by Title or Author"
             value={this.state.searchTerm}
             onChange={this.search}
            
           />
           <span>
             <i
               class="fa fa-search form-control-feedback"
               style={{
                 position: "relative",
                 top: "-36px",
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
            
<h5 style = {{color: "#3b2341"}}>Total no of Books:{total}</h5>
<table className="table" style = {{marginTop:"46px",cursor: "pointer"}}>
<caption>List of users</caption>
          <thead className="thead-light">
            <tr >
              <th>Book No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Copies</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>

{this.state.books.filter(user => {
          return user.title.toLowerCase().indexOf(this.state.searchTerm) > -1
          || user.author.toLowerCase().indexOf(this.state.searchTerm) > -1;
        })
.map(book => {
  return (
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
<td>{book.count}</td>
<td>{Moment(book.date).format('DD MMM YYYY')}</td>
<td>

      <Link to={"/editbook/" + book._id}><i className="fa fa-edit" onClick={()=>{this.handleModal()}}></i></Link> |{" "}
      {/* <Link><i className="fa fa-edit" onClick={()=>{this.handleModal()}}></i></Link> |{" "} */}
      <a
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to delete this Book"
          )
          if (confirmBox === true) {
            this.deleteBook(book._id);
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

    {this.state.showModal && 
          <EditBook 
            onCloseModal={this.showModal} 
          />
        }  
            </div>
        )
    }
}

export default withRouter(BookList)
