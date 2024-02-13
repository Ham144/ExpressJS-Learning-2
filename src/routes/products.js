import { Router } from "express";

const router = Router()

router.get("/products", (req, res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    console.log(req.signedCookies.hello)
    if (req.signedCookies.key && req.signedCookies.key === "value") {
        return res.status.send([{ id: 123, name: "chicken breast", price: 12.99 }])
    }
    return res.status(404).send({ msg: "Sorry, you need the correct cookie" })
})

export default router