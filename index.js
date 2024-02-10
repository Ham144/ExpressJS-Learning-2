import express from 'express'
import { query } from 'express-validator'

const Port = process.env.PORT || 3000
const app = express()

app.use(express.json())

const users = [
    { id: 1, userName: "ahmad", age: 23 },
    { id: 2, userName: "indah", age: 26 },
    { id: 3, userName: "mia", age: 12 },
    { id: 4, userName: "riska", age: 23 },
]

const resolveUsersById = (req, res, next) => {
    const { id } = req.params
    if (id > users.length) return res.status(404).send(`Data Dengan id: ${id} dangadong`)
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(402)
    const foundIndex = users.findIndex((user) => {
        return user.id === parsedId
    })
    if (foundIndex === -1) return res.status(404).send("Data tidak deketemukan")
    req.foundIndex = foundIndex
    next()
}


app.post('/users', (req, res) => {
    const { body } = req
    const newUser = { id: users[users.length - 1].id + 1, ...body }
    users.push(newUser)
    return res.status(201).send(newUser)
})


app.put('/users/:id', resolveUsersById, (req, res) => {
    const { body, foundIndex } = req;
    users[foundIndex] = { id: users[foundIndex].id, ...body }
    return res.status(200)
})


app.get('/users', (req, res) => {
    const { filter, value } = req.query;
    if (!filter && !value) return res.send(users)
    if (filter && value) {
        if (filter === "userName") {
            return res.send(
                users.filter((user) => {
                    return user[filter].includes(value) //INGAT HARUS PAKAI RETURN UNTUK Fungsi array syarat/kriteria
                })
            )
        }
        else if (filter === "age") {
            return res.send(
                users.filter((user) => {
                    return user[filter] < value
                })
            )
        }
    }
})



app.get('/users/:id', resolveUsersById, (req, res) => {
    const { foundIndex } = req
    const user = users[foundIndex]
    return res.send(user)
})

app.patch("/users/:id", resolveUsersById, (req, res) => {
    const { foundIndex, body } = req
    users[foundIndex] = { ...users[foundIndex], ...body }
    return res.status(202).send(users)
})


app.delete('/users/:id', resolveUsersById, (req, res) => {
    const { foundIndex } = req
    users.splice(foundIndex, 1)
    return res.status(202)
})


app.listen(Port, () => console.log(`============END=============`))