import { Server, Socket } from "socket.io"
import { nanoid } from "nanoid"

// nanoid v4 is not supported on node - https://github.com/ai/nanoid/issues/365#issuecomment-1167075436, so have to use v3

const events = {
  connection: "connection",
  client: {
    createRoom: "createRoom",
    sendMessage: "sendMessage",
  },
  server: {
    showAllRooms: "showAllRooms",
    joinedRoom: "joinedRoom",
    roomMessage: "roomMessage",
  },
}

const rooms: Record<string, { name: string }> = {}

export function runSockets({ io }: { io: Server }) {
  console.log(`sockets is enabled`)

  io.on(events.connection, (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`)

    socket.on(events.client.createRoom, ({ roomName }) => {
      console.log(`client ${socket.id} created room ${roomName}`)

      const roomId = nanoid()

      rooms[roomId] = {
        name: roomName,
      }

      socket.join(roomId)
      socket.emit(events.server.showAllRooms, rooms)
      socket.emit(events.server.joinedRoom, roomId)
    })

    socket.on(events.client.sendMessage, ({ roomId, message, username }) => {
      console.log(`client ${socket.id} sent message ${message}`)
      const time = `${new Date().getHours()}:${new Date().getMinutes()}`

      socket.to(roomId).emit(events.server.roomMessage, {
        username,
        message,
        time,
      })
    })
  })
}
