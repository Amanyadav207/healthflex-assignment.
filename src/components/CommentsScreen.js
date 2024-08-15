import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { addComment, editComment, deleteComment, addReply, editReply, deleteReply, loadComments } from '../redux/commentsSlice';
import styles from './styles';

const CommentsScreen = () => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    dispatch(loadComments(storedComments));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (comment) => {
    dispatch(addComment(comment));
  };

  const handleEditComment = (id, newText) => {
    dispatch(editComment({ id, text: newText }));
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  const handleReply = (commentId, reply) => {
    dispatch(addReply({ commentId, reply }));
  };

  const handleEditReply = (commentId, replyId, newText) => {
    dispatch(editReply({ commentId, replyId, text: newText }));
  };

  const handleDeleteReply = (commentId, replyId) => {
    dispatch(deleteReply({ commentId, replyId }));
  };

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div style={styles.container}>
      <CommentInput onAddComment={handleAddComment} />
      <div style={styles.sortContainer}>
        <span>Sort By: </span>
        <button onClick={toggleSortOrder} style={styles.sortButton}>
          Date and Time {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div>
        {sortedComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            onReply={handleReply}
            onEditReply={handleEditReply}
            onDeleteReply={handleDeleteReply}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsScreen;