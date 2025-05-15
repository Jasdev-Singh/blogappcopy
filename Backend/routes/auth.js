import express from "express"
import { login, logout, register } from "../controllers/auth.js"


const router = express.Router()
//route for login logout authentication
router.post("/register",register)
router.post("/",login)
router.post("/logout",logout)


export default router