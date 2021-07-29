const User = require('../model/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const UserController = {
  register: async function (req, res) {
    return res.render('register')
  },
  save: async function (req, res) {
    const createdUser = await User.findOne({ username: req.body.username })
    if (createdUser) return res.status(400).send("Usuário existente")

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password),
      sigplay_user: req.body.sigplay_user,
      sigplay_pass: req.body.sigplay_pass,
    })
    try {

      const savedUser = await user.save()
      res.send(savedUser)
    } catch (error) {
      res.send('erro')
    }

  },
  logar: function (req, res) {
    return res.render('login')
  },
  login: async function (req, res) {

    const selectedUser = await User.findOne({ username: req.body.username })
    if (!selectedUser) return res.send("Usuário ou senha inexistente")


    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
    if (!passwordAndUserMatch) return res.send("Usuário ou senha inexistente")

    const token = jwt.sign({ _id: selectedUser.id }, process.env.TOKEN_SECRET, { expiresIn: 86400 })

    res.header("Access-Control", token)
    return res.redirect(`/principal/${selectedUser.username}/${token}`)
  },
  logout: function (req, res) {
    return res.redirect('/')
  },
  principal: async function (req, res) {

    const token = req.params.token
    var values = { meiopagto: '', status: '' }
    const username = req.params.user
    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado")
    if (!selectedUser) return res.status(401).send("Acesso Negado")

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if (userVerified) {
        return res.render('principal', { user: selectedUser, token, values })
      }



    } catch (error) {
      console.log(error)
      res.redirect("/")
    }

  },
  resetPass: async function(req,res){
    const newPass = req.params.newPass

    const Users = await User.find({})

    const user = {
      sigplay_pass: newPass
    }
    Users.forEach(async (e) => {
      let doc = await User.updateOne({_id: e.id},user);
    })

    const Users = await User.find({})
    res.json(Users)

  }

}

module.exports = UserController