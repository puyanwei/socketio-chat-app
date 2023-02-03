import { FormEvent, useRef } from "react"
import { useSockets } from "../context/socket.context"
import { events } from "../consts"
import { getRoomName } from "./Room"

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleRoomCreation()
  }

  function handleJoinRoom(id: string) {
    if (id === roomId) return
    socket.emit(events.client.joinRoom, { roomId: id })
  }

  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <input placeholder="Room name" ref={roomRef} />
        <button onClick={handleRoomCreation}>Create Room</button>
      </form>

      {rooms?.map(({ roomId: id, name }) => {
        const currentRoom = getRoomName(rooms, id)
        return (
          <div key={id}>
            {name}
            <button disabled={currentRoom !== name} onClick={() => handleJoinRoom(id)}>
              Join {name}
            </button>
          </div>
        )
      })}
    </nav>
  )
}
