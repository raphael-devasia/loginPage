const express = require("express")
const app = express()
const path = require("path")
const {authorize,data} = require("./utils/authorize")
const session = require("express-session")
const router= require('./router')

// Middleware to set the static page
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }))
app.set('view engine','ejs')

// Middleware for sessions
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
)

app.get("/", (req, res) => {
    res.render('base',{title:'login page'})
    res.end()
})

app.post("/login", authorize, (req, res) => {
    console.log(req.session);
    res.setHeader("Cache-Control", "no-store")
    // If authorization is successful, redirect to the profile page
    res.render('profile',{data:data})
})
const port =process.env.PORT || 8080
app.listen(port, () => {
    console.log("Server is listening at port 8080")
})
