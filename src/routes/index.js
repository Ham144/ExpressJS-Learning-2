import { Router } from "express"
import productRouter from "./products.js"
import usersRouter from "./users.js"

const router = Router()

router.use(usersRouter)
router.use(productRouter)


export default router
