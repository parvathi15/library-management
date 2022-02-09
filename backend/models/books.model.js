const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    bookid:{type:Number,required:true},
    title: { type: String, required: true},
    subject:{type:String,required:true},
    author:{type:String,required:true},
    status: { type: String, required: true },
     copies:{type:Number,required:true}
    //  author: {type: String, required: true},
    //  fine: {type: Number,default: 0 },
    //  isAvailable: { type: Boolean,default: true}
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;