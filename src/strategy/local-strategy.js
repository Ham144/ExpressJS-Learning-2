import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.js";

passport.serializeUser((user, done) => {
    console.log(`inside serialize user`)
    console.log(user)
    done(null, user.userName)
})

passport.deserializeUser(async (id, done) => {
    console.log('inside deserilize')
    console.log(`deserilized id : ${id}`)
    try {
        const finduser = await users.findById(id)
        if (!finduser) throw new Error("user not found")
        done(null, finduser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy(async (userName, password, done) => {
        console.log(`userName: ${userName},`)
        console.log(`password : ${password}`)
        try {
            const finduser = await users.findOne((user) => { userName })
            if (!finduser) throw new Error("User not found")
            if (finduser.password !== password) throw new Error("password is wrong")
            done(null, finduser)
        } catch (error) {
            done(err, null)
        }
    })
)

