import type { NextPage } from "next"
import { FormEvent, KeyboardEvent } from "react"
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleUsername()
  }

  if (!username?.trim())
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter your username" ref={usernameRef} />
        <button onClick={handleUsername}>Submit</button>
      </form>
    )

  return (
    <div>
      <Sidebar />
      <Room />
    </div>
  )
}

export default Home
