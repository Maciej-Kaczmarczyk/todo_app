import React, { useEffect, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";

const Task = (props: { tasks: any }) => 
{let tasks = props.tasks;
const steps = tasks.steps;



  const [status, setStatus] = useState(
    steps.map((e: { checked: any }) => e.checked)
  );

  const stepsDone = (
    (status.filter((i: boolean) => i === true).length / status.length) *
    100
  ).toFixed(0);

  let progressColor: string = "";

  if (parseFloat(stepsDone) <= 33) {
    progressColor = "text-red-400";
  }
  if (parseFloat(stepsDone) > 33 && parseFloat(stepsDone) < 66) {
    progressColor = "text-orange-400";
  }
  if (parseFloat(stepsDone) >= 66) {
    progressColor = "text-green-400";
  }


  let importanceColor: string = "";

  if (tasks.importance === 'low') {
    importanceColor = "text-green-400";
  }
  if (tasks.importance === 'medium') {
    importanceColor = "text-orange-400";
  }
  if (tasks.importance === 'high') {
    importanceColor = "text-red-400";
  }

  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  
   return (
   <div>
      <div
        ref={parent}
        className="bg-white rounded-xl my-2"
      >
        <div
          onClick={reveal}
          className="flex items-center gap-3 collapse-title text-xl font-medium"
        >
          <div
            // className="radial-progress text-green-400"
            className={`radial-progress ${progressColor}`}
            style={
              {
                "--value": stepsDone,
                "--size": "2.6rem",
                "--thickness": "4px",
              } as React.CSSProperties
            }
          >
            <p className="text-xs font-normal text-black">{stepsDone}%</p>
          </div>
          <div>
            <h2>{tasks.title}</h2>
            <div className="flex gap-3">
              <p className="text-xs font-normal">
                Time left:{" "}
                <span className="text-green-400 font-semibold">2d</span>
              </p>
              <p className="text-xs font-normal">
                Importance:{" "}
                <span className={`${importanceColor} font-semibold text-xs`}>
                  {tasks.importance}
                </span>
              </p>
            </div>
          </div>
        </div>
  
        {show && (
          <div className="dropdown-content">
            <div className="flex-col ml-8">
              <div className="flex-col items-center gap-2 mt-2">
                {steps.map((task: any) => {
                  return (
                    <div className="flex items-center gap-2" key={task.text}>
                      <input
                        onChange={() => {
                          task.checked = !task.checked;
                          setStatus(
                            steps.map((e: { checked: any }) => e.checked)
                          );
                        }}
                        checked={task.checked}
                        type="checkbox"
                        className="checkbox-xs"
                      />
                      <p className="text-sm">{task.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-5">
              <button
                disabled={parseFloat(stepsDone) === 100 ? false : true}
                className="btn btn-sm w-full bg-blue-600 hover:bg-blue-800 border-none"
                onClick={() => {
                  tasks = null
                  console.log(tasks? true:false)
                }}
              >
                Complete
              </button>
            </div>
          </div>
        )}
      </div>

   </div>

  );
};

export default Task;
