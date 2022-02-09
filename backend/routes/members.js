const router = require("express").Router();
let Member = require("../models/member.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
    Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  Member.findOne({ email: email}, (err, user) => {
      if(user){
        console.log(user);
          if(user.status === "pending") {
              res.send({message: "need approval from admin",user: user})
          } else if (user.status === "Rejected") {
            res.send({message: "Admin rejected your membership",user: user})  
          } else if (password === user.password && user.status === "Accepted" ) {
              res.send({ message: "Login Successfull",user: user})
          } else if (email !== "" && password === "" ) {
            res.send({ message: "Please Enter Password",user: user})
        }  
        else {
            res.send({ message: "Incorrect Password"})
        }
          
      } else {
          res.send({message: "User not registered"})
      }
  })
}) 

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const status = req.body.status;
  const email = req.body.email;
  const password = req.body.password;
  const fine = Number(req.body.fine);


  const newExercise = new Member({
    username,
    status,
    email,
    password,
    fine
 
  });

  newExercise
    .save()
    .then(() => res.json("Member added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Member.findById(req.params.id)
    .then(member => res.json(member))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
    .then(() => res.json("Member deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Member.findById(req.params.id)
    .then(member => {
        member.username = req.body.username;
        member.status = req.body.status;
        member.email = req.body.email;
        member.date = req.body.date;
        member.password = req.body.password;
        member.fine = Number(req.body.fine);

        member
        .save()
        .then(() => res.json("Member updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/status/:param").get((req, res) => {
  var param = req.param("param");
  console.log(param);

  var query = {};

  try {
    var id = mongoose.mongo.ObjectID(param);
    query = { id: id };
  } catch {
    // query = { title: new RegExp(param, "i") };
    query = { status: param };
  }

  mongoose.model("member").find(query, function(err, obj) {
    res.send(obj);
    console.log(obj);
  });
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
    query = { username: param };
  }

  mongoose.model("member").find(query, function(err, obj) {
    res.send(obj);
    console.log(obj);
  });
});

module.exports = router;