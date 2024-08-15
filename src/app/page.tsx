"use client";
import { loadUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import data from "./data.json";
import { loadComments, selectComments } from "@/lib/features/commentSlice";
import CommentElement from "@/components/CommentElement";
import CommentWriter from "@/components/CommentWriter";

export default function Home() {
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadComments(data.comments));
    dispatch(loadUser(data.currentUser));
  }, [dispatch]);

  return (
    <main className="m-4 flex justify-center items-center">
      <div className="flex flex-col gap-3 max-w-[45rem]">
        {comments.map(({ content, createdAt, id, replies, score, user }) => (
          <CommentElement
            key={id}
            content={content}
            createdAt={createdAt}
            id={id}
            replies={replies}
            score={score}
            user={user}
          />
        ))}
        <CommentWriter id={0} />
      </div>
    </main>
  );
}
