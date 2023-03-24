import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = (dirname(__filename));

let items = [];
let workItems = []

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res){
    let day = new Date();

    let options = {weekday:"long", day :"numeric", month:"long"}

    let today = day.toLocaleDateString("en-US", options);

    res.render("index", {
        listTitle: today,
        newListItem : items
    })
})

app.post("/", function(req, res){
    let item = req.body.newItem;

    console.log(req.body)
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function(req, res){
    res.render("index", {
        listTitle : "Work List",
        newListItem : workItems
    })
})

app.get("/about", function(req, res){
    res.render("about")
})

app.listen(3000, function(req, res){
    console.log("Ready");
})