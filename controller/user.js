const collection = require("../controller/schema")

const getLogin = (req, res) => {
    const isAdmin = false
    if (req.session.user) {
        return res.redirect("/home")
    }

    res.render("base",{isAdmin,access:"USER"})
}
const getRegister = (req, res) => {
    const isAdmin = false
    if (req.session.user) {
        
 return res.redirect("/home")
        
    }

    res.render("userSignup", { isAdmin, access: "User" })
}
const createLogin = async (req, res) => {
    const isAdmin = false
    const { email, password } = req.body

    // Regular expression patterns for email and password validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    // Check if email matches the pattern
    if (!emailPattern.test(email)) {
        return res.render("base", { msg: "Invalid email format" })
    }

    // Check if password matches the pattern
    if (!passwordPattern.test(password)) {
        return res.render("base", { msg: "Invalid password format" })
    }
    try {
        // Check if email exists in database
        const checkUser = await collection.findOne({
            email: email,
            password: password,
        })
        // const user = data.find((user) => user.email === email)

        if (!checkUser) {
            return res.render("base", { msg: "Email or password is not valid" ,isAdmin})
        } else {
            req.session.user = email
            res.redirect("/home")
        }

        // If both email and password are valid, set the user in session and redirect to home
    } catch (error) {
        return res.render("base", {
            msg: "An error occurred, please try again later",
        })
    }
}
const createRegister = async (req, res) => {
    const isAdmin = false
    const userData = {
        name: req.body.fullName,
        user: req.body.userName,
        password: req.body.password,
        gender: req.body.inlineRadioOptions,
        phone: req.body.phone,
        email: req.body.email,
    }

    // const validationErrors = validateUserData(userData)

    // if (validationErrors) {
    //     console.log(validationErrors);
    //     return res.render("userSignup", { errors: validationErrors, userData })
    // }

    const existingUser = await collection.findOne({ user: userData.user })
    const existingphone = await collection.findOne({ phone: userData.phone })
    const existingemail = await collection.findOne({ email: userData.email })

    if (existingUser) {
        res.render("userSignup", {
            existmsg: "username already exists. Try with a new username",
            isAdmin,
        })
    } else if (existingphone) {
        res.render("userSignup", {
            existmsg:
                "phone number already exists. Try with a new phone number",
            isAdmin,
        })
    } else if (existingemail) {
        res.render("userSignup", {
            existmsg: "email already exists. Try with a new email address",
            isAdmin,
        })
    } else {
        const registerData = await collection.insertMany(userData)
        console.log("data inserted successfully",userData);
        setTimeout(() => {
            res.redirect("/")
        }, 2000) //
    }
}
const getHome = async (req, res) => {
    const isAdmin = false

    const userDetails = await collection.findOne({
        email: req.session.user,
    })
if (userDetails){
if (req.session.user) {
        return res.render("profile", { data: userDetails })
    }

    res.redirect("/login")
}

else{ 
    req.session.destroy()
    res.redirect("/login")}
    
}

const getLogout = (req, res) => {
    const isAdmin = false
    req.session.destroy()

    res.redirect("/")
}
module.exports = {
    getLogin,
    getRegister,
    getHome,
    getLogout,
    createLogin,
    createRegister,
}
