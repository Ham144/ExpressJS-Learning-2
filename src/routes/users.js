import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.js";
import { users } from "../utils/constants.js";

const router = Router()

router.get("/users", query("filter")
    .isString()
    .withMessage("filter tidak boleh berupa angka")
    .notEmpty()
    .withMessage("filter tidak boleh kosong")
    .isLength({ min: 3, max: 10 })
    .withMessage("filter.length harus diantara 3-10"),
    (req, res) => {
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

router.post('/users', checkSchema(createUserValidationSchema), (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)
    if (!errResult.isEmpty()) return res.status(404).send({ error: errResult.array() })
    const data = matchedData(req)
    const newUser = { id: users[users.length - 1].id + 1, ...data }
    users.push(newUser)
    return res.status(201).send(newUser)
})


export default router