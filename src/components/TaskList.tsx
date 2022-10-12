import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { MdNoteAdd } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TaskList = () => {
  function Task(
    this: any,
    title: string,
    importance: string,
    deadline: string
  ) {
    this.title = title;
    this.importance = importance;
    this.deadline = deadline;
  }

  function TaskBuilder(this: any) {
    this.setTitle = function (title: string) {
      this.title = title;
      return this;
    };

    this.setImportance = function (importance: string) {
      this.importance = importance;
      return this;
    };

    this.setDeadline = function (deadline: string) {
      this.deadline = deadline;
      return this;
    };

    this.build = function () {
      return new (Task as any)(this.title, this.importance, this.deadline);
    };
  }

  const [tasks, setTasks]: any = useState([]);

  const [title, setTitle]: any = useState(null);

  const [deadline, setDeadline]: any = useState(null);

  const [impotance, setImpotance]: any = useState("low");

  // const addTask = function () {
  //   if (title) {
  //     setTasks([
  //       ...tasks,
  //       new (TaskBuilder() as any)
  //         .setTitle(title)
  //         .setImportance(impotance)
  //         .setDeadline(deadline)
  //         .build(),
  //     ]);
  //   }
  // };

  const addTask = function () {
    if (title) {
      setTasks([...tasks, new (Task as any)(title, impotance, deadline)]);
    }
  };

  const deleteTask = function (index: number) {
    setTasks(tasks.filter((task: any, i: number) => i !== index));
  };

  const [addFormStatus, setaddFormStatus] = useState(false);
  const toggleAddForm = () => {
    setaddFormStatus(!addFormStatus);
  };

  const [parent] = useAutoAnimate<HTMLDivElement>();

  console.log(tasks);

  return (
    <div ref={parent}>
      {addFormStatus && (
        <div className="fixed w-full h-fit p-5 left-0 z-10">
          <div className="flex-col bg-white w-full h-full rounded-lg">
            <div className="flex justify-between items-center p-5">
              <h1 className=" text-xl font-medium">Add Note</h1>
              <FaWindowClose size={20} onClick={toggleAddForm} />
            </div>

            <div className=" justify-center items-center p-3">
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="Title"
                className="input border-2 focus:border-blue-600 focus:outline-0 border-gray-400 w-full"
              />
              <div className="flex mt-4 justify-around flex-wrap">
                <div className="flex items-center gap-5">
                  <p className="font-medium">Deadline: </p>
                  <input
                    type="datetime-local"
                    onChange={(e) => {
                      setDeadline(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Importance: </p>
                  <select
                    onChange={(e) => {
                      setImpotance(e.target.value);
                    }}
                    className="select w-46 text-sm focus:outline-0 outline-none border-0"
                  >
                    <option value="low" className="text-green-400 font-medium">Low</option>
                    <option value="medium" className="text-orange-400 font-medium">
                      Medium
                    </option>
                    <option value="high" className="text-red-400 font-medium">High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <button className="btn btn-ghost">+ Add Step</button>
              </div>
              <button
                onClick={() => {
                  addTask();
                  toggleAddForm();
                }}
                className="btn btn-sm w-full bg-blue-600 hover:bg-blue-800 border-none mt-20"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-col p-5 w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className=" text-4xl font-medium text-white">Tasks</h1>
          <MdNoteAdd size={30} color="white" onClick={toggleAddForm} />
        </div>

        <div className="flex-col gap-2" ref={parent}>
          {tasks.map((task: any, index: number) => {
            return <TaskItem deleteTask={deleteTask} index={index} key={index} tasks={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
