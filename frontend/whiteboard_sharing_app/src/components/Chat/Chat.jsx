import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header">Chats</div>
      <div className="chat-messages"></div>
      <div className="chat-input-container">
        <textarea className="chat-input" placeholder="Type a message..." />
        <i className="fa-solid fa-paper-plane chat-send-icon"></i>
      </div>
    </div>
  );
};

export default Chat;
