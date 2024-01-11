const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const authentication = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (decoded ) {
                req.body._id = decoded.user._id;
                req.body.email = decoded.user.email;
                console.log("user authenticated and authorized");
                next();
            } else {
                console.log("Invalid user authentication");
                return res.status(401).send({ error: "You are not an authenticated SuperAdmin." });
            }
        });
    } else {
        console.log("Token is not provided for SuperAdmin authentication");
        return res.status(401).send({ error: "You are not authenticated." });
    }
};
module.exports = { 
    authentication
};