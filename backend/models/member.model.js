const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    username: { type: String, required: true},
    status: { type: String, required: true },
    email: { type: String, required: true,index: { unique: true } },
    password: { type: String, required: true },
    fine: { type: Number, required: true },
  },
  {
    timestamps: true
  }
);

const Member = mongoose.model("member", memberSchema);

module.exports = Member;