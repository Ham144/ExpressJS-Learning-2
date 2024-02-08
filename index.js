import express from 'express'

const Port = process.env.PORT || 3000
const app = express()
const users = [
    { id: 1, userName: "ahmad", age: 23 },
    { id: 2, userName: "indah", age: 26 },
    { id: 3, userName: "mia", age: 12 },
    { id: 4, userName: "riska", age: 23 },
]

app.get('/', (req, res) => {
    res.send({ msg: "hello" })
})

app.get('/users', (req, res) => {
    const { filter, value } = req.query;
    if (!filter && !value) return res.send(users)
    if (filter && value) return res.send(
        users.filter((user) => {   
            return user[filter].includes(value) //INGAT HARUS PAKAI RETURN UNTUK Fungsi array syarat/kriteria
        })
    )
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

app.listen(Port, () => console.log(`============END=============`))