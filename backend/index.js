var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect('mongodb://127.0.0.1:27017/register_form')
 .then(()=>console.log("Connected to database"))
 .catch(err=>console.log("Error in Connection"));
var db = mongoose.connection;
app.post("/sign_up", (req,res)=>{
    var name = req.body.name
    var age = req.body.age
    var gender = req.body.gender
    var email = req.body.email
    var password = req.body.password
    var phno = req.body.phno

    var data ={
        "name":name,
        "age":age,
        "gender":gender,
        "email":email,
        "password":password,
        "phno":phno
    }
    db.collection('data').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted!");
    });
    return res.redirect('signed_up.html');

});

app.get("/", (req, res) => {
    return res.redirect('home.html');
});


app.get("/register", (req, res) => {
    return res.redirect('index.html');
});

app.listen(3001, () => {
    console.log("Listening on port 3001");

    
});