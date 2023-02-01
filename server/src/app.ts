import express from "express"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import cors from "cors"
import config from "config"

const port = config.get<number>("port")
const host = config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
})

app.get("/", (req, res) => res.send("Server is up!"))

httpServer.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}`)

  runSocket({ io })
})

const events = {
  connection: "connection",
}
function runSocket({ io }: { io: Server }) {
  console.log(`sockets is enabled`)
  io.on(events.connection, (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`)
  })
}
