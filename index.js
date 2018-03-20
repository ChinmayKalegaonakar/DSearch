var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Document    = require("./models/document"),
    methodOverride = require("method-override");
    
var documentRoutes=require("./routes/document_route"),
    indexRoutes=require("./routes/index_route");
    
mongoose.connect("mongodb://localhost/dsearch");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use("/",indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The  Server Has Started!");
});