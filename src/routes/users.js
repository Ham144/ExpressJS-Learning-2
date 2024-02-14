import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.js";
import { users } from "../utils/constants.js";
import { resolveUsersById } from "../utils/middleware.js";
import { User } from "../mongoose/schemas/user.js";

const router = Router()

router.get("/users", query("filter")
    .isString()
    .withMessage("filter tidak boleh berupa angka")
    .notEmpty()
    .withMessage("filter tidak boleh kosong")
    .isLength({ min: 3, max: 10 })
    .withMessage("filter.length harus diantara 3-10"),
    (req, res) => {
        console.log(req.session)
        console.log(req.session.id)
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                console.log(err)
                throw err
            }
            console.log(sessionData)
        })
        const result = validationResult(req)
        console.log(result)
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

router.get("/users/:id", resolveUsersById, (req, res) => {
    const { foundIndex } = req
    const data = users[foundIndex]
    if (!data) return res.status(404)
    return res.send(data)
})

router.post("/users", checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send(result.array())
    const data = matchedData(req)
    console.log(data)
    const { body } = req
    
    const newUser = new User(body)
    try {
        const savedUser = await newUser.save()
        return res.status(201).send(newUser)
    } catch (error) {
        console.log(`failed to save user ${error}`)
        return res.status(400)
    }
})

router.put('/users/:id', resolveUsersById, (req, res) => {
    const { body, foundIndex } = req;
    users[foundIndex] = { id: users[foundIndex].id, ...body }
    return res.status(200)
})



router.patch("/users/:id", resolveUsersById, (req, res) => {
    const { foundIndex, body } = req
    users[foundIndex] = { ...users[foundIndex], ...body }
    return res.status(202).send(users)
})


router.delete('/users/:id', resolveUsersById, (req, res) => {
    const { foundIndex } = req
    users.splice(foundIndex, 1)
    return res.status(202)
})



export default router