import { createContext, useContext, useState } from "react"
import { socketUrl } from "../config/default"
import { Socket, io } from "socket.io-client"
import { events } from "../consts"
import { Context, Message } from "../types"

const socket = io(socketUrl)
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: [],
  setMessages: ([]) => false,
  messages: [],
})

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState<Message[]>([])

  socket.on(events.server.showAllRooms, (value) => setRooms(value))
  socket.on(events.server.joinedRoom, (id) => {
    setRoomId(id)
  })

  socket.on(events.server.roomMessage, ({ username, message, time }) => {
    console.log({ messages })
    if (!messages) return
    setMessages([...messages, { username, message, time }])
  })

  const value = { socket, username, setUsername, rooms, roomId, setMessages, messages }
  return <SocketContext.Provider value={value} {...props} />
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
