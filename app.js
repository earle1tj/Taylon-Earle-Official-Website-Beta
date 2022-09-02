const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const babble = require("@babel/register");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render("home", {
    });

});


app.get('/resume', (req, res) => {
    res.render("resume", {
    });

});

app.get('/aboutMe', (req, res) => {
    res.render("About Me", {
    });

});

app.get('/contactMe', (req, res) => {
    res.render("Contact Me", {
    });

});




app.listen(3000, function () {
    console.log("Server started on port 3000");
});
