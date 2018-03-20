var mongoose=require("mongoose");

var DocumentSchema = new mongoose.Schema({
   name: String,
   author: String,
   type: String,
   img: String,
   link: String,
   category: String,
   keywords:[String]
   
},{collection: "document"});

module.exports = mongoose.model("Document", DocumentSchema);