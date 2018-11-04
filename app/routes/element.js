let Elements = require('../models/element');

function isAuthorised(req){
    if(req.headers.authorization){
        var arr = req.headers.authorization.split(' ');
        if(arr.length == 2){
            if(arr[1] == 'mytoken'){
                return true;
            }
        }
    }
    return false;
}

function get(req, res) {
    if(isAuthorised(req)){
        Elements.getElements().then(es => {
            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                'elements': es,
            });
            res.end(json);    
        });
    } else {
        res.sendStatus(503);
    };
};

function post(req, res){
    if(isAuthorised(req)){
        Elements.addElement(req.body.name).then(e => {
            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                'name': e,
            });
            res.end(json);    
        });
    } else {
        res.sendStatus(503);
    }
};

module.exports = { get, post };