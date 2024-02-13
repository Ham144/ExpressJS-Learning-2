import express from 'express'
import routes from "./src/routes/index.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { users } from './src/utils/constants.js'

const Port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret: "ham the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(routes)

app.get("/", (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = true
    res.cookie("key", "value", { maxAge: 10000, signed: true })
    res.status(200).send({ msg: "HEllo" })
})

app.post("/auth", (req, res) => {
    const { body: { userName, password } } = req
    const finduser = users.find((user) => {
        return user.userName === userName
    })
    if (!finduser || finduser.password !== password) {
        return res.status(401).send({ msg: "Bad credentials" })
    }
    req.session.user = finduser
    res.status(200).send("authenticated")
})

app.get("/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session)
    })
    return req.session.user ? res.status(200).send(req.session.user)
        : res.status(401).send({ msg: "Not authenticated " })
})

app.post("/cart", (req, res) => {
    if (!req.session.user) return res.sendStatus(401)
    const { body: item } = req
    console.log(item)
    const { cart } = req.session
    if (cart) {
        cart.push(item)
    }
    else {
        req.session.cart = [item]
    }
    return res.status(201).send(item)
})

app.get("/cart", (req, res) => {
    if (!req.session.cart) return res.status(401).send({ msg: "unauthorized" })
    return res.send(req.session.cart ?? [])

})

app.listen(Port, () => console.log(`============END=============`))