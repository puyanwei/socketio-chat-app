import { createContext, useContext, useState } from "react"
import { socketUrl } from "../config/default"
import { Socket, io } from "socket.io-client"

interface Context {
  socket: Socket
  username?: string
  setUsername: (username: string) => boolean
}

const socket = io(socketUrl)
const SocketContext = createContext<Context>({ socket, setUsername: () => false })

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("")
  return <SocketContext.Provider value={{ socket, username, setUsername }} {...props} />
}

export const useSockets = () => useContext(SocketContext)
export default SocketsProvider
