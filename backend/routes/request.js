const router = require("express").Router();
let Request = require("../models/request.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
    Request.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});



router.route("/add").post((req, res) => {
  const bookid =  Number(req.body.bookid);
  const title = req.body.title;
  const subject = req.body.subject;
  const author = req.body.author;
  const user = req.body.user;
  const status = req.body.status;
  const copies = req.body.copies;
  const returnstatus = req.body.returnstatus;
  const date = Date.parse(req.body.date);
  const issue_date = Date.parse(req.body.issue_date);
  const due_date = Date.parse(req.body.due_date);
    Request.findOne(
    { bookid: bookid,title:title,subject:subject,author:author,user:user,status:status,returnstatus:returnstatus,date:date,issue_date:issue_date,due_date:due_date}, (err, bookrecord) => {
    if(bookrecord){
      res.send({message: "You have already requested this book",bookrecord: bookrecord})
    console.log("This has already been saved")
    } else {
   const bookid =  Number(req.body.bookid);
  const title = req.body.title;
  const subject = req.body.subject;
  const author = req.body.author;
  const user = req.body.user;
  const status = req.body.status;
  const copies = req.body.copies;
  const returnstatus = req.body.returnstatus;
  const date = Date.parse(req.body.date);
  const issue_date = Date.parse(req.body.issue_date);
  const due_date = Date.parse(req.body.due_date);
  const newRequest = new Request({
    bookid,
    title,
    subject,
    author,
    user,
    status,
    copies,
    returnstatus,
    date,
    issue_date,
    due_date
  });
//  console.log(newRequest);
  newRequest
    .save()
    .then(() => res.send({message: "Your request is Successful"}))
    .catch(err => res.status(400).json("Error: " + err));
}
})
});

// res.send({message: "Request Added"})
    

// router.route("/add").post((req, res) => {
//   const bookid =  Number(req.body.bookid);
//   const title = req.body.title;
//   const subject = req.body.subject;
//   const author = req.body.author;
//   const user = req.body.user;
//   const status = req.body.status;
//   const returnstatus = req.body.returnstatus;
//   const date = Date.parse(req.body.date);
//   // const username =  req.body.username
//   const newRequest = new Request({
//     bookid,
//     title,
//     subject,
//     author,
//     user,
//     status,
//     returnstatus,
//     date
//   });
//  console.log(newRequest);
//   newRequest
//     .save()
//     .then(() => res.json("Request added!"))
//     .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/:id").get((req, res) => {
    Request.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
    Request.findByIdAndDelete(req.params.id)
    .then(() => res.json("Request deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Request.findById(req.params.id)
  .then(request => {
      request.username = req.body.username;
      request.title = req.body.title;
      request.status = req.body.status;
      request.returnstatus = req.body.returnstatus;
      request.subject = req.body.subject;
      request.author = req.body.author;
       request.copies = req.body.copies;
      request.date = Date.parse(req.body.date);
      request.issue_date = Date.parse(req.body.issue_date);
      request.due_date = Date.parse(req.body.due_date);
      // if(request.status === "Accepted") {
      //   request.copies = req.body.copies-1;
      request
      .save()
      .then(() => res.json("request updated!"))
      .catch(err => res.status(400).json("Error: " + err));
      
  // }
})
  .catch(err => res.status(400).json("Error: " + err));
});

router.route("/user/:param").get((req, res) => {
  var param = req.param("param");
  console.log(param);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});


router.route("/title/:param").get((req, res) => {
  var param = req.param("param");
  console.log(param);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { title: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});


router.route("/user/:param").get((req, res) => {
  var param = req.param("param");
  // console.log(param2);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    console.log(id)
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});

router.route("/user/:param/:param2").get((req, res) => {
  var param = req.param("param");
  var param2 = req.param("param2");
  // console.log(param2);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param,param2);
    console.log(id)
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { user: param, status:param2 };
  }

  mongoose.model("Request").find(query, function(err, obj) {
    res.send(obj);
    // console.log(obj);
  });
});




module.exports = router;