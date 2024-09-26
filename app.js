const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Nodemailer setup
let transporter = nodemailer.createTransport({
    host: 'taylonearle.com',
    port: 465,
    secure: true,
    auth: {       
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});

// Explicit routes (put these before the dynamic route)
app.get('/', (req, res) => {
    res.render("home");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});

// Contact form handling with nodemailer
app.post('/contact', (req, res) => {
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: 'info@taylonearle.com',
        subject: req.body.subject,
        text: "From: " + req.body.email + "\nName: " + req.body.name + "\nMessage: " + req.body.message + "\n" + req.body.authorization,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });

    res.redirect("/");
});

// Start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


app.use((req, res) => {
    console.log(`404 Error - Page not found: ${req.url}`);
    res.status(404).render('404');  // Render 404.ejs for any non-existent routes
});