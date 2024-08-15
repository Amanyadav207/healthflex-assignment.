import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    loadComments: (state, action) => {
      return action.payload;
    },
    addComment: (state, action) => {
      const now = new Date();
      const newComment = { 
      id: uuidv4(),
      ...action.payload,
      replies: [],
      date: now.toISOString(),
      displayDate: format(now, 'MMMM d, yyyy h:mm a')
    };
  state.push(newComment);
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.find((comment) => comment.id === id);
      if (comment) {
        comment.text = text;
      }
    },
    deleteComment: (state, action) => {
      const index = state.findIndex((comment) => comment.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addReply: (state, action) => {
      const { commentId, reply } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        comment.replies.push(reply);
      }
    },
    editReply: (state, action) => {
      const { commentId, replyId, text } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        const reply = comment.replies.find((r) => r.id === replyId);
        if (reply) {
          reply.text = text;
        }
      }
    },
    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        comment.replies = comment.replies.filter((reply) => reply.id !== replyId);
      }
    },
  },
});

export const { loadComments, addComment, editComment, deleteComment, addReply, editReply, deleteReply } = commentsSlice.actions;

export default commentsSlice.reducer;
