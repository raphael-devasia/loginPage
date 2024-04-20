const express = require("express")
const router = express.Router()
const 


const data = [
    {
        email: "test@gmail.com",
        name: "Jino Devasia",
        password: "Test@1234",
        job: "Full Stack Developer",
        place: "Kerala,India",
        phone: "907 429 7611",
    },
]

router.get("/login", (req, res) => {
    if(req.session.user){
       return res.redirect('/home')
    }
    
    res.render("base")
})

router.post("/login", (req, res) => {
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

    // Check if email exists in data array
    const user = data.find((user) => user.email === email)

    if (!user) {
        return res.render("base", { msg: "Email is not valid" })
    }

    // Check if password matches the user's password
    if (user.password !== password) {
        return res.render("base", { msg: "Password is not valid" })
    }

    // If both email and password are valid, set the user in session and redirect to home
    req.session.user = email
    res.redirect("/home")
})


router.get("/home", (req, res) => {
    if(req.session.user){
        const userDetails= data.find((user)=>{
            return user

        })
      
return res.render("profile", { data: userDetails })
    }
    
    res.redirect('/login')

    
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    
    res.redirect('/')
})

module.exports = router
