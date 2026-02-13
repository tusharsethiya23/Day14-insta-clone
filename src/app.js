const express = require("express")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/posts",upload.single("firstPost") , postRouter)

module.exports = app