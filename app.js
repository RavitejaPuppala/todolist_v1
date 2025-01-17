import express from "express";
import bodyParser from "body-parser";


const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));


app.get("/", function(req, res) {
    let today = new Date();

    let options = {
        weekday : "long",
        day : "numeric",
        month : "long",
    };

    let date = today.toLocaleDateString("en-US", options);

    res.render("index.ejs", {
        listTitle : date,
        newItemsList : items,
    });
});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res) {
    res.render("index.ejs", {
        listTitle : "Work List",
        newItemsList : workItems,
    });
});

app.get("/about", function(req, res) {
    res.render("about.ejs");
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});