const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){


    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);


    const url = "https://us6.api.mailchimp.com/3.0/lists/2719d2bdaa";
    const options = {
        method : "POST",
        auth : "aditya:35facb3633d04dbcd2d3e38512137f3e-us6"
    }


    const request = https.request(url, options, function(response){
        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        res.sendFile(__dirname+"/failure.html");

    });


    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running on port 3000");
});


//35facb3633d04dbcd2d3e38512137f3e-us6
//2719d2bdaa