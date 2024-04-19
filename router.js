const express = require("express")
const router = express.Router()

const data = [
    {
        email: "test@gmail.com",
        name: "Jino Devasia",
        password: "test123",
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
    //check email
    const isEmailvalid = data.find((e) => e.email === email)
    if (!isEmailvalid) {
        return console.log("email not valid")
    }
    //check password
    const isPassword = data.find((p) => p.password === password)
    if (!isPassword) {
        return console.log("password not valid")
    }
    // check both password and username
    const realUser = data.find(
        (user) => user.email === email && user.password === password
    )

    if (!realUser) {
        return console.log("not a valid user")
    }

    //  req.session.user = email;
    req.session.user = email
    res.redirect("/home")
})

router.get("/home", (req, res) => {
    if(req.session.user){
return res.render("profile", { data: data })
    }
    
    res.redirect('/login')

    
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    console.log('the session is',req.session);
    res.redirect('/')
})

module.exports = router
