

const data = {
    email: "test@gmail.com",
    name: "Jino Devasia",
    password: "test123",
    job: "Full Stack Developer",
    place : "Kerala,India",
    phone : "907 429 7611"
}

const authorize = (req, res, next) => {
    if (req.body.email === data.email && req.body.password === data.password) {
        // Set user session data
        req.session.user = req.body.email
        next() // Continue to the next middleware or route handler
    } else {
        
        res.status(401).render('base',{msg:"Email and password should match !"}) // Send a 401 Unauthorized response
    }
}

module.exports = {authorize,data}
