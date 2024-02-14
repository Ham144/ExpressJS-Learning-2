import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.js";

passport.serializeUser((user, done) => {
    console.log(`inside serialize user`)
    console.log(user)
    done(null, user.userName)
})

passport.deserializeUser((userName, done) => {
    console.log('inside deserilize')
    console.log(`deserilized id : ${userName}`)
    try {
        const finduser = users.find((user) => user.userName === userName)
        if (!finduser) throw new Error("user not found")
        done(null, finduser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy((userName, password, done) => {
        console.log(`userName : ${userName}`)
        console.log(`password : ${password}`)
        try {
            const finduser = users.find((user) => {
                return user.userName === userName
            })
            if (!finduser) throw new Error("users not found")
            if (finduser.password !== password) throw new Error("invalid credentials")
            done(null, finduser)
        } catch (err) {
            done(err, null)
        }

    })
)

