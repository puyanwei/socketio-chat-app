import { createContext, useContext, useState } from "react"
import { socketUrl } from "../config/default"
import { Socket, io } from "socket.io-client"

interface Context {
  socket: Socket
  username?: string
  setUsername: (username: string) => boolean
  roomId?: string
  rooms: string[]
}

const socket = io(socketUrl)
const SocketContext = createContext<Context>({ socket, setUsername: () => false, rooms: [] })

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
  const [rooms, setRooms] = useState([])
  return (
    <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId }} {...props} />
  )
}

export const useSockets = () => useContext(SocketContext)
export default SocketsProvider
