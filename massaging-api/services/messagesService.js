const Message = require("../models/messages");

class MessagesService {
  #messagesList = [];

  getAllMessages = () => {
    console.log("this.#messagesList: ", this.#messagesList);
    return this.#messagesList;
  };

  addNewMessage = (senderName, contact, date) => {
    console.log("add");
    const message = new Message(senderName, contact, date);
    console.log("massage: ", message);
    this.#messagesList.push(message);
    console.log("after add: ", this.#messagesList);
    return message;
  };
}

module.exports = MessagesService;
