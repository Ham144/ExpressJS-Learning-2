import express from 'express'

const Port = process.env.PORT || 3000
const app = express()

app.use(express.json())

const users = [
    { id: 1, userName: "ahmad", age: 23 },
    { id: 2, userName: "indah", age: 26 },
    { id: 3, userName: "mia", age: 12 },
    { id: 4, userName: "riska", age: 23 },
]


app.post('/users', (req, res) => {
    const { body } = req
    const newUser = { id: users[users.length - 1].id + 1, ...body }
    users.push(newUser)
    return res.status(201).send(newUser)
})


app.put('/users/:id', (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(402).send("Params harus angka")
    const findUser = users.findIndex((user) => user.id === parsedId)
    if (findUser === -1) return res.sendStatus(404)
    users[findUser] = { id: parsedId, ...body }
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



app.get('/users/:id', (req, res) => {
    const parseId = parseInt(req.params.id)
    if (isNaN(parseId)) return res.status(404).send(`<h1>ID should be Number</h1>`);

    const findUser = users.find((user) => (
        user.id === parseId  //INGAT HARUS PAKAI RETURN UNTUK Fungsi array syarat/kriteria atau bungkus ()
    ));
    if (!findUser) return res.sendStatus(401)
    return res.send(findUser)
})

app.patch("/users/:id", (req,res) =>{
    const {params : {id}, body } = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return req.status(405).send(`<h1>ID harus angka </h1>`)
    const foundIndex = users.findIndex((user) => {

        return user.id === parsedId
    })
    if(foundIndex === -1) return res.status(404).send(`<h1>Not found with the id ${parsedId}</h1>`)
    users[foundIndex] = {...users[foundIndex], ...body}
    return res.status(202).send(users)
})


app.delete('/users', (req,res) => {
    const {params : {id}} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.status(402).send("ID must be A number")
    const foundIndex = users.findIndex((user) => {
        return user.id === parsedId
     })
    if(foundIndex === -1) return res.status(404).send("not Found bro") 
    users.splice(foundIndex, 1)
    res.status(202)
})


app.listen(Port, () => console.log(`============END=============`))