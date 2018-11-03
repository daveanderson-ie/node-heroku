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

function getElements(req, res) {
    if(isAuthorised(req)){
        res.sendStatus(200);
    } else {
        res.sendStatus(503);
    }
    
};

module.exports = { getElements };