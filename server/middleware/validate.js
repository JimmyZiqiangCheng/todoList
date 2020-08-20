
module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    // verify if email address is legal
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
        // check if any of the element in an array is empty
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({"message" : "Missing credentials."});
        } else if (!validEmail(email)) {
            return res.status(401).json({"message" : "Invalid email address."});
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json({"message" : "Missing credentials."});
        } else if (!validEmail(email)) {
            return res.status(401).json({"message" : "Invalid email address."});
        }
    }
    next();
};