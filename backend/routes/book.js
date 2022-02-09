const router = require("express").Router();
let Book = require("../models/books.model.js");
let Request = require("../models/request.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});


router.get('/sachu',async function(req, res) {
  var data=[];
  try{
    let bookData=await Book.distinct("title").exec();
    for(bookI of bookData){
      let eachData=await Book.findOne({'title':{$in:bookI}}).exec();
      let bookTotalJ=await Book.find({'title':{$in:bookI}}).exec();
      let bookReadingJ=await Request.find({'title':{$in:bookI},'status':'Reading'}).exec();
      let bookReadingreturn=await Request.find({'title':{$in:bookI},'status':'Returned'}).exec();
      console.log(bookReadingreturn.length)
      let countValue=bookTotalJ.length-bookReadingJ.length;
      let line=JSON.stringify(eachData);
      let str=',"count":'+countValue.toString()+'}';
      console.log(str);
      line=line.replace('}',str);
      console.log(line);
      data.push(JSON.parse(line));
    }    
    return res.status(200).json(data)
  }
  catch(err){
    return res.status(400).json({err})}
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

router.route("/sachu/:id").get((req, res) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
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