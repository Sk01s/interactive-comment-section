import { selectUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import Image from "next/image";
import { addComment, editComment } from "@/lib/features/commentSlice";
export enum actionType {
  add,
  edit,
  null,
}
const CommentWriter = ({
  id,
  username = "",
  action,
  setShowen = (state) => null,
}: {
  id: number;
  username?: string;
  action: actionType;
  setShowen?: (state: boolean) => void;
}) => {
  const user = useAppSelector(selectUser);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const handleComment = () => {
    switch (action) {
      case actionType.add:
        dispatch(
          addComment({
            id,
            comment: {
              content: comment,
              createdAt: "1 minute ago",
              user,
              score: 0,
              replyingTo: username,
              replies: [],
              id: Math.random() * 10000,
            },
          })
        );
        break;
      case actionType.edit:
        dispatch(
          editComment({
            id,
            content: comment,
          })
        );

      default:
        break;
    } // Dispatch your action her
    setComment(""); // Clear the input field
    setShowen(false);
  };

  return (
    <section className="flex gap-5 bg-white p-5 items-center rounded-lg">
      <Image src={user.image.webp} alt="user image" width={30} height={12} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-3 border-solid border-gray-300 border-[1px] rounded-md"
      />
      <button
        className="bg-moderate-blue text-white py-2 px-4 rounded-lg"
        onClick={handleComment}
      >
        Send
      </button>
    </section>
  );
};

export default CommentWriter;
