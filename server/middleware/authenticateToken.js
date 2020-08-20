const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token){
            res.status(403).json({msg: "Not authorized."});
        }
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = payload.user;
        next();
    } catch (err) {
        res.status(403).json({msg: "Not authorized."});
    }
}