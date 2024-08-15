import React, { useState } from 'react';
import styles from './styles';
import { format } from 'date-fns';

const Comment = ({ comment, onEdit, onDelete, onReply, onEditReply, onDeleteReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [showReplySection, setShowReplySection] = useState(false);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    } else {
      alert('Please enter a comment.');
    }
  };

  const handleReply = () => {
    if (replyName.trim() && replyText.trim()) {
      const now = new Date();
      onReply(comment.id, { 
        id: Math.random().toString(36).substr(2, 9),
        name: replyName, 
        text: replyText, 
        date: new Date().toLocaleString(),
        displayDate: format(now, 'MMMM d, yyyy h:mm a')
      });
      setReplyName('');
      setReplyText('');
      setShowReplySection(false);
    } else {
      alert('Please enter both your name and reply.');
    }
  };

  return (
    <div style={styles.commentContainer}>
    <div style={styles.header}>
      <p style={styles.name}>{comment.name}</p>
      <p style={styles.date}>{comment.displayDate}</p>
    </div>
      {isEditing ? (
        <div style={styles.replySection}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={styles.input}
          />
          <button  onClick={handleEdit} style={styles.saveButton}>Save</button>
          <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p style={styles.commentText}>{comment.text}</p>
      )}
      <div style={styles.actions}>
        <button onClick={() => setIsEditing(true)} style={styles.actionButton}>Edit</button>
        <button onClick={() => onDelete(comment.id)} style={styles.actionButton}>Delete</button>
        <button onClick={() => setShowReplySection(!showReplySection)} style={styles.actionButton}>
          {showReplySection ? 'Cancel' : 'Reply'}
        </button>
      </div>

      {/* Conditional Rendering for Reply Section */}
      {showReplySection && (
        <div style={styles.replySection}>
          <input
            type="text"
            placeholder="Your Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleReply} style={styles.actionButton}>Reply</button>
        </div>
      )}

<div style={styles.replies}>
  {[...comment.replies].sort((a, b) => new Date(a.date) - new Date(b.date)).map((reply) => (
    <Reply
      key={reply.id}
      reply={reply}
      onEditReply={(newText) => onEditReply(comment.id, reply.id, newText)}
      onDeleteReply={() => onDeleteReply(comment.id, reply.id)}
    />
  ))}
</div>

    </div>
  );
};

const Reply = ({ reply, onEditReply, onDeleteReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEditReply(editText);
      setIsEditing(false);
    } else {
      alert('Please enter a reply.');
    }
  };

  return (
    <div style={styles.reply}>
      <div style={styles.header}>
        <p style={styles.name}>{reply.name}</p>
        <p style={styles.date}>{reply.displayDate}</p>
      </div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={styles.input}
          />
          <div style={styles.actions}>
            <button style={styles.actionButton} onClick={handleEdit}>Save</button>
            <button style={styles.actionButton} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p style={styles.replyText}>{reply.text}</p>
          <div style={styles.actions}>
            <button onClick={() => setIsEditing(true)} style={styles.actionButton}>Edit</button>
            <button onClick={onDeleteReply} style={styles.actionButton}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
