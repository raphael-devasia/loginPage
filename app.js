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

//setting the EJS view engine
app.set("view engine", "ejs")

// No-Cache middleware
app.use(nocache())

// Middleware for sessions
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
)
//Router setup
app.use("/", router)

app.get('/',(req,res)=>{
    res.redirect('/login')
})

const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`Server is listening at port ${port} `)
})
