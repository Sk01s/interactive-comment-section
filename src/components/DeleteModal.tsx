import { deleteComment } from "@/lib/features/commentSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";
import Modal from "react-modal";

const DeleteModal = ({
  modalIsOpen,
  setModalIsOpen,
  id,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: (state: boolean) => void;
  id: number;
}) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteComment({ id }));
    setModalIsOpen(false);
  };
  return (
    <>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background behind the modal
          },
        }}
        className={
          "bg-white w-[19rem] m-auto p-5 rounded-2xl translate-y-[calc(50vh-50%)] "
        }
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
      >
        <h2 className="text-xl font-semibold mb-4">Delete Comment</h2>
        <p className="text-stone-500">
          Are you srue you wnat ot delete this comment? this remove the comment
          and can&#39;t be undone.
        </p>
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-slate-500 text-white px-4 py-1 rounded-lg font-semibold"
          >
            No,CANCEL
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="bg-soft-red text-white px-4 py-1 rounded-lg font-semibold"
          >
            Yes,DELETE
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
