const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
//registering

router.post("/register", async(req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const {name, email, password} = req.body;
        //2. check if user exist (if so, throw error)
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", [email]);
        
        if (user.rows.length !== 0){
            return res.status(409).send("User already existed");
        }
        //3. Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //4. enter the new user inside our database
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
        ); 
        
        //5. generating jwt token
        const user_id = newUser.rows[0].user_id;
        const token = jwtGenerator(user_id);

        res.json({token});
        
    } catch (err) {
        console.error (err.message);
        res.status(500).send("server error...");
    }
})


//login
// app.post("/login", (req, res) => {
//     try {
//         const user_id = req.body.user_id;
//         const accessToken = jwtGenerator(user_id);

//         res.json({ accessToken: accessToken })
//     } catch (err) {
//         console.error (err.message);
//     }
// })

module.exports = router;

