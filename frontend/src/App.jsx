import io from "socket.io-client"

const socket = io("/")

function App() {
  return (
    <div>cliente conectado con socket.io</div>
  )
}

export default App
