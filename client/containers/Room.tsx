import { useRef } from "react"
import { useSockets } from "../context/socket.context"
import { events } from "../consts"

export function Room() {
  const { socket, messages = [], setMessages, roomId, username } = useSockets()
  const messageRef = useRef<HTMLTextAreaElement>(null)

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

  return (
    <div>
      {messages?.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}

      <div>
        <textarea rows={1} placeholder="Type your message here" ref={messageRef} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}
