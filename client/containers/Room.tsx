import { FormEvent, useRef } from "react"
import { useSockets } from "../context/socket.context"
import { events } from "../consts"
import { Room } from "../types"

export function getRoomName(rooms: Room[], roomId: string) {
  if (!rooms.length) return ""
  const room = rooms.find((room) => room.roomId === roomId)
  return room?.name || ""
}

export function Room() {
  const { socket, messages = [], setMessages, roomId, username, rooms } = useSockets()
  const messageRef = useRef<HTMLInputElement>(null)

  function handleSendMessage() {
    const message = messageRef?.current?.value.trim() || ""
    if (!message.trim()) return
    if (!messageRef?.current) return

    socket.emit(events.client.sendMessage, {
      roomId,
      username,
      message,
    })

    const time = `${new Date().getHours()}:${new Date().getMinutes()}`
    setMessages([...messages, { username: "You", message, time }])
    messageRef.current.value = ""
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSendMessage()
  }

  const title = roomId
    ? `You ${username} are in the ${getRoomName(rooms, roomId)} Room`
    : `You ${username} are not in a room yet`

  return (
    <div>
      {messages?.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}

      {!!rooms.length && (
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <input placeholder="Type your message here" ref={messageRef} />
          <button>Send</button>
        </form>
      )}
    </div>
  )
}
