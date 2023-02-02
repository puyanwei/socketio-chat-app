import { useRef } from "react"
import { useSockets } from "../context/socket.context"
import { events } from "../consts"

export function Sidebar() {
  const { socket, roomId, rooms } = useSockets()
  const roomRef = useRef<HTMLInputElement>(null)

  function handleRoomCreation() {
    const roomName = roomRef?.current?.value || ""

    if (!roomName.trim().length) return
    if (!roomRef?.current) return

    socket.emit(events.client.createRoom, { roomName })
    roomRef.current.value = ""
  }

  return (
    <nav>
      <div>
        <input placeholder="Room name" ref={roomRef} />
        <button onClick={handleRoomCreation}>Create Room</button>
      </div>

      {Object.keys(rooms).map((id) => (
        <div key={id}>{rooms[id].name}</div>
      ))}
    </nav>
  )
}
