import React, { memo } from "react";
import { Comment } from "@/lib/features/commentSlice";
import CommentBox from "./CommentBox";

interface CommentElementProps extends Comment {
  replyingTo?: string; // Adjust the type as needed
}

const CommentElement: React.FC<CommentElementProps> = ({
  score,
  content,
  createdAt,
  id,
  replies,
  user,
  replyingTo,
}) => {
  // Base case: If there are no replies, stop recursion
  if (!replies || replies.length === 0) {
    return (
      <CommentBox
        key={id}
        replies={replies}
        content={content}
        createdAt={createdAt}
        id={id}
        score={score}
        user={user}
      />
    );
  }

  return (
    <>
      <CommentBox
        key={id}
        replies={replies}
        content={content}
        createdAt={createdAt}
        id={id}
        score={score}
        user={user}
      />
      <div className="flex">
        <div className="w-[3px] bg-light-gray-100 mx-9 shrink-0"></div>
        <div className="flex flex-col gap-3 w-full">
          {replies.map(
            ({ content, createdAt, id, score, user, replies, replyingTo }) => (
              <CommentElement
                key={id}
                replies={replies} // Pass the nested replies
                content={content}
                createdAt={createdAt}
                id={id}
                score={score}
                user={user}
                replyingTo={replyingTo} // Pass the replyingTo prop if needed
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CommentElement;
