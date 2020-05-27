const debug = require("debug")("chatapp")
const express = require("express")
const http = require("http")
const morgan = require("morgan")
const path = require("path")
const rfs = require("rotating-file-stream")
const socketio = require("socket.io")

// create app and link http server
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

// debug setup
const accessLogStream = rfs.createStream("access.log", {
	size: "1M",
	interval: "1d",
	path: path.join(__dirname, "log")
})
app.use(morgan("combined", {stream: accessLogStream}))
app.use(morgan("short", {stream: process.stdout}))

// express app setup
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: __dirname})
})

// socket.io setup
const io = socketio.listen(server)

io.on("connection", socket => {
	socket.on("chat-message", message => {
		io.emit("chat-message", message)
	})
})

// server startup
server.listen(PORT, _ => {
	debug(`App listening on *:${PORT}`)
})
