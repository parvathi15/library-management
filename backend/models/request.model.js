const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RequestSchema = new Schema(
  {
    bookid:{type:Number,required:true},
    title: { type: String, required: true},
    subject:{type:String,required:true},
    author:{type:String,required:true},
    user: { type: String, required: true },
    status: { type: String, required: true },
    copies: { type: Number, required: true },
    date: { type: Date, required: true },
    returnstatus: {type:Boolean,required:true},
    issue_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
  },
  {
    timestamps: true
  }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;