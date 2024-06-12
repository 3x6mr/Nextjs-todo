"use client";
import { useEffect, useRef, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import Task from "./Task";
import { CiViewList } from "react-icons/ci";
import { FaHome, FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { PiBroom } from "react-icons/pi";
export default function Wrapper() {
  const [tasks, setTasks] = useState([]);
  const [stable, setStable] = useState(true);
  const addTaskRef = useRef();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const res = fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
    setStable(false);
  }, [stable, page]);

  const handleClick = () => {
    const title = addTaskRef.current.value;
    if (title) {
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTasks([...tasks, data]);
          addTaskRef.current.value = "";
        });
    }
  };
  const callback = () => {
    setStable(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (page === 2) return task.completed;
    if (page === 3) return !task.completed;
    return true; // page === 1 (show all tasks)
  });

  const handleClear = () => {
    fetch("/api", {
      method: "DELETE",
    }).then(() => {
      setTasks([]);
    });
    setStable(true);
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <>
      <div className="flex gap-2 flex-row justify-between items-center lg:w-[50%] w-[80%] border border-white py-2 px-3 rounded-lg bg-white bg-opacity-10 border-none">
        <div className="flex flex-row items-center">
          {
            <CiViewList
              className="text-xl md:text-3xl opacity-75"
              color="white"
            />
          }
          <h1 className="hidden md:block italic text-lg md:text-2xl text-white opacity-75">
            Todo App
          </h1>
        </div>
        <div>
          <ul className="text-white flex flex-row justify-center items-center gap-10 ">
            <li
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={() => setPage(1)}
            >
              <FaHome className="text-lg md:text-2xl opacity-75" />
              <h2 className="text-sm md:text-lg lg:text:xl hidden md:block opacity-75">
                All
              </h2>
            </li>
            <li
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={() => setPage(2)}
            >
              <FaRegCheckSquare className="text-lg md:text-2xl opacity-75" />
              <h2 className="text-sm md:text-lg lg:text:xl hidden md:block opacity-75">
                Completed
              </h2>
            </li>
            <li
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={() => setPage(3)}
            >
              <FaRegSquare className=" text-lg md:text-2xl opacity-75" />
              <h2 className="text-sm md:text-lg lg:text:xl hidden md:block opacity-75">
                UnCompleted
              </h2>
            </li>
          </ul>
        </div>
      </div>
      <main className="p-5 md:p-10 min-h-[80vh] md:w-[50%] w-[80%] bg-white bg-opacity-5 rounded-lg border border-x-sky-200 text-white outline-none">
        <div className="flex justify-center gap-3 items-center mb-5">
          <form onSubmit={handlSubmit}>
            <input
              ref={addTaskRef}
              name="title"
              placeholder="Add Task..."
              type="text"
              className="bg-white bg-opacity-10 border border-gray-300 rounded-md md:px-4 px-2 py-1 md:py-2 w-[7rem] md:w-[200px] lg:w-[300px]"
            />
          </form>
          <button
            className="p-[3px] relative"
            onClick={handleClick}
            type="submit"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="flex justify-center items-center flex-row gap-3 md:px-8 md:py-2 px-5 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent font-normal md:font-bold">
              Add {<BiAddToQueue />}
            </div>
          </button>
        </div>
        <div className="border border-sky-300 bg-white bg-opacity-10 min-h-[70vh] rounded-lg md:py-5 py-2 px-1  md:px-10 flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} callback={callback} />
          ))}
          {page === 2 && (
            <div className="flex justify-center">
              <button
                className="p-[3px] relative"
                onClick={handleClear}
                type="submit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="flex justify-center items-center flex-row gap-3 md:px-8 md:py-2 px-5 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent font-normal md:font-bold">
                  Clear Completed Tasks {<PiBroom />}
                </div>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
