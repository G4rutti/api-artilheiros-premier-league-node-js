const express = require("express")
const bodyParser = require("body-parser")
const Parse = require('parse/node');



const userRoute = require('../routes/topLeader') // importando funçoes

const app = express()
const porta = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(porta, () => console.log("Api rodando na porta 3000"))

userRoute(app)


