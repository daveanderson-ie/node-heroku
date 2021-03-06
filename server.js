let express = require('express');
let app = express();
let port = process.env.PORT || 8080;

let element = require('./app/routes/element');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({message: "Welcome to Server."}));
app.route("/element").get(element.get);
app.route("/element").post(element.post);
    
if(!module.parent){
    console.log("Listening on port " + port);
    app.listen(port);
}

module.exports = app;
