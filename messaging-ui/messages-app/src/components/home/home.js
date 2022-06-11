import React, { useEffect, useState } from "react";

import "./home.css";

const Home = () => {
  const [showNewMessage, setShowNewMessage] = useState(true);
  const [messagesList, setMessagesList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [toggleRead, setToggleRead] = useState(false);
  const [message, setMessage] = useState({
    senderName: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/messages/getAllMessages").then(async (res) => {
      const data = await res.json();
      console.log(data);
      setMessagesList(data);
    });
    return () => {};
  }, [refresh]);

  const onFormChangeHandler = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  const onShowMessageClickHandler = () => {
    setShowNewMessage(!showNewMessage);
  };

  const onToggle = () => {
    setToggleRead(!toggleRead);
  };

  const onSendMessageClickHandler = async () => {
    if (
      message.senderName.length === 0 ||
      message.content.length === 0 ||
      message.date.length === 0
    ) {
      alert("form values cannot be empty");
      return;
    }

    fetch("http://localhost:3001/messages/addNewMessage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => {
        console.log(res);
        setMessage({
          senderName: "",
          content: "",
          date: "",
        });
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="header">
        <h1>My Messaging App</h1>
        <h1>{new Date().toLocaleString()}</h1>
      </div>
      <hr />

      <div className="messages">
        {messagesList.map((message, index) => {
          return (
            <div className="message" key={index}>
              <div className="left">
                <h2>{message.senderName}</h2>
                {toggleRead ? (
                  <h3 className="line">{message.content}</h3>
                ) : (
                  <h3>{message.content}</h3>
                )}
              </div>
              <div className="right">
                <h3>{message.date}</h3>
                <button className="toggleButton" onClick={onToggle}>
                  Toggle Read
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <button className="showButton" onClick={onShowMessageClickHandler}>
        {showNewMessage ? "Show New Message" : "Hide New Message"}
      </button>
      <br />
      <br />
      {showNewMessage ? null : (
        <div className="form">
          <div className="labels">
            <label>Sender Name: </label>
            <br />
            <label>Content: </label>
            <br />
            <label>Date: </label>
          </div>

          <div className="inputs">
            <input
              type="text"
              name="senderName"
              onChange={onFormChangeHandler}
              value={message.senderName}
              required
            ></input>
            <br />

            <input
              type="text"
              name="content"
              onChange={onFormChangeHandler}
              value={message.content}
              required
            ></input>
            <br />

            <input
              type="datetime-local"
              name="date"
              onChange={onFormChangeHandler}
              value={message.date}
              required
            ></input>
            <br />

            <button className="saveButton" onClick={onSendMessageClickHandler}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
