var express = require("express");
var router  = express.Router();
var Document = require("../models/document");

//root route

router.get("/", function(req, res){
    Document.find({}, function(err, docs){
       if(err){
           console.log(err);
       } else {
                res.render("documents/index",{Document:docs});
            }

    });
});

router.post("/", function(req, res){
  
    var name = req.body.name;
    var author = req.body.author;
    var type = req.body.type;
    var category = req.body.category;
    var image = req.body.image;
    var desc = req.body.keywords.split(",");
    var newCampground = {name: name,author:author,type:type,category:category, img: image, keywords: desc }

    Document.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});


//new page
router.get("/new",function(req, res){
   res.render("documents/new"); 
});

//details page
router.get("/:id", function(req, res){
    console.log("IN EDIT!");
    Document.findById(req.params.id, function(err, foundDoc){
        if(err){
            console.log(err);
        } else {
            
            res.render("documents/item", {Docs: foundDoc});
        }
    });
});

//edit 
router.get("/:id/edit", function(req, res){
    console.log("IN EDIT!");
    
    Document.findById(req.params.id, function(err, foundDoc){
        if(err){
            console.log(err);
        } else {
            
            res.render("documents/edit", {Docs: foundDoc});
        }
    });
});

//update route
router.put("/:id", function(req, res){
    var newData = {name: req.body.name, author: req.body.author, type: req.body.type,category:req.body.category,img:req.body.img,keyword:req.body.keywords};
    Document.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, foundDoc){
        if(err){

            res.redirect("back");
        } else {
            
            res.redirect("/" + campground._id);
        }
    });
});

//delete
router.delete("/:id/delete", function(req, res){
    Document.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/");
        }
    })
});

//search
router.post("/result", function(req, res){
    var key=req.body.keyword;
    Document.find({$text:{$search:key}}, function(err,foundDoc){
       if(err){

           console.log(err);
       } else {

                res.render("documents/index",{Document:foundDoc});
            }
    });
});

module.exports=router