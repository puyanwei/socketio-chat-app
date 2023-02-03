import { createContext, useContext, useState } from "react"
import { socketUrl } from "../config/default"
import { Socket, io } from "socket.io-client"
import { events } from "../consts"

interface Context {
  socket: Socket
  username?: string
  setUsername: (username: string) => boolean
  messages?: Message[]
  setMessages: (messages: Message[]) => boolean
  roomId?: string
  rooms: Room[]
}

interface Message {
  username: string
  message: string
  time: string
}

interface Room {
  roomId: string
  name: string
}

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
  socket.on(events.server.joinedRoom, ({ messages, roomId }) => {
    setMessages(messages)
    setRoomId(roomId)
  })

  socket.on(events.server.roomMessage, ({ username, message, time }) => {
    console.log(message)
    if (!messages) return
    setMessages([...messages, { username, message, time }])
  })
  console.log("messages", messages)

  const value = { socket, username, setUsername, rooms, roomId, setMessages, messages }
  return <SocketContext.Provider value={value} {...props} />
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
