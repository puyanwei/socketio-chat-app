import type { NextPage } from "next"
import { useSockets } from "../context/socket.context"
import { Sidebar } from "../containers/Sidebar"
import { Room } from "../containers/Room"
import { useRef } from "react"

const Home: NextPage = () => {
  const { socket, username, setUsername } = useSockets()
  const usernameRef = useRef<HTMLInputElement>(null)

  function handleUsername() {
    const value = usernameRef?.current?.value
    if (!value) return
    setUsername(value)
    localStorage.setItem("username", value)
  }

  if (!username)
    return (
      <div>
        <input placeholder="Enter your username" ref={usernameRef} />
        <button onClick={handleUsername}>Submit</button>
      </div>
    )

  return (
    <div>
      <Sidebar />
      <Room />
    </div>
  )
}

export default Home
