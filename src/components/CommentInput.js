import React, { useState } from 'react';
import styles from './styles';

const CommentInput = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleAddComment = () => {
    if (name.trim() && text.trim()) {
      onAddComment({ name, text, date: new Date().toLocaleString() });
      setName('');
      setText('');
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Add a comment</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />
      <button style={styles.postButton} onClick={handleAddComment}>POST</button>
    </div>
  );
};



export default CommentInput;
