const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    const data =
    {
        members:
            [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields:
                    {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
    };

    const jsonData = JSON.stringify(data);
    // console.log(jsonData);

    const url = "https://us6.api.mailchimp.com/3.0/lists/3ae1ded780";

    const options = {
        method: "POST",
        auth: "gitesh1:7bd9767ddfee8faebbc66e654b8e4ddf-us6"
    }
        ;
    const request = https.request(url, options, function (response) {


        console.log(response.statusCode);
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html")
        }

        else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/");

})





app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000")
})







// Heroku
// https://afternoon-fortress-00017.herokuapp.com/
