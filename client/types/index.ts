import { Socket } from "socket.io-client"

export interface Context {
  socket: Socket
  username?: string
  setUsername: (username: string) => boolean
  messages?: Message[]
  setMessages: (messages: Message[]) => boolean
  roomId?: string
  rooms: Room[]
}

export interface Message {
  username: string
  message: string
  time: string
}

export interface Room {
  roomId: string
  name: string
}
