//Custom middleware functions
function log(req,res,next){
    console.log("Logging...");
    next();
};

function authenticate(req,res,next){
    console.log("Authenticating...");
    next();
};

exports.log = log;
exports.authenticate = authenticate;