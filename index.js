import express from 'express'
import routes from "./src/routes/index.js"

const Port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.cookie('hello', 'world', { maxAge: 60000 })
    res.status(200).send({ msg: "Hello world" })
})


app.listen(Port, () => console.log(`============END=============`))