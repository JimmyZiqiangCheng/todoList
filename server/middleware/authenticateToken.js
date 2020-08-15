const jwtGenerator = require("../utils/jwtGenerator")

const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // check if not token
    if (token == null) return res.status(401).json({msg: "Token not found, authorization denied."});
    // verify token
    try {
        // it is going to give us the user id (user: {id: user_id})
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid."});
    }
}

module.exports = authenticateToken;