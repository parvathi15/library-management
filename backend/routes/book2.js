const router = require("express").Router();
let Book = require("../models/books.model.js");
let Request = require("../models/request.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/").get((req, res) => {
  // const title = req.body.title;
  // Book.distinct("title")
  // .then(books => res.json(books))
  // .catch(err => res.status(400).json("Error: " + err));
  // var names=  Book.distinct("title");
  // // .then(names => res.json(names))
  // // .catch(err => res.status(400).json("Error: " + err));
  // Book.findOne({'title':{$in:["vaayuputra","ramayana"]}})
  //   .then(books => res.json(books))
  //   .catch(err => res.status(400).json("Error: " + err));
  
  // Book.distinct("title")
  // .then(s=>res.json(s))
  // .catch(err => res.status(400).json("Error: " + err));
  // console.log(s);

  
  
// });


router.get('/sachu',async function(req, res) {
  var data=[];
  try{
    let bookData=await Book.distinct("title").exec();
    for(bookI of bookData){
      let eachData=await Book.findOne({'title':{$in:bookI}}).exec();
      let bookTotalJ=await Book.find({'title':{$in:bookI}}).exec();
      let bookTotal=bookTotalJ.length;
      let bookReadingJ=await Request.find({'title':{$in:bookI},'status':'reading'}).exec();
      let countValue=bookTotalJ.length-bookReadingJ.length;
      let line=JSON.stringify(eachData);
      console.log(typeof line);
      let str=',"count":'+countValue.toString()+'}';
      line=line.replace('}',str);
      console.log(line);
      data.push(JSON.parse(line));
    }    
    return res.status(200).json(data)
  }
  catch(err){
    return res.status(400).json({err})}
});


router.route("/count").get((req, res) => {
  Book.find({}, (err, title)=> {
    console.log(title)
  })
});


router.route("/add").post((req, res) => {
  const bookid =  Number(req.body.bookid);
  const title = req.body.title;
  const subject = req.body.subject;
  const author = req.body.author;
  const status = req.body.status;
  const copies = req.body.copies;
  // const username =  req.body.username
  const newBook = new Book({
    bookid,
    title,
    subject,
    author,
    status,
     copies
  });

  newBook
    .save()
    .then(() => res.send({message: "Book Added Successfully"}))
    .catch(err => res.status(400).json("Error: " + err));
});



router.route("/:id").get((req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json("Book deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.bookid = req.body.bookid;
      book.title = req.body.title;
      book.subject = req.body.subject;
      book.author = req.body.author;
      book.date = Date.parse(req.body.date);
      book.copies = req.body.copies;
      book
        .save()
        .then(() => res.json("Book updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
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

  mongoose.model("Book").find(query, function(err, obj) {
    res.send(obj);
    console.log(obj);
  });
});

module.exports = router;