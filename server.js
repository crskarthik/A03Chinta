var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") // simplifies access to request body

var app = express()  // make express app
var http = require('http').Server(app)  // inject app into the server

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
// app.set("test", path.resolve(__dirname, "test")) // path to test
// response.sendFile(path.join(__dirname+'/views'));
app.set("view engine", "ejs") // specify our view engine

// 2 create an array to manage our entries
var entries = []
app.locals.entries = entries // now entries can be accessed in .ejs files

app.use(express.static(__dirname + '/assets'))
app.use(express.static(__dirname + '/test'))
app.use(express.static(__dirname + '/views'))
// 3 set up an http request logger to log every request automagically
app.use(logger("dev"))     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }))
// 4 handle http GET requests (default & /new-entry)
app.get(['/','/index'], function (request, response) {
  response.render("index")
  // response.sendfile('index.html')
})
app.get("/about", function (request, response) {
  response.render("about")
  // response.sendfile('index.html')
})
app.get("/guestbook", function (request, response) {
  response.render("guestbook")
})
app.get("/test", function (request, response) {
  response.render("test")

})
app.get("/new-entry", function (request, response) {
  response.render("new-entry")
})
app.get("/contact", function (request, response) {
  response.sendFile("contact.html", { root: __dirname +"/views" })
})
app.post("/contact", function (request, response) {
  var api_key = 'key-018f1c90c0902cf145d3bc023b2cda30';
  var domain = 'sandbox5445b14231524e53b22a6cb28a5190ad.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'A03 WebApp <postmaster@sandbox5445b14231524e53b22a6cb28a5190ad.mailgun.org>',
    to: 's530460@nwmissouri.edu',
    subject: 'Contact from '+request.body.email,
    text: request.body.query
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
    response.send("Mail Send Successfully");
    else
    response.send("Error Occured"+error)
  });
})
// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.")
    return
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  })
  response.redirect("/guestbook")  // where to go next? Let's go to the home page :)
})

// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404")
})

// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/')
})
