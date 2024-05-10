const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const userRouter = require("./routes/user/userRoutes")
const adminRouter = require("./routes/admin/adminRoutes")
const bodyParser = require("body-parser")
const nocache = require("nocache")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { error } = require("console")
const collection = require("./controller/schema")
var flash = require("connect-flash")

// Middleware to set the static page
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse request bodies

app.use(bodyParser.urlencoded({ extended: true }))

//setting the EJS view engine
app.set("view engine", "ejs")
// Middleware for parsing cookies and managing sessions


// Middleware for flashing messages
app.use(flash());
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
app.use("/", userRouter)
app.use("/admin/",adminRouter)

app.get("/", (req, res) => {
    res.redirect("/login")  
})
dotenv.config()

const port = process.env.PORT || 5050
const MONGOURL = process.env.MONGO_URI
//connect to mongo db
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("successfully connected to database")
        app.listen(port, () => {
            console.log(`Server is listening at port ${port} `)
        })
    })
    .catch((error) => {
        console.log("failed to connect to database", error)
    })
