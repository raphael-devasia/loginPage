const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const router = require("./router")
const bodyParser = require("body-parser")
const nocache = require("nocache")

// Middleware to set the static page
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse request bodies

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(nocache())
// Middleware for sessions
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
)

app.use("/", router)
app.get('/',(req,res)=>{
    res.redirect('/login')
})

const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log("Server is listening at port 8080")
})
