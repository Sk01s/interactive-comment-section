import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../store";
import { User } from "./userSlice";

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
};

export interface CommentState {
  data: Comment[];
}
const initialState: CommentState = {
  data: [],
};
const findCommentById = (
  comments: Comment[],
  targetId: number
): Comment | undefined => {
  for (const comment of comments) {
    if (comment.id === targetId) {
      return comment;
    }
    if (comment.replies) {
      const foundInReplies = findCommentById(comment.replies, targetId);
      if (foundInReplies) {
        return foundInReplies;
      }
    }
  }
  return undefined;
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    loadComments: (state, action: PayloadAction<Comment[]>) => {
      state.data = action.payload;
    },
    addComment: (
      state,
      action: PayloadAction<{ id: number; comment: Comment }>
    ) => {
      function addCommentPross(comments: Comment[]): Comment[] {
        return comments.map((comment) => {
          if (comment.id === action.payload.id) {
            if (comment.replies) {
              comment.replies.push(action.payload.comment);
            } else {
              comment.replies = [action.payload.comment];
            }
          } else if (comment.replies) {
            comment.replies = addCommentPross(comment.replies);
          }
          return comment;
        });
      }

      if (action.payload.id === 0) {
        state.data.push(action.payload.comment);
      } else {
        state.data = addCommentPross(state.data);
      }
    },
    deleteComment: (state, action: PayloadAction<{ id: number }>) => {
      const commentIdToDelete = action.payload.id;

      // Recursively remove comment and its replies
      const removeCommentAndReplies = (comments: Comment[]) => {
        return comments.filter((comment) => {
          if (comment.id === commentIdToDelete) {
            // Remove this comment and its replies
            return false;
          } else if (comment.replies) {
            // Recurse into replies
            comment.replies = removeCommentAndReplies(comment.replies);
          }
          return true;
        });
      };

      state.data = removeCommentAndReplies(state.data);
    },
    editComment: (
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const { id, content } = action.payload;

      // Recursively update comment and its replies
      const updateCommentAndReplies = (comments: Comment[]) => {
        return comments.map((comment) => {
          if (comment.id === id) {
            comment.content = content;
          }
          if (comment.replies) {
            comment.replies = updateCommentAndReplies(comment.replies);
          }
          return comment;
        });
      };

      state.data = updateCommentAndReplies(state.data);
    },
    decreaseScore: (state, action: PayloadAction<number>) => {
      const commentToUpdate = findCommentById(state.data, action.payload);
      if (commentToUpdate) {
        commentToUpdate.score -= 1;
      }
    },
    increaseScore: (state, action: PayloadAction<number>) => {
      const commentToUpdate = findCommentById(state.data, action.payload);
      if (commentToUpdate) {
        commentToUpdate.score += 1;
      }
    },
  },
});

export const {
  loadComments,
  addComment,
  editComment,
  deleteComment,
  decreaseScore,
  increaseScore,
} = commentsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectComments = (state: RootState) => state.comments.data;

export default commentsSlice.reducer;
