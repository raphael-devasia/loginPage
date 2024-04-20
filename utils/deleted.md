router page

// router.post("/login",(req, res) => {
     
//     const { email, password } = req.body
//     //check email
//     const isEmailvalid = data.find((e) => e.email===email)
//     if (!isEmailvalid) {
//         return res.render('base',{msg:'Email is not valid'})
//     }
//     //check password
//     const isPassword = data.find((p) => p.password === password)
//     if (!isPassword) {
//         return res.render("base", { msg: "Password is not Valid" })
//     }
//     // check both password and username
//     const realUser = data.find(
//         (user) => user.email === email && user.password === password
//     )
    

//     if (!realUser) {
//         return res.render("base", { msg: "Credentials does not match" })
//     }

//     req.session.user = email
    
    
//     res.redirect("/home")
// })

