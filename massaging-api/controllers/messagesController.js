var express = require("express");
const MessagesService = require("../services/messagesService");
var messageRoutes = express.Router();
const messageObject = new MessagesService();

messageRoutes.get('/getAllMessages', (req, res) => {
    // const messagesList = messageObject.getAllMessages();
    const messagesList = messageObject.getAllMessages().map((message) => {
        console.log("message: ", message)
        return {
            senderName: message.getSenderName(),
            content: message.getContent(),
            date: message.getDate()
        };
    });
    console.log("message list: ", messagesList);
    return res.status(200).json(messagesList);
});

messageRoutes.post('/addNewMessage', (req, res) => {
    const { body } = req;
    console.log("body: ", body);
    if(body.senderName && body.content && body.date){
        messageObject.addNewMessage(body.senderName, body.content, body.date)
        return res.status(200).json({ 
            message: "new message has been added", 
            isSuccess: true,
          });
    }
    else {
        return res.status(422).json({   
            message: "body parameters cannot be empty",
            isSuccess: false,
          });
    }
})

module.exports = messageRoutes; 