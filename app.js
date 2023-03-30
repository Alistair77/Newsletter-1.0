const express = require("express");
const request = require("request");
const https = require("https");
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
//cuz the file are static meaning its not a url hence using this is required
app.use(express.static("public"));

app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, resp) {
  resp.sendFile(__dirname + "/signup.html");
})
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "6752443cea9c6e5fad326117b8fdd7bf-us21",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us21"
});

app.post("/", function(req, res) {
      const firstName = req.body.fName;
      const secondName = req.body.lName;
      const email = req.body.email;
      //*****************************ENTER YOU LIST ID HERE******************************
      const listId = "91d0845392";
      //Creating an object with the users data
      const subscribingUser = {
       firstName: firstName,
       lastName: secondName,
       email: email
      };
      //Uploading the data to the server
       async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
       email_address: subscribingUser.email,
       status: "subscribed",
       merge_fields: {
       FNAME: subscribingUser.firstName,
       LNAME: subscribingUser.lastName
      }
      });
      //If all goes well logging the contact's id
       res.sendFile(__dirname + "/success.html")
       console.log(
      `Successfully added contact as an audience member. The contact's id is ${
       response.id
       }.`
      );
      }
      //Running the function and catching the errors (if any)
      // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
      // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
       run().catch(e => res.sendFile(__dirname + "/failure.html"));
      });

      app.post("/failure",function(req,res){
        res.redirect("/")
      })


    app.listen(process.env.PORT || 3000, function() {
      console.log("server is running on port 3000");
    })

    //api key
    //6752443cea9c6e5fad326117b8fdd7bf-us21
    //unique id = 91d0845392
