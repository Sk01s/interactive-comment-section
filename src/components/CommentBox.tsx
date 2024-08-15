import React, { useState, MouseEvent, useRef } from "react";
import {
  Comment,
  decreaseScore,
  increaseScore,
} from "@/lib/features/commentSlice";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/userSlice";
import CommentWriter, { actionType } from "./CommentWriter";
import DeleteModal from "./DeleteModal";
const CommentBox = ({
  score,
  content,
  createdAt,
  id,
  user,
  replyingTo,
}: Comment) => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showen, setShowen] = useState(false);
  const [action, setAction] = useState(actionType.null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const incButton = useRef<HTMLButtonElement>(null);
  const decButton = useRef<HTMLButtonElement>(null);
  const handleIncrease = (e: MouseEvent<HTMLButtonElement | undefined>) => {
    if (incButton.current) incButton.current.disabled = true;
    if (decButton.current) decButton.current.disabled = false;
    dispatch(increaseScore(id));
  };
  const handleDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    if (incButton.current) incButton.current.disabled = false;
    if (decButton.current) decButton.current.disabled = true;
    dispatch(decreaseScore(id));
  };

  return (
    <>
      <div className="flex flex-col gap-3 max-w-[45rem]">
        <article
          key={id}
          className="bg-white rounded-md flex flex-col-reverse md:flex-row  gap-5 p-3 md:items-center items-start  relative w-[100%]"
        >
          <div
            className="bg-light-gray-200 bg-opacity-75   rounded-lg md:h-24 md:w-8
      w-24 h-10 shrink-0 flex md:flex-col justify-between items-center"
          >
            <button
              ref={incButton}
              className="md:px-2 md:py-4 py-2 px-4 shrink-0"
              onClick={handleIncrease}
            >
              <Image
                src={"/images/icon-plus.svg"}
                width={11}
                height={11}
                alt="+"
              />
            </button>
            <div className="text-moderate-blue font-bold">{score}</div>
            <button
              ref={decButton}
              className="md:px-2 md:py-4 py-2 px-4  shrink-0"
              onClick={handleDecrease}
            >
              <Image
                src={"/images/icon-minus.svg"}
                width={11}
                height={11}
                alt="+"
              />
            </button>
          </div>
          <div className="mt-1">
            <div className="flex gap-1 justify-between mb-4">
              <div className="flex gap-4 items-center">
                <Image src={user.image.webp} alt="" width={32} height={32} />
                <div className="font-semibold">{user.username}</div>
                {user.username === currentUser.username && (
                  <div className="text-white bg-moderate-blue px-2 rounded-md font-semibold pt-[1px] pb-[2px]">
                    you
                  </div>
                )}
                <p className="text-stone-400 font-semibold">{createdAt}</p>
              </div>
              {user.username === currentUser.username ? (
                <div className=" flex gap-5 items-center font-semibold  absolute right-4 md:top-auto top-[calc(100%-2.6rem)]">
                  <button
                    className="text-soft-red flex gap-2 items-center"
                    onClick={() => setModalIsOpen(true)}
                  >
                    <Image
                      src={"/images/icon-delete.svg"}
                      width={11}
                      height={13}
                      alt=""
                    />
                    <div className="pb-1">Delete</div>
                  </button>
                  <button
                    className="text-moderate-blue flex gap-2 items-center"
                    onClick={() => {
                      setAction(actionType.edit);
                      setShowen((prev) => !prev);
                    }}
                  >
                    <Image
                      src={"/images/icon-edit.svg"}
                      width={14}
                      height={13}
                      alt=""
                    />
                    <div className="pb-1">Edit</div>
                  </button>
                </div>
              ) : (
                <button
                  className="text-moderate-blue flex gap-2 items-center font-semibold  absolute right-4 md:top-auto top-[calc(100%-2.6rem)]"
                  onClick={() => {
                    setAction(actionType.add);
                    setShowen((prev) => !prev);
                  }}
                >
                  <Image
                    src={"/images/icon-reply.svg"}
                    width={14}
                    height={13}
                    alt=""
                  />

                  <div className="pb-1">Reply</div>
                </button>
              )}
            </div>
            <p className="text-stone-400 font-semibold">
              {replyingTo && (
                <span className="text-moderate-blue">@{replyingTo} </span>
              )}
              {content}
            </p>
          </div>
        </article>
        {showen && (
          <CommentWriter
            id={id}
            username={user.username}
            action={action}
            setShowen={setShowen}
          />
        )}
      </div>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        id={id}
      />
    </>
  );
};

export default CommentBox;
