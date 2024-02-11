import express from 'express'
import { createUserValidationSchema } from './src/utils/validationSchemas.js'
import { query, validationResult, matchedData, checkSchema } from 'express-validator'
import userRouter from './src/routes/users.js'
import { users } from './src/utils/constants.js'

const Port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(userRouter)



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


app.put('/users/:id', resolveUsersById, (req, res) => {
    const { body, foundIndex } = req;
    users[foundIndex] = { id: users[foundIndex].id, ...body }
    return res.status(200)
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