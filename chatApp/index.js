// Driver Code
const ChatRoom=require("./chatRoom.js");

const chat=new ChatRoom();

chat.on('join',(user)=>{
    console.log(`${user} has joined the chat`);
})

chat.on('message',(user,message)=>{
    console.log(`${user} : ${message}`);
})

chat.on('leave',(user)=>{
    console.log(`${user} has left the chat`);
})

//// Simulating chat activity

chat.join("Alice");
chat.join("Bob");

chat.sendMessage("Alice","Hey Bob, Hello to everyone from Alice");
chat.sendMessage("Bob","Hey Alice, Hello to everyone from Bob");

chat.leave("Alice");
chat.sendMessage("Alice", "This message won't be sent as alice left the chat");
chat.leave("Bob");