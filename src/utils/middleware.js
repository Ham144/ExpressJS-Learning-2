import { users } from "./constants.js"

export const resolveUsersById = (req, res, next) => {
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