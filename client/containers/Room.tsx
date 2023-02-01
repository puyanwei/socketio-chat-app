import { useRef } from "react"
import { useSockets } from "../context/socket.context"
import { Events } from "../consts"

export function Room() {
  const { socket, roomId, rooms } = useSockets()
  const roomRef = useRef<HTMLInputElement>(null)

  function handleRoomCreation() {
    const roomName = roomRef?.current?.value || ""

    if (!roomName.trim().length) return
    if (!roomRef?.current) return

    socket.emit(Events.client.createRoom, { roomName })
    roomRef.current.value = ""
  }
  return (
    <nav>
      <input placeholder="Room name" ref={roomRef} />
      <button onClick={handleRoomCreation}>Create Room</button>
    </nav>
  )
}
