const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
 {
   name: {
     type: String,
     required: [true, "Please add the user name."],
   },
   email: {
     type: String,
     required: [true, "Please add the email address."],
     unique: [true, "Email already exists."],
   },
   password: {
     type: String,
     required: [true, "Please add the user password."],
   },
 },
 {
   timestamps: true,
 }
);
module.exports = mongoose.model("User", contactSchema);
