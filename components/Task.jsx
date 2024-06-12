import React, { useState } from "react";
import { FaRegSquareCheck, FaRegSquareFull, FaTrash } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
export default function Task({ task, callback }) {
  const [done, setDone] = useState(task.completed);

  const handDelete = () => {
    fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({
        id: task.id,
      }),
    });

    callback();
  };

  const handleEdit = () => {};
  const handleToggle = async () => {
    try {
      const response = await fetch("/api", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          completed: !task.completed,
        }),
      });

      if (response.ok) {
        setDone(!done);
      } else {
        console.error("Failed to update the task");
      }
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
    }
  };
  return (
    <div className="flex justify-between items-center border border-sky-100 bg-black bg-opacity-30 rounded-lg md:py-2 py-1 px-1 md:px-3 ">
      <div
        className="flex md:flex-row justify-center items-center gap-2 md:gap-3 cursor-pointer"
        onClick={handleToggle}
      >
        {done ? <FaRegSquareCheck /> : <FaRegSquareFull />}
        <h2
          style={done ? { textDecoration: "line-through", opacity: 0.5 } : {}}
          className="text-sm md:text-lg lg:text-xl"
        >
          {task.title}
        </h2>
      </div>
      <div className="flex flex-row gap-3 items-center justify-center">
        <button onClick={handDelete}>{<FaTrash />}</button>
        {/* <button onClick={handleEdit}>{<BsPencilSquare />}</button> */}
      </div>
    </div>
  );
}
