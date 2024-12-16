import { Server } from 'socket.io'

const SocketHandler = ( req, res ) => {

    if(res.socket.server.io) {
      console.log('s.io is already running')
  } else {
      const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connect', socket => {
      socket.on('add-chat', payload => {
         console.log(payload, "IOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
		socket.broadcast.emit('refresh-chat', payload)
     })
       socket.on('add-comment', payload=> {
		socket.broadcast.emit('refresh-comment', payload)
     })
   })
 
 res.end()
}
}
export default SocketHandler