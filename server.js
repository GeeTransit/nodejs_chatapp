// from: https://expressjs.com/en/starter/hello-world.html

const express = require("express")
const debug = require("debug")("chatapp")
const morgan = require("morgan")
const path = require("path")
const rfs = require("rotating-file-stream")

const app = express()
const port = process.env.PORT || 3000

const accessLogStream = rfs.createStream("access.log", {
	size: "1M",
	interval: "1d",
	path: path.join(__dirname, "log")
})
app.use(morgan("combined", {stream: accessLogStream}))
app.use(morgan("short", {stream: process.stdout}))

app.get("/", (req, res) => res.send("Hello, world!"))
app.listen(port, _ => debug(`App listening at http://localhost:${port}`))
