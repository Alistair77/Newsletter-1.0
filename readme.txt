const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
//cuz the file are static meaning its not a url hence using this is required
app.use(express.static("public"));

app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, resp) {
  resp.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;


      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          //bcuz merge_fields is a object so we used {}
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]


      };

      var jsonData = JSON.stringify(data);

      const url = "https://us21.api.mailchimp.com/3.0/lists/91d0845392"

      const options ={
        method: "POST",
        auth: "Alistair7:6752443cea9c6e5fad326117b8fdd7bf-us21"
      }
       const request = https.request(url, options, function(response) {
         response.on("data", function (data){
          console.log(JSON.parse(data));
      request.write(jsonData);});


    });




    app.listen(3000, function() {
      console.log("server is running on port 3000");
    })

    //api key
    //6752443cea9c6e5fad326117b8fdd7bf-us21
    //unique id = 91d0845392
