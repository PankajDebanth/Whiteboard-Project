import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Chat.css";

const Chat = ({ socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message", { message, userId: socket.id });
      setChat((prevChat) => [...prevChat, { message, name: "You" }]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">Chats</div>
      <div className="chat-messages">
        {chat.map((msg, index) => (
          <p key={index} className={msg.name === "You" ? "chat-message right" : "chat-message left"}>
            {msg.name}: {msg.message}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <form onSubmit={handleSendMessage}>
          <textarea
            className="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <i
            className="fa-solid fa-paper-plane chat-send-icon"
            onClick={handleSendMessage}
          ></i>
        </form>
      </div>
    </div>
  );
};

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Chat;
