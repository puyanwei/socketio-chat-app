import { Server, Socket } from "socket.io"

const events = {
  connection: "connection",
  client: {
    createRoom: "createRoom",
  },
}
export function runSockets({ io }: { io: Server }) {
  console.log(`sockets is enabled`)

  io.on(events.connection, (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`)

    socket.on(events.client.createRoom, ({ roomName }) => {
      console.log(`client ${socket.id} created room ${roomName}`)
    })
  })
}
