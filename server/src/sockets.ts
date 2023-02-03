import { Server, Socket } from "socket.io"
import { nanoid } from "nanoid"

// nanoid v4 is not supported on node - https://github.com/ai/nanoid/issues/365#issuecomment-1167075436, so have to use v3

export const events = {
  connection: "connection",
  client: {
    createRoom: "createRoom",
    sendMessage: "sendMessage",
    joinRoom: "joinRoom",
  },
  server: {
    showAllRooms: "showAllRooms",
    joinedRoom: "joinedRoom",
    roomMessage: "roomMessage",
  },
}

interface Room {
  roomId: string
  name: string
}

const rooms: Room[] = []

export function runSockets({ io }: { io: Server }) {
  io.on(events.connection, (socket: Socket) => {
    console.warn(`socket connected: ${socket.id}`)

    socket.on(events.client.createRoom, ({ roomName }) => {
      console.warn(`client ${socket.id} created room ${roomName}`)

      const roomId = nanoid()

      rooms.push({
        roomId: socket.id,
        name: roomName,
      })

      socket.join(roomId)
      socket.emit(events.server.showAllRooms, rooms)
      socket.emit(events.server.joinedRoom, roomId)
    })

    socket.on(events.client.sendMessage, ({ roomId, message, username }) => {
      console.warn(`client ${socket.id} sent message ${message}`)
      const time = `${new Date().getHours()}:${new Date().getMinutes()}`

      socket.to(roomId).emit(events.server.roomMessage, {
        username,
        message,
        time,
      })
    })

    socket.on(events.client.joinRoom, ({ roomId }) => {
      socket.join(roomId)
      socket.emit(events.server.joinedRoom, roomId)
    })
  })
}
