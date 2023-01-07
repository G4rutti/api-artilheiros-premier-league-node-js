const express = require("express")
const bodyParser = require("body-parser")

const userRoute = require('../routes/topLeader') // importando funçoes

const app = express()
const porta = 3000

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello World")
})

userRoute(app)

app.listen(porta, () => console.log("Api rodando na porta 3000"))

