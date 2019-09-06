const socketio = require('socket.io');
const mongoose = require('mongoose');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const tokenLib = require("./tokenLib.js");

let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {
console.log("socket is connected")

let currentUser;
        socket.emit("verifyUser", "");

        
        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    // setting socket user id 
                    let x=user.data
                    socket.userId = x.userId
                    let fullName = `${x.firstName} ${x.lastName}`
                    currentUser = {
                        userId: x.userId,
                        fullName: fullName,
                    }                    
                                console.log(`--- inside getAllUsersInAHas function ---`)
                                    console.log(`${fullName} is online`);

                                    allOnlineUsers.push(currentUser)
                                    // setting room name
                                    socket.room = 'notify'
                                    // joining chat-group room.
                                    socket.join(socket.room)
                                    socket.to(socket.room).broadcast.emit('online', allOnlineUsers)                    
                    
                    
                     console.log(allOnlineUsers)
                }
            })
        }) // end of listening set-user event


        socket.on('issue-updated', (name,reporter) => {
let data={name:name,reporter:reporter}
            socket.broadcast.emit('issue-updated-notification',data);
        });

        socket.on('comment',(name,reporter)=>{
            let data={name:name,reporter:reporter}
            console.log(data)

            socket.broadcast.emit('commentno',data)})
           
            socket.on("watch",(name,reporter)=>{
                let data={name:name,reporter:reporter}

                socket.broadcast.emit("watchno",data)})
    

        socket.on('disconnect', () => {
            let removeIndex = allOnlineUsers.map((user) => {return user.userId}).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1);

            //refreshing and emitting new online users list
            socket.to(socket.room).broadcast.emit('online', allOnlineUsers);
            socket.leave(socket.room);
console.log('disconnected')
console.log(allOnlineUsers)
        });//end of disconnect event

        
    
    
    }
    
    )}


    module.exports={
        setServer:setServer
    }