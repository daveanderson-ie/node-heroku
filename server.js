let express = require('express');
let app = express();
let port = 8080;
let element = require('./app/routes/element');

app.get("/", (req, res) => res.json({message: "Welcome to Server."}));
app.route("/element")
    .get(element.getElements);
    
if(!module.parent){
    console.log("Listening on port " + port);
    app.listen(port);
}

module.exports = app;