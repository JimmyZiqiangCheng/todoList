
module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    // verify if email address is legal
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) 
    { 
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(userPassword);
    }
  
    if (req.path === "/register") {
        // check if any of the element in an array is empty
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({"message" : "Missing credentials."});
        } else if (!validEmail(email)) {
            return res.status(401).json({"message" : "Invalid email address."});
        }  else if (!validPassword(password)){
            return res.status(401).json({"message" : "password should be between 8 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter."});
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