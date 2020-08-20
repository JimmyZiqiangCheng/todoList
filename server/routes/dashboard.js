const router = require("express").Router();
const pool = require("../db");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async(req, res) => {
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [req.user]
        )
        res.json(user.rows[0]);
    } catch (err) {
        console.error (err.message);
        res.status(500).json({"message": "server error."});
    }
});

module.exports = router;