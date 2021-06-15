const User = require('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = {
  register : async function (req, res){
    return res.render('register')
  },
  save : async function (req,res){
    const createdUser = await User.findOne({username: req.body.username})
    if(createdUser) return res.status(400).send("Usuário existente")

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password),
      sigplay_user: req.body.sigplay_user,
      sigplay_pass: req.body.sigplay_pass,
    })
    try{
      
      const savedUser = await user.save()
      res.redirect("/")
    }catch(error){
      res.send(error)
    }
    
  },
  logar: function(req, res){
    return res.render('login')
  },
  login: async function(req, res){
    const selectedUser = await User.findOne({username: req.body.username})
    if(!selectedUser) return res.send("Usuário ou senha inexistente")

    
    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
    if(!passwordAndUserMatch) return res.send("Usuário ou senha inexistente")

    const token = jwt.sign({_id: selectedUser.id}, process.env.TOKEN_SECRET)

    res.header("Access-Control", token)
    return res.render("principal",{user : selectedUser})
    //return res.redirect('/consigna_bot')
  }


}

module.exports = UserController