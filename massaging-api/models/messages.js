class Message{
    #SenderName;
    #Content;
    #Date;

    constructor(senderName, content, date){
        this.#SenderName = senderName;
        this.#Content = content;
        this.#Date = date;
    }

    getSenderName = () => {
        return this.#SenderName
    }

    getContent = () => {
        return this.#Content
    }
    
    getDate = () => {
        return this.#Date
    }

    // setMessage = (senderName, content, date) => {
    //     this.#SenderName = senderName;
    //     this.#Content = content;
    //     this.#Date = date;
    // }
    

}
module.exports = Message;