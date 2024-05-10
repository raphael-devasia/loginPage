const express = require("express")
const collection = require("../../controller/schema")
const router = express.Router()
const {getLogin,getRegister,getHome,getLogout,createLogin,createRegister}= require('../../controller/user')


router.get("/login",getLogin )
router.post("/login", createLogin)
router.get("/register",getRegister )
router.post("/register", createRegister)
router.get("/home",getHome)
router.get("/logout", getLogout)


// router.get("/admin/login", (req, res) => {
//     if (req.session.user) {
//         return res.redirect("/home")
//     }

//     res.render("adminLogin")
// })

// //Admin registration page

// router.get("/admin/register", (req, res) => {
//     if (req.session.user) {
//         const userDetails = data.find((user) => {
//             return user
//         })

//         return res.render("profile", { data: userDetails })
//     }

//     res.render("adminSignup")
// })


module.exports = router
