import React, { useState } from "react";
import Task from "./Task";

const TaskList = () => {
  const tasks = [
    {
      title: "Task 1",
      steps: [
        {
          text: "a",
          checked: false,
        },
        {
          text: "b",
          checked: false,
        },
        {
          text: "c",
          checked: false,
        },
        {
          text: "d",
          checked: false,
        },
        {
          text: "e",
          checked: false,
        },
        {
          text: "f",
          checked: false,
        },
        {
          text: "g",
          checked: false,
        },
      ],
    },
    {
      title: "Task 2",
      steps: [
        {
          text: "c",
          checked: false,
        },
        {
          text: "d",
          checked: false,
        },
      ],
    },
   
  ];

  return (
    <div className="flex-col gap-2">
      {tasks.map((e) => {
        return <Task key={e.title} tasks={e} />;
      })}
    </div>
  );
};

export default TaskList;
