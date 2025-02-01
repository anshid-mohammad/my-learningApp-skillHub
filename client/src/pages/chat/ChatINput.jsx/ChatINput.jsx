import React, { useState } from 'react';
import styles from "./ChatINput.module.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerToggle = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (emoji) => {
    setMsg((prev) => prev + emoji.emoji);
  };
const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg("")

    }
}
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <BsEmojiSmileFill className={styles.emojiIcon} onClick={handleEmojiPickerToggle} />
        {showEmojiPicker && <Picker className={styles.emojiPicker} onEmojiClick={handleEmojiClick} />}
      </div>
      <form className={styles.inputContainer} onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className={styles.innerInput}
        />
        <button type="submit" className={styles.submit} onClick={() => handleSendMsg(msg)}>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
